// Copyright 2020 Fazt Community ~ All rights reserved. MIT license.
import { Schema, model, Document } from "mongoose";

export interface IWorkshop extends Document {
    title: string;
    description: string;
    date: Date;
  }

const newWorkshopSchema: Schema<IWorkshop> = new Schema<IWorkshop>({
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
}, {
    timestamps: true,
});

export default model<IWorkshop>("Workshop", newWorkshopSchema);
