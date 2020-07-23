// Copyright 2020 Fazt Community ~ All rights reserved. MIT license.

import { Schema, model } from 'mongoose';

const ProjectSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    status: {
      type: String,
      default: 'active',
      enum: ['active', 'deleted', 'canceled', 'deprecated']
    },
    tags: [
      {
        type: String
      }
    ],
    type: {
      type: String,
      default: 'code',
      enum: ['code', 'design']
    },
    url: {
      type: String
    },
    github_url: {
      type: String
    },
    image_path: {
      type: String
    },
    contributors: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User'
      }
    ]
  },
  {
    timestamps: true
  }
);

export default model<IProject>('Project', ProjectSchema);
