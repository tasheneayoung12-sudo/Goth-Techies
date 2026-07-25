import express from "express";
import { generateAiResponse } from "../controllers/geminiController.js";
import { submissionLimiter } from "../middleware/rateLimiter.js";

const router = express.Router();

router.post("/generate", submissionLimiter, generateAiResponse);

export default router;
