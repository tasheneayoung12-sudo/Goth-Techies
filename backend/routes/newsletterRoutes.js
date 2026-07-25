import express from "express";
import { subscribeNewsletter, getSubscribers } from "../controllers/newsletterController.js";
import { submissionLimiter } from "../middleware/rateLimiter.js";

const router = express.Router();

router.post("/subscribe", submissionLimiter, subscribeNewsletter);
router.get("/subscribers", getSubscribers);

export default router;
