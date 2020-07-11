import { Schema, model, Document } from "mongoose";
import bcrypt from "bcrypt";

export interface IUser extends Document {
  nickname: string;
  firstName?: string;
  lastName?: string;
  email: string;
  password: string;
  createdAt: Date;

  setPassword(password: string): Promise<void>;
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
      required: true,
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

export default model<IUser>("User", UserSchema);
