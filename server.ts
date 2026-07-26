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

// Images API Endpoint for backend & frontend visibility
app.get("/api/images", (req, res) => {
  const images = [
    { name: "Goth_Techieslogo.png", path: "images/Goth_Techieslogo.png", assetPath: "assets/images/Goth_Techieslogo.png" }
  ];
  res.json({ status: "success", count: images.length, images });
});

// Helper to parse Google Drive URLs and extract file or folder ID
function extractGoogleDriveFileId(urlOrId: string): string | null {
  if (!urlOrId) return null;
  const trimmed = urlOrId.trim();
  if (/^[a-zA-Z0-9_-]{20,60}$/.test(trimmed)) {
    return trimmed;
  }
  const fileDMatch = trimmed.match(/\/d\/([a-zA-Z0-9_-]+)/);
  if (fileDMatch && fileDMatch[1]) return fileDMatch[1];
  
  const idMatch = trimmed.match(/[?&]id=([a-zA-Z0-9_-]+)/);
  if (idMatch && idMatch[1]) return idMatch[1];
  
  const folderMatch = trimmed.match(/\/folders\/([a-zA-Z0-9_-]+)/);
  if (folderMatch && folderMatch[1]) return folderMatch[1];

  return null;
}

// Google Drive Folder Listing Endpoint (Supports folder name '0-Goth Techies' & Folder URLs)
app.get("/api/drive/folder", async (req, res) => {
  try {
    const { google } = await import("googleapis");
    const authHeader = req.headers.authorization;
    const tokenFromReq = authHeader?.startsWith("Bearer ") ? authHeader.substring(7) : (req.query.token as string);
    const targetFolder = (req.query.folder as string) || (req.query.folderId as string) || (req.query.url as string) || "0-Goth Techies";
    
    let folderId = extractGoogleDriveFileId(targetFolder);

    const oauth2Client = new google.auth.OAuth2();
    if (tokenFromReq) {
      oauth2Client.setCredentials({ access_token: tokenFromReq });
    }

    const drive = google.drive({ version: "v3", auth: tokenFromReq ? oauth2Client : undefined });

    // If targetFolder is a folder name like "0-Goth Techies" and we have auth token
    if (!folderId && tokenFromReq) {
      const folderSearch = await drive.files.list({
        q: `name = '${targetFolder.replace(/'/g, "\\'")}' and mimeType = 'application/vnd.google-apps.folder' and trashed = false`,
        fields: "files(id, name)",
        pageSize: 5
      });
      if (folderSearch.data.files && folderSearch.data.files.length > 0) {
        folderId = folderSearch.data.files[0].id || null;
      }
    }

    let query = "trashed = false";
    if (folderId) {
      query += ` and '${folderId}' in parents`;
    } else {
      query += ` and name contains 'goth'`;
    }

    if (tokenFromReq) {
      const filesRes = await drive.files.list({
        q: query,
        fields: "files(id, name, mimeType, webContentLink, thumbnailLink)",
        pageSize: 50
      });
      const files = (filesRes.data.files || []).map((f) => ({
        id: f.id,
        name: f.name,
        mimeType: f.mimeType,
        directUrl: `https://lh3.googleusercontent.com/d/${f.id}`,
        thumbnailUrl: `https://drive.google.com/thumbnail?id=${f.id}&sz=w1000`,
        proxyUrl: `/api/drive/image/${f.id}`
      }));
      return res.json({ status: "success", folderName: targetFolder, folderId, count: files.length, files });
    }

    // Fallback response for unauthenticated calls
    return res.json({
      status: "info",
      folderName: targetFolder,
      folderId,
      message: `Connect Google Drive or paste a Google Drive folder link/ID for folder '${targetFolder}'`,
      instructions: "Paste your Google Drive '0-Goth Techies' folder link or File IDs into the input box below."
    });
  } catch (error: any) {
    console.error("Google Drive API folder list error:", error?.message || error);
    res.status(500).json({ status: "error", message: error?.message || "Failed to list Google Drive folder" });
  }
});

// Google Drive Link Parser API Endpoint
app.get("/api/drive/parse-link", (req, res) => {
  const url = (req.query.url as string) || "";
  const fileId = extractGoogleDriveFileId(url);
  if (!fileId) {
    return res.status(400).json({ status: "error", message: "Could not extract Google Drive File ID from URL" });
  }
  res.json({
    status: "success",
    fileId,
    urls: {
      directUrl: `https://lh3.googleusercontent.com/d/${fileId}`,
      thumbnailUrl: `https://drive.google.com/thumbnail?id=${fileId}&sz=w1000`,
      proxyUrl: `/api/drive/image/${fileId}`,
      embedUrl: `https://drive.google.com/file/d/${fileId}/preview`
    }
  });
});

app.post("/api/drive/parse-link", (req, res) => {
  const url = req.body?.url || "";
  const fileId = extractGoogleDriveFileId(url);
  if (!fileId) {
    return res.status(400).json({ status: "error", message: "Could not extract Google Drive File ID from URL" });
  }
  res.json({
    status: "success",
    fileId,
    urls: {
      directUrl: `https://lh3.googleusercontent.com/d/${fileId}`,
      thumbnailUrl: `https://drive.google.com/thumbnail?id=${fileId}&sz=w1000`,
      proxyUrl: `/api/drive/image/${fileId}`,
      embedUrl: `https://drive.google.com/file/d/${fileId}/preview`
    }
  });
});

// Google Drive Image Stream Proxy Endpoint (backend & frontend image streaming)
app.get("/api/drive/image/:fileId", async (req, res) => {
  const { fileId } = req.params;
  const cleanId = extractGoogleDriveFileId(fileId);
  if (!cleanId) {
    return res.status(400).json({ error: "Invalid Google Drive File ID" });
  }

  const driveUrls = [
    `https://lh3.googleusercontent.com/d/${cleanId}`,
    `https://drive.google.com/thumbnail?id=${cleanId}&sz=w1600`,
    `https://drive.google.com/uc?export=download&id=${cleanId}`
  ];

  for (const url of driveUrls) {
    try {
      const response = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0" } });
      if (response.ok) {
        const contentType = response.headers.get("content-type") || "";
        if (contentType.includes("image") || contentType.includes("octet-stream")) {
          res.setHeader("Content-Type", contentType.includes("image") ? contentType : "image/jpeg");
          res.setHeader("Cache-Control", "public, max-age=86400");
          const arrayBuffer = await response.arrayBuffer();
          return res.send(Buffer.from(arrayBuffer));
        }
      }
    } catch (e) {
      console.error(`Failed to stream Google Drive image from ${url}:`, e);
    }
  }

  res.redirect(`https://lh3.googleusercontent.com/d/${cleanId}`);
});

// Error Handler Middleware
app.use(errorHandler);

// Vite & Static assets server routing
async function startServer() {
  const distPath = path.join(process.cwd(), "dist");
  const publicPath = path.join(process.cwd(), "public");

  // Serve static assets from public/ directory in development and production
  app.use(express.static(publicPath));
  app.use("/assets", express.static(path.join(publicPath, "assets")));
  app.use("/images", express.static(path.join(publicPath, "images")));

  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "mpa",
    });
    app.use(vite.middlewares);
  } else {
    // Primary build output static server
    app.use(express.static(distPath));
    app.use("/assets", express.static(path.join(distPath, "assets")));
    app.use("/images", express.static(path.join(distPath, "images")));
    
    // Explicit 404 handler for missing asset files to avoid sending HTML (index.html) as image payload
    app.use(["/assets/*", "/images/*", "/*.jpg", "/*.jpeg", "/*.png", "/*.svg", "/*.webp", "/*.css", "/*.js"], (req, res) => {
      res.status(404).send("Asset not found");
    });

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
