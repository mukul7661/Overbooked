import { Router, Request, Response } from "express";
import { validationResult } from "express-validator";
import { generateRecommendations } from "../controllers/recommendations-controller";
import { validateRecommendations } from "../utils/schemas";

const router = Router();

// POST endpoint for generating new recommendations
router.post("/", validateRecommendations, (req: Request, res: Response) => {
  // Check for validation errors from middleware
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // Return 400 Bad Request if validation fails
    return res.status(400).json({ errors: errors.array() });
  }
  // Process valid request in controller
  generateRecommendations(req, res);
});

export default router;
