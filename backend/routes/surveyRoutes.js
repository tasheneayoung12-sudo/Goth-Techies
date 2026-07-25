import express from "express";
import { submitSurvey, getSurveys } from "../controllers/surveyController.js";
import { submissionLimiter } from "../middleware/rateLimiter.js";
import { validateSurveyInput } from "../middleware/inputValidator.js";

const router = express.Router();

router.post("/", submissionLimiter, validateSurveyInput, submitSurvey);
router.get("/", getSurveys);

export default router;

