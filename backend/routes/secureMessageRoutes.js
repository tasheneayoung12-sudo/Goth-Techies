import express from "express";
import { createSecureMessage, getSecureMessages } from "../controllers/secureMessageController.js";
import { submissionLimiter } from "../middleware/rateLimiter.js";

const router = express.Router();

router.post("/", submissionLimiter, createSecureMessage);
router.get("/", getSecureMessages);

export default router;
