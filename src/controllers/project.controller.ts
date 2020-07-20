// Copyright 2020 Fazt Community ~ All rights reserved. MIT license.

import Project from '../models/Project';
import { ErrorHandler } from '../error';
import { NOT_FOUND, UNPROCESSABLE_ENTITY, OK } from 'http-status-codes';

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
    .exec();

  return res.status(OK).json({
    statusCode: OK,
    data: projects,
    message: 'Ok!'
  });
};

export const getProject: Handler = async (req, res) => {
  const project = await Project.findById(req.params.id).exec();
  if (!project || project.status === 'deleted')
    throw new ErrorHandler(NOT_FOUND, 'Project not found');

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
    fs.unlink(path.resolve(project.image_path));
    throw new ErrorHandler(UNPROCESSABLE_ENTITY, { errors: errors.array() });
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
  ).exec();

  if (!project) throw new ErrorHandler(NOT_FOUND, 'Project not found');

  fs.unlink(path.resolve(project.image_path));

  return res.status(OK).json({
    statusCode: OK,
    message: 'Project Deleted!'
  });
};

export const updateProject: Handler = async (req, res) => {
  let project = await Project.findById(req.params.id).exec();

  if (!project) throw new ErrorHandler(NOT_FOUND, 'Project not found');

  if (typeof req.file !== 'undefined') {
    fs.unlink(path.resolve(project.image_path));
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
