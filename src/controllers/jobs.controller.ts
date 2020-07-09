import {Handler, Request, Response} from 'express';
import Jobs, {IJob} from '../models/Jobs';
import {error, success} from '../network/response';
import {isNull} from 'util';

export const getJobs: Handler = async (req: Request, res: Response) => {
  try {
    const results = await Jobs.find();
    return success(res, results, "200");
  } catch (e) {
    return error(res, "500", "Error getting jobs");
  }
}

export const getJob = async (req: Request, res: Response) => {
  try {
    const result = await Jobs.findById(req.params.id);
    if (!result) throw new Error("JobNotFound");
    return success(res, result, "200");
  } catch (e) {
    return error(res, "404", "Job not found");
  }
}
export const createJob = async (req: Request, res: Response) => {
  try { 
    const newJob = new Jobs(req.body);
    newJob.save();
    return success(res, newJob, "200");
  } catch (e) {
    return error(res, "400", "Error creating Job");
  }
}
export const deleteJob = async (req: Request, res: Response) => {
  try {
    await Jobs.findByIdAndRemove(req.params.id);
    return success(res, {message: "User deleted"}, "200");
  } catch(e) {
    return error(res, "500", "Error deleting user");
  }
}
export const updateJob = async (req: Request, res: Response) => {
  const updateData = req.body;
  const idFilter = {_id: req.params.id}
  let updatedJob: IJob | null;
  try {
    await Jobs.findOneAndUpdate(idFilter, updateData);
    updatedJob = await Jobs.findById(req.params.id);
    if (isNull(updatedJob)) throw new Error("UserDontExists"); 
  } catch (e) {
    return error(res, "500", "Error updating job");
  }
  return success(res, updatedJob, "200");
}

