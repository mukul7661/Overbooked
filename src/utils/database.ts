import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

// Set database connection string, fallback to local MongoDB if not specified
const DATABASE_URI =
  process.env.DATABASE_URI || "mongodb://localhost:27017/dev";

// Initialize MongoDB connection using Mongoose
export const connectDB = async () => {
  try {
    await mongoose.connect(DATABASE_URI);
    console.log("Connected to the database");
  } catch (error) {
    // Log any connection errors for debugging
    console.error("Database connection error:", error);
  }
};
