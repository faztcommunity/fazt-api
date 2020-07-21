// Copyright 2020 Fazt Community ~ All rights reserved. MIT license.

import { Request, Response } from 'express';
import Workshop from '../models/Workshops';
import { ErrorHandler } from '../error';
import { NOT_FOUND, OK } from 'http-status-codes';
import { getPages } from '../utils/pages';

export const getWorshops: Handler = async (req: Request, res: Response) => {
  const { limit, skip } = getPages(req.query.page as string, Number(req.query.limit));

  const workshops = await Workshop.find().limit(limit).skip(skip).exec();
  return res.status(OK).json({
    statusCode: OK,
    data: workshops,
    message: 'Ok!'
  });
};

export const getWorshop: Handler = async (req: Request, res: Response) => {
  const workshop = await Workshop.findById(req.params.id).exec();
  if (!workshop) throw new ErrorHandler(NOT_FOUND, 'Workshop not Found');

  return res.status(OK).json({
    statusCode: OK,
    data: workshop,
    message: 'Ok!'
  });
};

export const createWorshop: Handler = async (req: Request, res: Response) => {
  const { title, description, date, workshopUser } = req.body;
  const newWorkshop = new Workshop({
    title,
    description,
    date,
    workshopUser
  });
  await newWorkshop.save();
  return res.status(OK).json({
    statusCode: OK,
    data: newWorkshop,
    message: 'Workshop Created!'
  });
};

export const deleteWorshop: Handler = async (req: Request, res: Response) => {
  const workshopDeleted = await Workshop.findByIdAndDelete(req.params.id).exec();
  if (!workshopDeleted) throw new ErrorHandler(NOT_FOUND, 'Workshop not Found');

  return res.status(OK).json({
    statusCode: OK,
    message: 'Workshop Deleted!'
  });
};

export const updateWorshop: Handler = async (req: Request, res: Response) => {
  const workshop = await Workshop.findByIdAndUpdate(req.params.id, req.body).exec();
  if (!workshop) throw new ErrorHandler(NOT_FOUND, 'Workshop not Found');

  return res.status(OK).json({
    statusCode: OK,
    data: workshop,
    message: 'Workshop Updated!'
  });
};
