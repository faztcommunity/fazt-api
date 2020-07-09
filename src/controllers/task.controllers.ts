import { Handler } from "../types";
import Task from "../models/Task";
import { success, error } from "../network/response";

export const getTasks: Handler = async (req, res) => {
  const tasks = await Task.find();
  return success(res, tasks, "200");
};

export const getTask: Handler = async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task) {
    return error(res, "404", "Task not Found'");
  }

  return res.status(200).json(task);
};

export const createTask: Handler = async (req, res) => {
  try {
    const { title, description, date, postingUser } = req.body;
    const task = new Task({ title, description, date, postingUser });
    await task.save();
    return success(res, task, "200");
  } catch (err) {
    return error(res, "500");
  }
};

export const deleteTask: Handler = async (req, res) => {
  try {
    const taskDeleted = await Task.findByIdAndDelete(req.params.id);

    if (!taskDeleted) return res.json({ message: "Task not found" });

    return success(res, taskDeleted, "200");
  } catch (err) {
    return error(res, "500");
  }
};

export const updateTask: Handler = async (req, res) => {
  let task = await Task.findById(req.params.id);

  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }

  task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });

  return res.status(200).json(task);
};
