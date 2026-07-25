import express from "express";
import { injectDream, getAllDreams } from "../controllers/dreamController.js";
import { submissionLimiter } from "../middleware/rateLimiter.js";
import { validateDreamInput } from "../middleware/inputValidator.js";

const router = express.Router();

router.post("/inject", submissionLimiter, validateDreamInput, injectDream);
router.get("/all", getAllDreams);

export default router;

