import { Request, Response } from "express";
import Task from "../models/Task";

export const getTasks = async (req: Request, res: Response) => {
  const tasks = await Task.find();
  return res.status(200).json(tasks);
};

export const getTask = async (req: Request, res: Response) => {
  const task = await Task.findById(req.params.id);

  return res.status(200).json(task);
};

export const createTask = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { title, description, date, postingUser } = req.body;
    const newTask = new Task({ title, description, date, postingUser });
    await newTask.save();
    return res.status(200).json(newTask);
  } catch (err) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  try {
    const taskDeleted = await Task.findByIdAndDelete(req.params.id);
    if (!taskDeleted) return res.json({ message: "Task not found" });
    res.status(200).json({ message: "Task Deleted" });
  } catch (e) {
    res.status(400).json({ message: "Task Not Found" });
  }
};

export const updateTask = async (req: Request, res: Response) => {
  let task = await Task.findById(req.params.id);
  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }
  task = await Task.findByIdAndUpdate(req.params.id, req.body);

  return res.status(200).json({ message: "Task Updated" });
};
