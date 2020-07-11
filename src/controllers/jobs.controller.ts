import { Handler, Request, Response } from "express";
import Jobs, { IJob } from "../models/Jobs";
import { isNull } from "util";
import { ErrorHandler } from "../error";
import {
  NOT_FOUND,
  INTERNAL_SERVER_ERROR,
  BAD_REQUEST,
} from "http-status-codes";

export const getJobs: Handler = async (req, res) => {
  const results = await Jobs.find();
  return res.status(200).json(results);
};

export const getJob: Handler = async (req, res) => {
  const result = await Jobs.findById(req.params.id);
  if (!result) throw new ErrorHandler(NOT_FOUND, "Job Not Found");

  return res.status(200).json(result);
};

export const createJob: Handler = async (req, res) => {
  try {
    const newJob = new Jobs(req.body);
    newJob.save();
    return res.status(200).json(newJob);
  } catch (e) {
    throw new ErrorHandler(BAD_REQUEST, "Error creating Job");
  }
};

export const deleteJob: Handler = async (req, res) => {
  await Jobs.findByIdAndRemove(req.params.id);
  if (!Jobs) throw new ErrorHandler(NOT_FOUND, "Error deleting user");

  return res.status(200).json({ message: "Jobs Deleted" });
};

export const updateJob: Handler = async (req, res) => {
  const updateData = req.body;
  const idFilter = { _id: req.params.id };
  let updatedJob: IJob | null;
  try {
    await Jobs.findOneAndUpdate(idFilter, updateData);
    updatedJob = await Jobs.findById(req.params.id);

    if (isNull(updatedJob)) throw new ErrorHandler(NOT_FOUND, "UserDontExists");
  } catch (e) {
    throw new ErrorHandler(INTERNAL_SERVER_ERROR, "Error updating job");
  }
  return res.status(200).json(updatedJob);
};
