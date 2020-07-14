// Copyright 2020 Fazt Community ~ All rights reserved. MIT license.

import { Schema, model } from 'mongoose';
import bcrypt from 'bcryptjs';

const UserSchema: Schema<IUser> = new Schema<IUser>(
  {
    nickname: {
      type: String,
      required: true,
      unique: true
    },
    firstName: {
      type: String
    },
    lastName: {
      type: String
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

UserSchema.methods.setPassword = async function (password: string) {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(password, salt);
};

UserSchema.methods.comparePassword = async function (password: string) {
  return await bcrypt.compare(password, this.password);
};

export default model<IUser>('User', UserSchema);
