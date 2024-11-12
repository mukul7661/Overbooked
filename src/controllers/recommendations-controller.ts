import { Request, Response } from "express";
import axios from "axios";
import { RecommendationModel } from "../models/recommendation";
const API_URL =
  process.env.NODE_ENV === "test"
    ? "http://localhost:8080/llm/generate"
    : "http://wiremock:8080/llm/generate";

export const generateRecommendations = async (req: Request, res: Response) => {
  // Extract user ID and preferences from request body
  const { userId, preferences } = req.body;

  try {
    // Call external LLM API to generate personalized recommendations
    const apiResponse = await axios.post(API_URL, {
      user_id: userId,
      preferences,
    });

    // Store recommendations in database
    const recommendation = new RecommendationModel({
      userId,
      recommendations: apiResponse.data.recommendations,
    });
    await recommendation.save();

    // Return formatted response to client
    const formattedResponse = {
      userId,
      recommendations: apiResponse.data.recommendations,
    };
    res.status(200).json(formattedResponse);
  } catch (error: any) {
    // Log error and return user-friendly error message
    console.error("Error generating promotions:", error);
    res.status(500).json({
      error:
        "Unable to generate promotions at this time. Please try again later.",
    });
  }
};
