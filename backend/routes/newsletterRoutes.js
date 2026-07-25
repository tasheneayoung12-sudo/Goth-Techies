import express from "express";
import { subscribeNewsletter, getSubscribers } from "../controllers/newsletterController.js";
import { submissionLimiter } from "../middleware/rateLimiter.js";
import { validateNewsletterInput } from "../middleware/inputValidator.js";

const router = express.Router();

router.post("/subscribe", submissionLimiter, validateNewsletterInput, subscribeNewsletter);
router.get("/subscribers", getSubscribers);

export default router;

