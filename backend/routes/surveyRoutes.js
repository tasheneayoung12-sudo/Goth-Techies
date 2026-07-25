import express from "express";
import { submitSurvey, getSurveys } from "../controllers/surveyController.js";
import { submissionLimiter } from "../middleware/rateLimiter.js";

const router = express.Router();

router.post("/", submissionLimiter, submitSurvey);
router.get("/", getSurveys);

export default router;
