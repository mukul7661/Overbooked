// src/routes/recommendations.ts

import { Router, Request, Response } from "express";
import { validationResult } from "express-validator";
import { generateRecommendations } from "../controllers/recommendations-controller";
import { validateRecommendations } from "../utils/schemas";
// import { validateRecommendations } from '../utils/schemas';
// import { validationResult } from 'express-validator';

const router = Router();

/**
 * TODO: Set up the `/recommendations` POST route.
 *
 * Steps:
 * 1. Apply validation middleware to validate the request body.
 * 2. Use the `generateRecommendations` controller to handle the request.
 * 3. Handle validation errors appropriately.
 *
 * Hints:
 * - Use `express-validator` for input validation.
 * - Use `validationResult` to check for validation errors.
 */

// Example (from a different context):

router.post("/", validateRecommendations, (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  generateRecommendations(req, res);
});

export default router;
