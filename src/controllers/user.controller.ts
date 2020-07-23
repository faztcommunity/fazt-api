// Copyright 2020 Fazt Community ~ All rights reserved. MIT license.

import User from '../models/User';
import Project from '../models/Project';
import { generateAndSignToken } from '../utils/auth';
import bcrypt from 'bcryptjs';
import { validationResult } from 'express-validator';
import { ErrorHandler } from '../error';
import { NOT_FOUND, BAD_REQUEST, UNAUTHORIZED, OK } from 'http-status-codes';
import { getPages } from '../utils/pages';

export const getUsers: Handler = async (req, res) => {
  const { limit, skip } = getPages(req.query.page as string, Number(req.query.limit));

  const users = await User.find()
    .limit(limit)
    .skip(skip)
    .populate('projects', '-contributors')
    .select('-password')
    .exec();

  return res.status(OK).json({
    statusCode: OK,
    data: users,
    message: 'Ok!'
  });
};

export const getUser: Handler = async (req, res) => {
  const user = await User.findById(req.params.id)
    .populate('projects', '-contributors')
    .select('-password')
    .exec();

  if (!user) throw new ErrorHandler(NOT_FOUND, 'User not found');

  return res.status(OK).json({
    statusCode: OK,
    data: user,
    message: 'Ok!'
  });
};

export const createUser: Handler = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) throw new ErrorHandler(BAD_REQUEST, errors.array());

  const { nickname, email, password, firstName, lastName } = req.body;

  const user = new User({ nickname, email, firstName, password, lastName });
  await user.setPassword(password);

  const newUser = await user.save();
  const token = await generateAndSignToken({ user: { id: newUser.id } });

  return res.status(OK).json({
    statusCode: OK,
    data: token,
    message: 'User Created!'
  });
};

export const deleteUser: Handler = async (req, res) => {
  const user = await User.findByIdAndRemove(req.user.id).exec();
  if (!user) throw new ErrorHandler(NOT_FOUND, 'User not found');

  await Project.updateMany(
    { _id: { $in: user.projects } },
    { $pull: { contributors: user._id } }
  ).exec();

  return res.status(OK).json({
    statusCode: OK,
    message: 'User Deleted!'
  });
};

export const updateUser: Handler = async (req, res) => {
  if (req.body.password) {
    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(req.body.password, salt);
  }

  delete req.body.projects;

  const user = await User.findByIdAndUpdate(req.user.id, req.body, {
    new: true
  })
    .populate('projects', '-contributors')
    .select('-password')
    .exec();

  if (!user) throw new ErrorHandler(NOT_FOUND, 'User not found');

  return res.status(OK).json({
    statusCode: OK,
    data: user,
    message: 'User Updated!'
  });
};

export const loginUser: Handler = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) throw new ErrorHandler(BAD_REQUEST, errors.array());

  const { email, password } = req.body;

  //validate credentials
  const user = await User.findOne({ email }).exec();
  if (!user) {
    throw new ErrorHandler(UNAUTHORIZED, 'Invalid Credentials');
  }

  //compare password
  const passwordCorrect: boolean = await user.comparePassword(password);
  if (!passwordCorrect) {
    throw new ErrorHandler(UNAUTHORIZED, 'Invalid Credentials');
  }
  const token = await generateAndSignToken({ user: { id: user.id } });

  return res.status(OK).json({
    statusCode: OK,
    data: token,
    message: 'User Connected!'
  });
};
