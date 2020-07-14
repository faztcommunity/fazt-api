// Copyright 2020 Fazt Community ~ All rights reserved. MIT license.

import { Schema, model } from 'mongoose';

const newWorkshopSchema: Schema<IWorkshop> = new Schema<IWorkshop>(
  {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    date: {
      type: Date,
      required: true
    },
    workshopUser: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
  },
  {
    timestamps: true
  }
);

export default model<IWorkshop>('Workshop', newWorkshopSchema);
