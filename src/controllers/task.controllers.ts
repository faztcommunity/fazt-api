// Copyright 2020 Fazt Community ~ All rights reserved. MIT license.

import Task from '../models/Task';
import { ErrorHandler } from '../error';
import { NOT_FOUND, BAD_REQUEST, OK } from 'http-status-codes';
import { validationResult } from 'express-validator';
import { getPages } from '../utils/pages';

export const getTasks: Handler = async (req, res) => {
  const { limit, skip } = getPages(req.query.page as string, Number(req.query.limit));

  const tasks = await Task.find().limit(limit).skip(skip).exec();

  return res.status(OK).json({
    statusCode: OK,
    data: tasks,
    message: 'Ok!'
  });
};

export const getTask: Handler = async (req, res) => {
  const task = await Task.findById(req.params.id).exec();
  if (!task) throw new ErrorHandler(NOT_FOUND, 'Task not found');

  return res.status(OK).json({
    statusCode: OK,
    data: task,
    message: 'Ok!'
  });
};

export const createTask: Handler = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) throw new ErrorHandler(BAD_REQUEST, errors.array());

  const { title, description, date, postingUser } = req.body;
  const task = new Task({ title, description, date, postingUser });
  await task.save();

  return res.status(OK).json({
    statusCode: OK,
    data: task,
    message: 'Task Created!'
  });
};

export const deleteTask: Handler = async (req, res) => {
  const taskDeleted = await Task.findByIdAndDelete(req.params.id).exec();

  if (!taskDeleted) throw new ErrorHandler(NOT_FOUND, 'Task not found');

  return res.status(OK).json({
    statusCode: OK,
    message: 'Task Deleted!'
  });
};

export const updateTask: Handler = async (req, res) => {
  const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
    new: true
  }).exec();

  if (!task) throw new ErrorHandler(NOT_FOUND, 'Task not found');

  return res.status(OK).json({
    statusCode: OK,
    data: task,
    message: 'Task Updated!'
  });
};
