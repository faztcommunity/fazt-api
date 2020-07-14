// Copyright 2020 Fazt Community ~ All rights reserved. MIT license.

import Workshop from '../models/Workshops';
import { ErrorHandler } from '../error';
import { NOT_FOUND } from 'http-status-codes';

export const getWorshops: Handler = async (req, res) => {
  const workshops = await Workshop.find().exec();
  return res.status(200).json(workshops);
};

export const getWorshop: Handler = async (req, res) => {
  const workshops = await Workshop.findById(req.params.id).exec();
  return res.status(200).json(workshops);
};

export const createWorshop: Handler = async (req, res) => {
  const { title, description, date, workshopUser } = req.body;
  const newWorkshop = new Workshop({
    title,
    description,
    date,
    workshopUser
  });
  await newWorkshop.save();
  return res.status(201).json(newWorkshop);
};

export const deleteWorshop: Handler = async (req, res) => {
  const workshopDeleted = await Workshop.findByIdAndDelete(req.params.id).exec();
  if (!workshopDeleted) throw new ErrorHandler(NOT_FOUND, 'Workshop not Found');
  return res.status(200).json({ message: 'Workshop Deleted' });
};

export const updateWorshop: Handler = async (req, res) => {
  const workshop = await Workshop.findById(req.params.id).exec();
  if (!workshop) throw new ErrorHandler(NOT_FOUND, 'WorkShop not Found');
  await Workshop.findByIdAndUpdate(req.params.id, req.body).exec();
  return res.status(200).json({ message: 'Workshop Updated' });
};
