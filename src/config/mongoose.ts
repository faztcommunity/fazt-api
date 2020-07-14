// Copyright 2020 Fazt Community ~ All rights reserved. MIT license.

import mongoose from 'mongoose';
import { MONGODB_URI } from '../config';

export const makeConnection = async () => {
  try {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true
    });
    console.log(`Database is connected`);
  } catch (error) {
    console.error(error);
  }
};
