import express from "express";
import { injectDream, getAllDreams } from "../controllers/dreamController.js";
import { submissionLimiter } from "../middleware/rateLimiter.js";

const router = express.Router();

router.post("/inject", submissionLimiter, injectDream);
router.get("/all", getAllDreams);

export default router;
