// Copyright 2020 Fazt Community ~ All rights reserved. MIT license.

import Jobs from '../models/Jobs';
import { NOT_FOUND, BAD_REQUEST, OK } from 'http-status-codes';
import { ErrorHandler } from '../error';
import { validationResult } from 'express-validator';
import { getPages } from '../utils/pages';

export const getJobs: Handler = async (req, res) => {
  const { limit, skip } = getPages(req.query.page as string, Number(req.query.limit));

  const jobs = await Jobs.find().limit(limit).skip(skip).exec();

  return res.status(OK).json({
    statusCode: OK,
    data: jobs,
    message: 'Ok!'
  });
};

export const getJob: Handler = async (req, res) => {
  const job = await Jobs.findById(req.params.id).exec();
  if (!job) throw new ErrorHandler(NOT_FOUND, 'Job Not Found');
  return res.json({
    statusCode: OK,
    data: job,
    message: 'Ok!'
  });
};

export const createJob: Handler = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) throw new ErrorHandler(BAD_REQUEST, errors.array());

  const job = new Jobs(req.body);
  job.save();

  return res.json({
    statusCode: OK,
    data: job,
    message: 'Job Created!'
  });
};

export const deleteJob: Handler = async (req, res) => {
  const job = await Jobs.findByIdAndRemove(req.params.id).exec();
  if (!job) throw new ErrorHandler(NOT_FOUND, 'Job not Found');

  return res.status(200).json({
    statusCode: OK,
    message: 'Job Deleted'
  });
};

export const updateJob: Handler = async (req, res) => {
  const job = await Jobs.findByIdAndUpdate(req.params.id, req.body, {
    new: true
  }).exec();

  if (!job) throw new ErrorHandler(NOT_FOUND, 'Job not Found');

  return res.status(OK).json({
    statusCode: OK,
    message: 'Job Updated'
  });
};
