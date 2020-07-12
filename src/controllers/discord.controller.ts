import { Handler } from '../types';
import { NOT_FOUND } from 'http-status-codes';

import { Setting, DiscordUser } from '../models/Discord';

export const getSetting: Handler = async (req, res) => {
  const setting = await Setting.findOne({ name: req.params.name }).exec();
  if (!setting) {
    return res.status(NOT_FOUND).json(null);
  }

  return res.status(200).json(setting);
};

export const updateOrCreateSetting: Handler = async (req, res) => {
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
    return res.json(setting);
  }

  return res.json(existSetting);
};
