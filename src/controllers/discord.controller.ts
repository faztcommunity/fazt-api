// Copyright 2020 Fazt Community ~ All rights reserved. MIT license.

import { NOT_FOUND, BAD_REQUEST } from 'http-status-codes';
import { Setting, Moderation } from '../models/Discord';
import { validationResult } from 'express-validator';
import { ErrorHandler } from '../error';

export const getSetting: Handler = async (req, res) => {
  const setting = await Setting.findOne({ name: req.params.name }).exec();
  if (!setting) {
    return res.status(NOT_FOUND).json({
      statusCode: NOT_FOUND,
      data: null,
      message: 'Ok!'
    });
  }

  return res.status(200).json({
    statusCode: 200,
    data: setting,
    message: 'Ok!'
  });
};

export const updateOrCreateSetting: Handler = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) throw new ErrorHandler(BAD_REQUEST, errors.array());

  const existSetting = await Setting.findOneAndUpdate(
    { name: req.params.name },
    { value: req.body.value },
    { new: true }
  ).exec();

  if (!existSetting) {
    const setting = new Setting({
      name: req.params.name,
      value: req.body.value
    });

    await setting.save();
    return res.status(200).json({
      statusCode: 200,
      data: setting,
      message: 'Setting Created!'
    });
  }

  return res.status(200).json({
    statusCode: 200,
    data: existSetting,
    message: 'Setting Updated!'
  });
};

export const getUserModerations: Handler = async (req, res) => {
  const user = await Moderation.find({ user_id: req.params.user_id }).exec();

  return res.status(200).json({
    statusCode: 200,
    data: user,
    message: 'Ok!'
  });
};

export const getUserModerationsWithType: Handler = async (req, res) => {
  const user = await Moderation.find({ user_id: req.params.user_id })
    .where('type')
    .equals(req.params.type)
    .exec();

  console.log(req.params.type);

  return res.status(200).json({
    statusCode: 200,
    data: user,
    message: 'Ok!'
  });
};

export const createModerationUser: Handler = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) throw new ErrorHandler(BAD_REQUEST, errors.array());

  const user = new Moderation({
    ...req.body,
    user_id: req.params.user_id
  });

  await user.save();

  return res.status(200).json({
    statusCode: 200,
    data: user,
    message: 'Ok!'
  });
};

export const revokeModeration: Handler = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) throw new ErrorHandler(BAD_REQUEST, errors.array());

  const moderation = await Moderation.findByIdAndUpdate(
    req.params.id,
    { revoked: true },
    { new: true }
  ).exec();

  return res.status(200).json({
    statusCode: 200,
    data: moderation,
    message: 'Ok!'
  });
};
