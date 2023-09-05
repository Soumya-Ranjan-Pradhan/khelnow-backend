import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

const MONGO_URL = process.env.MONGO_URL;
// console.log(MONGO_URL);

const connectToMongoDB = async () => {
  try {
    await mongoose.connect(MONGO_URL);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

connectToMongoDB();

