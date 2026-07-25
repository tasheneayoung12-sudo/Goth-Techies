import express from "express";
import { generateAiResponse } from "../controllers/geminiController.js";
import { aiLimiter } from "../middleware/rateLimiter.js";
import { validateGeminiInput } from "../middleware/inputValidator.js";

const router = express.Router();

router.post("/generate", aiLimiter, validateGeminiInput, generateAiResponse);

export default router;

