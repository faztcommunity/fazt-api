// Copyright 2020 Fazt Community ~ All rights reserved. MIT license.
import { Request, Response } from 'express';
import Misc from '../models/Misc';
import { ErrorHandler } from '../error';
import { NOT_FOUND } from 'http-status-codes';

export const getMiscs: Handler = async (req: Request, res: Response) => {
  const misc = await Misc.find().exec();
  return res.status(200).json(misc);
};

export const getMisc: Handler = async (req: Request, res: Response) => {
  const result = await Misc.findById(req.params.id).exec();
  if (!result) throw new ErrorHandler(NOT_FOUND, 'Misc not found');
  return res.status(200).json(result);
};

export const createMisc: Handler = async (req: Request, res: Response) => {
  const { title, url, misc } = req.body;
  const newMisc = new Misc({
    title,
    url,
    misc
  });
  await newMisc.save();
  return res.status(201).json(newMisc);
};

export const deleteMisc: Handler = async (req: Request, res: Response) => {
  const result = await Misc.findByIdAndRemove(req.params.id).exec();
  return res.status(200).json({
    code: 200,
    message: 'Ok!'
  });
};

export const updateMisc: Handler = async (req: Request, res: Response) => {
  const misc = await Misc.findByIdAndUpdate(req.params.id, req.body, {
    new: true
  }).exec();

  if (!misc) throw new ErrorHandler(NOT_FOUND, 'Misc not found');

  return res.status(200).json({
    code: 200,
    message: 'Ok!',
    data: misc
  });
};
