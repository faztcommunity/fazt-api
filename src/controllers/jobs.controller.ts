// Copyright 2020 Fazt Community ~ All rights reserved. MIT license.

import Jobs from '../models/Jobs';
import { NOT_FOUND, BAD_REQUEST } from 'http-status-codes';
import { ErrorHandler } from '../error';
import { validationResult } from 'express-validator';

export const getJobs: Handler = async (req, res) => {
  const results = await Jobs.find().exec();
  return res.json(results);
};

export const getJob: Handler = async (req, res) => {
  const result = await Jobs.findById(req.params.id).exec();
  if (!result) throw new ErrorHandler(NOT_FOUND, 'Job Not Found');
  return res.json(result);
};

export const createJob: Handler = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) throw new ErrorHandler(BAD_REQUEST, errors.array());

  const newJob = new Jobs(req.body);
  newJob.save();
  return res.json(newJob);
};

export const deleteJob: Handler = async (req, res) => {
  const job = await Jobs.findByIdAndRemove(req.params.id).exec();
  return res.json(job);
};

export const updateJob: Handler = async (req, res) => {
  const job = await Jobs.findByIdAndUpdate(req.params.id, req.body, {
    new: true
  }).exec();
  if (!job) throw new ErrorHandler(NOT_FOUND, 'User Dont Exists');
  return res.json(job);
};
