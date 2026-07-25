import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import mongoose from "mongoose";

import { connectDB } from "./backend/config/db.js";
import { globalLimiter } from "./backend/middleware/rateLimiter.js";
import { errorHandler } from "./backend/middleware/errorHandler.js";

import surveyRoutes from "./backend/routes/surveyRoutes.js";
import newsletterRoutes from "./backend/routes/newsletterRoutes.js";
import dreamRoutes from "./backend/routes/dreamRoutes.js";
import geminiRoutes from "./backend/routes/geminiRoutes.js";
import secureMessageRoutes from "./backend/routes/secureMessageRoutes.js";

dotenv.config();

const PORT = process.env.PORT || 3000;
const app = express();

// Disable X-Powered-By header to prevent server technology fingerprinting
app.disable("x-powered-by");

// Trust reverse proxy for rate limiter (Cloud Run / Nginx)
app.set("trust proxy", 1);

// 1. Security Headers Middleware (Helmet)
app.use(
  helmet({
    contentSecurityPolicy: false,
    crossOriginEmbedderPolicy: false,
    xssFilter: true,
    noSniff: true,
    hidePoweredBy: true
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
    maxAge: 86400
  })
);

// 3. Body Parsing Middleware with payload limit
app.use(express.json({ limit: "100kb" }));


// Rate Limiting
app.use("/api", globalLimiter);

// Database Connection
connectDB();

// Health Check Endpoint
app.get("/api/health", (req, res) => {
  const isMongoConnected = mongoose.connection.readyState === 1;
  res.json({
    status: "ok",
    message: "Server backend active",
    backend: "ONLINE",
    mongodb: isMongoConnected ? "CONNECTED" : "OFFLINE",
    mongoReadyState: mongoose.connection.readyState,
    timestamp: new Date().toISOString()
  });
});

// API Routes
app.use("/api/website-survey", surveyRoutes);
app.use("/api/secure-message", secureMessageRoutes);
app.use("/api/newsletter", newsletterRoutes);
app.use("/api/dreams", dreamRoutes);
app.use("/api/gemini", geminiRoutes);

// Error Handler Middleware
app.use(errorHandler);

// Vite & Static assets server routing
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "mpa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    
    app.get("/:page.html", (req, res) => {
      res.sendFile(path.join(distPath, `${req.params.page}.html`));
    });
    
    app.get("/", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
    
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`🚀 App running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
