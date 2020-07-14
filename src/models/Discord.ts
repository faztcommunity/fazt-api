// Copyright 2020 Fazt Community ~ All rights reserved. MIT license.

import { Schema, model } from 'mongoose';

const SettingSchema = new Schema<ISetting>({
  name: {
    type: String
  },
  value: {
    type: String
  }
});

const ModerationSchema = new Schema<IModeration>({
  type: {
    type: String,
    required: true
  },
  user_id: {
    type: String,
    required: true
  },
  reason: {
    type: String,
    required: true
  },
  moderator_id: {
    type: String,
    required: true
  },
  expiration_date: {
    type: Date
  },
  creation_date: {
    type: Date,
    default: new Date()
  },
  revoked: {
    type: Boolean,
    default: false
  }
});

export const Setting = model<ISetting>('Setting', SettingSchema);
export const Moderation = model<IModeration>('Moderation', ModerationSchema);
