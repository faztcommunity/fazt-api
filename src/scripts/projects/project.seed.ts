// Copyright 2020 Fazt Community ~ All rights reserved. MIT license.

import mongoose from 'mongoose';
import { MONGODB_URI } from '../../config';
import Project from '../../models/Project';
import MockupProject from '../data/project.json';

const run = async () => {
  try {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true
    });

    console.log(`Database is connected`);
    
    const seedDb = new Project(MockupProject);
    await seedDb.save();
    console.log(`Seed Database!`);

    return process.exit(0);

  } catch (error) {
    console.error(error);
  }
};

run().catch(err => console.log(err));