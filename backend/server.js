import express from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import mongoose from "mongoose";

import { connectDB } from "./config/db.js";
import { globalLimiter } from "./middleware/rateLimiter.js";
import { errorHandler } from "./middleware/errorHandler.js";

import surveyRoutes from "./routes/surveyRoutes.js";
import newsletterRoutes from "./routes/newsletterRoutes.js";
import dreamRoutes from "./routes/dreamRoutes.js";
import geminiRoutes from "./routes/geminiRoutes.js";
import secureMessageRoutes from "./routes/secureMessageRoutes.js";

// Load environment variables from .env file
dotenv.config();

const app = express();

// Trust reverse proxy for rate limiter (Cloud Run / Nginx)
app.set("trust proxy", 1);

const PORT = process.env.PORT || 3000;

// 1. Security Headers Middleware (Helmet)
app.use(
  helmet({
    contentSecurityPolicy: false // Disabled CSP restriction to allow frontend inline scripts and media sources
  })
);

// 2. Cross-Origin Resource Sharing (CORS) Middleware
app.use(cors());

// 3. Body Parsing Middleware
app.use(express.json());

// 4. Rate Limiting Middleware (Global Protection)
app.use("/api", globalLimiter);

// 5. Connect to MongoDB Atlas
connectDB();

// 6. Health Check Route
app.get("/api/health", (req, res) => {
  const isMongoConnected = mongoose.connection.readyState === 1;
  res.json({
    status: "ok",
    message: "Production Backend Service Active",
    backend: "ONLINE",
    mongodb: isMongoConnected ? "CONNECTED" : "OFFLINE",
    mongoReadyState: mongoose.connection.readyState,
    timestamp: new Date().toISOString()
  });
});

// 7. Mount API Routes
app.use("/api/website-survey", surveyRoutes);
app.use("/api/secure-message", secureMessageRoutes);
app.use("/api/newsletter", newsletterRoutes);
app.use("/api/dreams", dreamRoutes);
app.use("/api/gemini", geminiRoutes);

// 8. Global Error Handler
app.use(errorHandler);

// Start Server
if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`🚀 Secure Production Backend running on http://0.0.0.0:${PORT}`);
  });
}

export default app;
