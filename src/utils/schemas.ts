import { body } from "express-validator";

// Validation middleware for recommendation generation requests
export const validateRecommendations = [
  // Ensure userId is present and is a string
  body("userId").notEmpty().isString(),
  // Ensure preferences is present and is an array
  body("preferences").notEmpty().isArray(),
];
