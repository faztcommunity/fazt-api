// Copyright 2020 Fazt Community ~ All rights reserved. MIT license.

import Project from '../models/Project';
import User from '../models/User';

import { ErrorHandler } from '../error';
import { NOT_FOUND, BAD_REQUEST, OK } from 'http-status-codes';

import { validationResult } from 'express-validator';
import { getPages } from '../utils/pages';

import path from 'path';
import fs from 'fs-extra';

export const getProjects: Handler = async (req, res) => {
  const { page, limit: limitQuery, tags } = req.query;
  const { limit, skip } = getPages(page as string, Number(limitQuery));

  const tagsQuery = tags ? { tags: { $in: tags as string[] } } : {};

  const projects = await Project.find(tagsQuery)
    .where('status')
    .ne('deleted')
    .limit(limit)
    .skip(skip)
    .populate('contributors', ['nickname', 'email', 'firstName', 'lastName'])
    .exec();

  return res.status(OK).json({
    statusCode: OK,
    data: projects,
    message: 'Ok!'
  });
};

export const getProject: Handler = async (req, res) => {
  const project = await Project.findById(req.params.id)
    .where('status')
    .ne('deleted')
    .exec();

  if (!project) throw new ErrorHandler(NOT_FOUND, 'Project not found');

  return res.status(OK).json({
    statusCode: OK,
    data: project,
    message: 'Ok!'
  });
};

export const createProject: Handler = async (req, res) => {
  req.body.image_path = req.file.path;
  const project = new Project(req.body);
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    await fs.unlink(path.resolve(project.image_path));
    throw new ErrorHandler(BAD_REQUEST, { errors: errors.array() });
  }

  await project.save();
  return res.status(OK).json({
    statusCode: OK,
    data: project,
    message: 'Project Created!'
  });
};

export const deleteProject: Handler = async (req, res) => {
  const project = await Project.findByIdAndUpdate(
    req.params.id,
    { status: 'deleted' },
    { new: true }
  )
    .where('status')
    .ne('deleted')
    .exec();

  if (!project) throw new ErrorHandler(NOT_FOUND, 'Project not found');

  await fs.unlink(path.resolve(project.image_path));

  return res.status(OK).json({
    statusCode: OK,
    message: 'Project Deleted!'
  });
};

export const updateProject: Handler = async (req, res) => {
  let project = await Project.findById(req.params.id)
    .where('status')
    .ne('deleted')
    .exec();

  delete req.body.contributors;

  if (!project) throw new ErrorHandler(NOT_FOUND, 'Project not found');

  if (typeof req.file !== 'undefined') {
    await fs.unlink(path.resolve(project.image_path));
    req.body.image_path = req.file.path;
  }

  project = await Project.findByIdAndUpdate(req.params.id, req.body, {
    new: true
  }).exec();

  return res.status(OK).json({
    statusCode: OK,
    data: project,
    message: 'Project Updated!'
  });
};

export const addProjectContributor: Handler = async (req, res) => {
  let { contributors } = req.body;
  if (Array.isArray(contributors)) {
    contributors = Array.from(new Set(contributors));
  }

  const project = await Project.findById(req.params.id)
    .where('status')
    .ne('deleted')
    .where('contributors')
    .in(contributors)
    .exec();

  if (project)
    throw new ErrorHandler(BAD_REQUEST, 'the project already has those contributors');

  const updatedProject = await Project.findByIdAndUpdate(
    req.params.id,
    {
      $push: { contributors }
    },
    { new: true }
  )
    .where('status')
    .ne('deleted')
    .where('contributors')
    .nin(contributors)
    .populate('contributors', ['nickname', 'email', 'firstName', 'lastName'])
    .exec();

  if (!updatedProject) throw new ErrorHandler(NOT_FOUND, 'Project not found');

  return res.status(OK).json({
    statusCode: OK,
    data: updatedProject,
    message: 'Contributor Added!'
  });
};
