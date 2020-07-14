// Copyright 2020 Fazt Community ~ All rights reserved. MIT license.

import Project from '../models/Project';
import { ErrorHandler } from '../error';
import { NOT_FOUND, UNPROCESSABLE_ENTITY } from 'http-status-codes';

import { validationResult } from 'express-validator';

export const getProjects: Handler = async (req, res) => {
  let projects = await Project.find().where('status').ne('deleted').exec();
  return res.status(200).json(projects);
};

export const getProject: Handler = async (req, res) => {
  const project = await Project.findById(req.params.id).exec();
  if (!project || project.status === 'deleted')
    throw new ErrorHandler(NOT_FOUND, 'Project not found');

  return res.status(200).json(project);
};

export const createProject: Handler = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new ErrorHandler(UNPROCESSABLE_ENTITY, { errors: errors.array() });
  }

  const project = new Project(req.body);
  await project.save();
  return res.status(200).json(project);
};

export const deleteProject: Handler = async (req, res) => {
  const projectDeleted = await Project.findByIdAndUpdate(
    req.params.id,
    { status: 'deleted' },
    { new: true }
  ).exec();

  if (!projectDeleted) throw new ErrorHandler(NOT_FOUND, 'Project not found');

  return res.status(200).json(projectDeleted);
};

export const updateProject: Handler = async (req, res) => {
  let project = await Project.findById(req.params.id).exec();

  if (!project) throw new ErrorHandler(NOT_FOUND, 'Project not found');

  project = await Project.findByIdAndUpdate(req.params.id, req.body, {
    new: true
  }).exec();

  return res.status(200).json(project);
};
