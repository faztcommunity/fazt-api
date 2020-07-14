// Copyright 2020 Fazt Community ~ All rights reserved. MIT license.

import User from '../models/User';
import { generateAndSignToken } from '../utils/auth';
import bcrypt from 'bcryptjs';
import { validationResult } from 'express-validator';
import { ErrorHandler } from '../error';
import { NOT_FOUND, BAD_REQUEST, UNAUTHORIZED } from 'http-status-codes';

export const getUsers: Handler = async (req, res) => {
  const Users = await User.find().exec();
  return res.status(200).json({
    code: 200,
    data: Users,
    message: 'Ok!'
  });
};

export const getUser: Handler = async (req, res) => {
  const user = await User.findById(req.params.id).exec();
  if (!user) throw new ErrorHandler(NOT_FOUND, 'User not found');

  return res.status(200).json({
    code: 200,
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

  return res.status(201).json({
    code: 201,
    data: token,
    message: 'Created!'
  });
};

export const deleteUser: Handler = async (req, res) => {
  const user = await User.findByIdAndRemove(req.user.id).exec();
  console.log(req.user.id);
  console.log(user);
  if (!user) throw new ErrorHandler(NOT_FOUND, 'User not found');

  return res.status(200).json({
    code: 200,
    message: 'Ok!'
  });
};

export const updateUser: Handler = async (req, res) => {
  if (req.body.password) {
    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(req.body.password, salt);
  }

  const user = await User.findByIdAndUpdate(req.user.id, req.body, {
    new: true
  }).exec();
  if (!user) throw new ErrorHandler(NOT_FOUND, 'User not found');

  return res.status(200).json({
    code: 200,
    message: 'User Updated!',
    data: user
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
  return res.status(200).json({
    code: 200,
    data: token
  });
};
