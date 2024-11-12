import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const DATABASE_URI =
  process.env.DATABASE_URI || "mongodb://localhost:27017/dev";

export const connectDB = async () => {
  try {
    await mongoose.connect(DATABASE_URI);
    console.log("Connected to the database");
  } catch (error) {
    console.error("Database connection error:", error);
  }
};
