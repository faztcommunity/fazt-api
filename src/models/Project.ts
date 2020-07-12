// Copyright 2020 Fazt Community ~ All rights reserved. MIT license.
import { Schema, model, Document } from "mongoose";

const ProjectSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: "active",
      enum: ["active", "deleted", "csanceled", "deprecated"],
    },
    tags: [
      {
        type: String,
      },
    ],
    projectType: {
      type: String,
      default: "code",
      enum: ["code", "design"],
    },
    url: {
      type: String
    },
    githubURL: {
      type: String
    }
  },
  {
    timestamps: true,
  }
);

export interface IProject extends Document {
  name: string;
  description: string;
  status: "active" | "deleted" | "canceled" | "deprecated";
  tags: string[];
}

export default model<IProject>("Project", ProjectSchema);
