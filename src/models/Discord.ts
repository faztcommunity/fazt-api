import { Schema, model } from 'mongoose';

const SettingSchema = new Schema({
  name: {
    type: String
  },
  value: {
    type: String
  }
});

const DiscordUserSchema = new Schema({
  type: {
    type: String
  },
  user_id: {
    type: String,
    required: true
  },
  reason: {
    type: String
  },
  moderator_id: {
    type: String
  },
  expiration_date: {
    type: Date
  },
  creation_date: {
    type: Date,
    default: new Date()
  },
  revoked: {
    type: Boolean
  }
});

export const Setting = model('Setting', SettingSchema);
export const DiscordUser = model('DiscordUser', DiscordUserSchema);
