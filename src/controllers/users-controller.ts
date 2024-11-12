import { Request, Response } from "express";
import { RecommendationModel } from "../models/recommendation";

export const getUserRecommendations = async (req: Request, res: Response) => {
  // Extract user ID from URL parameters
  const userId = req.params.user_id;

  try {
    // Query database for user's stored recommendations
    const recommendations = await RecommendationModel.findOne({ userId });

    // Return 404 if no recommendations exist for this user
    if (!recommendations) {
      return res.status(404).json({
        error: `No recommendations found for user_id ${userId}.`,
      });
    }

    // Return recommendations in standardized format
    res.status(200).json({
      user_id: userId,
      recommendations: recommendations.recommendations,
    });
  } catch (error) {
    // Handle database query errors with user-friendly message
    res.status(500).json({
      error: "Failed to retrieve recommendations. Please try again later.",
    });
  }
};
