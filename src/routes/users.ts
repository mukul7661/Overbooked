import { Router } from "express";
import { getUserRecommendations } from "../controllers/users-controller";

const router = Router();

// GET endpoint for retrieving a user's saved recommendations
router.get("/:user_id/recommendations", getUserRecommendations);

export default router;
