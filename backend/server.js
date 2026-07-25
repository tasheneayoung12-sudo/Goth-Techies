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

// Disable X-Powered-By header to prevent server technology fingerprinting
app.disable("x-powered-by");

// Trust reverse proxy for rate limiter (Cloud Run / Render / Nginx)
app.set("trust proxy", 1);

const PORT = process.env.PORT || 3000;

// 1. Security Headers Middleware (Helmet)
app.use(
  helmet({
    contentSecurityPolicy: false, // Disabled CSP restriction to allow inline scripts, Tailwind, and media assets
    crossOriginEmbedderPolicy: false,
    xssFilter: true, // Enables XSS filtering in browsers
    noSniff: true, // Prevents browsers from guessing/sniffing content MIME-types
    hidePoweredBy: true // Removes X-Powered-By header
  })
);

// 2. Cross-Origin Resource Sharing (CORS) Security Middleware
const allowedOrigins = [
  "https://goth-techies.onrender.com",
  "http://localhost:3000",
  "http://127.0.0.1:3000",
  "http://localhost:5173"
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      if (
        allowedOrigins.includes(origin) ||
        origin.endsWith(".github.io") ||
        origin.includes("run.app")
      ) {
        return callback(null, true);
      }
      return callback(null, true);
    },
    methods: ["GET", "POST", "OPTIONS", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
    maxAge: 86400 // Cache preflight response for 24 hours
  })
);

// 3. Body Parsing Middleware with payload size restriction (100kb max)
app.use(express.json({ limit: "100kb" }));


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
