import express from "express";
import { createSecureMessage, getSecureMessages } from "../controllers/secureMessageController.js";
import { submissionLimiter } from "../middleware/rateLimiter.js";
import { validateSecureMessageInput } from "../middleware/inputValidator.js";

const router = express.Router();

router.post("/", submissionLimiter, validateSecureMessageInput, createSecureMessage);
router.get("/", getSecureMessages);

export default router;

