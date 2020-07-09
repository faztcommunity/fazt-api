import { Handler } from '../types';
import Task from '../models/Task';
import { success } from '../network/response';
import { ErrorHandler } from '../error';
import { NOT_FOUND } from 'http-status-codes';

export const getTasks: Handler = async (req, res) => {
  const tasks = await Task.find();
  return success(res, tasks, '200');
};

export const getTask: Handler = async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task) throw new ErrorHandler(NOT_FOUND, 'Task not found');

  return res.status(200).json(task);
};

export const createTask: Handler = async (req, res) => {
  const { title, description, date, postingUser } = req.body;
  const task = new Task({ title, description, date, postingUser });
  await task.save();
  return success(res, task, '200');
};

export const deleteTask: Handler = async (req, res) => {
  const taskDeleted = await Task.findByIdAndDelete(req.params.id);

  if (!taskDeleted) throw new ErrorHandler(NOT_FOUND, 'Task not found');

  return success(res, taskDeleted, '200');
};

export const updateTask: Handler = async (req, res) => {
  let task = await Task.findById(req.params.id);

  if (!task) throw new ErrorHandler(NOT_FOUND, 'Task not found');

  task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });

  return res.status(200).json(task);
};
