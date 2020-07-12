import { Schema, model, Document } from 'mongoose';

interface ISetting extends Document {
  name: string;
  value: string;
}

interface IModeration extends Document {
  user_id: string;
  type: string;
  reason: string;
  moderator_id: string;
  creation_date: Date;
  expiration_date: Date;
  revoked: boolean;
}

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
