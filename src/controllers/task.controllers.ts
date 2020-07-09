import { Handler } from "../types";
import Task from "../models/Task";
import * as response from "../network/response";

export const getTasks: Handler = async (req, res) => {
  const tasks = await Task.find();
  return response.success(res, {
    code: 200,
    data: tasks,
    message: "Ok!",
  });
};

export const getTask: Handler = async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task) {
    return response.error(res, {
      code: 404,
      message: "Task not found",
    });
  }

  return res.status(200).json(task);
};

export const createTask: Handler = async (req, res) => {
  try {
    const { title, description, date, postingUser } = req.body;
    const task = new Task({ title, description, date, postingUser });
    await task.save();
    return response.success(res, {
      code: 200,
      data: task,
      message: "Ok!",
    });
  } catch (err) {
    return response.error(res, {
      code: 500,
      message: "Internal Server Error",
    });
  }
};

export const deleteTask: Handler = async (req, res) => {
  try {
    const taskDeleted = await Task.findByIdAndDelete(req.params.id);

    if (!taskDeleted)
      return response.error(res, {
        code: 404,
        message: "Task not found",
      });

    return res.status(200).json({ message: "Task Deleted" });
  } catch (err) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateTask: Handler = async (req, res) => {
  let task = await Task.findById(req.params.id);

  if (!task) {
    return response.error(res, {
      code: 404,
      message: "Task not found",
    });
  }

  task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });

  return response.success(res, {
    code: 200,
    data: task,
    message: "Ok!",
  });
};
