import { Handler } from '../types';
import { ErrorHandler } from '../error';
import { NOT_FOUND } from 'http-status-codes';
import Discord from '../models/Discord';

export const getDiscords: Handler = async (req, res) => {
  return res.json();
};

export const getDiscord: Handler = async (req, res) => {
  const discord = await Discord.findById(req.params.id).exec();
  if (!discord) {
    throw new ErrorHandler(NOT_FOUND, 'Discord not found');
  }

  return res.status(200).json(discord);
};
export const createDiscord: Handler = async (req, res) => {
  const discord = new Discord(req.body);
  await discord.save();
  return res.status(200).json({ message: 'Discord Created' });
};
export const deleteDiscord = async () => {};
export const updateDiscord = async () => {};
