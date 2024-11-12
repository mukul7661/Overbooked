import { body } from "express-validator";

export const validateRecommendations = [
  body("userId").notEmpty().isString(),
  body("preferences").notEmpty().isArray(),
];
