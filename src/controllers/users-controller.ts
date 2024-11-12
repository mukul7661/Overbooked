import { Request, Response } from "express";
import { RecommendationModel } from "../models/recommendation";

export const getUserRecommendations = async (req: Request, res: Response) => {
  const userId = req.params.user_id;

  try {
    const recommendations = await RecommendationModel.findOne({ userId });

    if (!recommendations) {
      return res.status(404).json({
        error: `No recommendations found for user_id ${userId}.`,
      });
    }

    res.json({
      user_id: userId,
      recommendations: recommendations.recommendations,
    });
  } catch (error) {
    res.status(500).json({
      error: "Failed to retrieve recommendations. Please try again later.",
    });
  }
};
