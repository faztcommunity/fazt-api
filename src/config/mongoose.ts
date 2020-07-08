import mongoose from "mongoose";
import { MONGODB_URI } from "../config";

export const makeConnection = async () => {
  try {
      console.log(MONGODB_URI)
    const db = await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    });
    console.log(`Database is connected to ${db.connection.host}`);
  } catch (error) {
    console.log(error);
  }
};
