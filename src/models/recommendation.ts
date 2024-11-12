import mongoose, { Document, Schema } from "mongoose";

// Interface defining the structure of a recommendation document
export interface RecommendationDocument extends Document {
  userId: string;
  recommendations: string[];
}

// MongoDB schema for storing user recommendations
const RecommendationSchema: Schema = new Schema({
  // User identifier field
  userId: { type: String, required: true },
  // Array of recommendation strings
  recommendations: { type: [String], required: true },
});

// Create and export the Mongoose model for recommendations
export const RecommendationModel = mongoose.model<RecommendationDocument>(
  "Recommendation",
  RecommendationSchema
);
