import { Schema, model } from 'mongoose';

const SettingSchema = new Schema({
  name: {
    type: String
  },
  value: {
    type: String
  }
});

const ModerationSchema = new Schema({
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

export const Setting = model('Setting', SettingSchema);
export const Moderation = model('Moderation', ModerationSchema);
