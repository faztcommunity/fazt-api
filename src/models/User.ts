// Copyright 2020 Fazt Community ~ All rights reserved. MIT license.
import { Schema, model, Document } from "mongoose";
import bcrypt from "bcryptjs";

export interface IUser extends Document {
  nickname: string;
  firstName?: string;
  lastName?: string;
  email: string;
  password: string;
  createdAt: Date;

  setPassword(password: string): Promise<void>;
  comparePassword(password: string): Promise<boolean>;
}

const UserSchema: Schema<IUser> = new Schema<IUser>(
  {
    nickname: {
      type: String,
      required: true,
      unique: true,
    },
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.methods.setPassword = async function (password: string) {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(password, salt);
};

UserSchema.methods.comparePassword = async function(password: string) {
  return await bcrypt.compare(password, this.password);
};

export default model<IUser>("User", UserSchema);
