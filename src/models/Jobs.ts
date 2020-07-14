// Copyright 2020 Fazt Community ~ All rights reserved. MIT license.

import { Schema, model } from 'mongoose';

const JobsSchema = new Schema(
  {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    employer: {
      type: String,
      required: true
    },
    employerEmail: {
      type: String,
      required: true
    },
    proposals: [
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

export default model<IJob>('Jobs', JobsSchema);
