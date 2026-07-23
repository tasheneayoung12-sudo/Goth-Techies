import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";
import fs from "fs";
import mongoose from "mongoose";
import { WebsiteSurvey } from "./src/db/survey.model";

dotenv.config();

// Establish MongoDB connection via Mongoose using the environment variable
const MONGODB_URI = process.env.MONGODB_URI;
if (MONGODB_URI) {
  mongoose.connect(MONGODB_URI)
    .then(() => console.log("✅ Successfully connected to MongoDB Atlas via Mongoose!"))
    .catch((err) => console.error("❌ MongoDB Atlas connection error:", err));
} else {
  console.log("⚠️ MONGODB_URI environment variable is not set. Database integration will be inactive.");
}

const PORT = 3000;
const app = express();

app.use(express.json());

// Local JSON file database configuration
const LOCAL_DB_FILE = path.join(process.cwd(), "local_subscribers.json");

function getLocalSubscribers(): Array<{ email: string; timestamp: string }> {
  try {
    if (fs.existsSync(LOCAL_DB_FILE)) {
      const data = fs.readFileSync(LOCAL_DB_FILE, "utf-8");
      return JSON.parse(data);
    }
  } catch (err) {
    console.error("Failed to read local subscribers:", err);
  }
  return [];
}

function saveLocalSubscriber(email: string): Array<{ email: string; timestamp: string }> {
  const subs = getLocalSubscribers();
  if (!subs.some((s) => s.email.toLowerCase() === email.toLowerCase())) {
    subs.push({
      email,
      timestamp: new Date().toISOString()
    });
    try {
      fs.writeFileSync(LOCAL_DB_FILE, JSON.stringify(subs, null, 2));
    } catch (err) {
      console.error("Failed to save local subscribers:", err);
    }
  }
  return subs;
}

const LOCAL_DREAMS_FILE = path.join(process.cwd(), "local_dreams.json");

function getLocalDreams(): Array<any> {
  try {
    if (fs.existsSync(LOCAL_DREAMS_FILE)) {
      const data = fs.readFileSync(LOCAL_DREAMS_FILE, "utf-8");
      return JSON.parse(data);
    }
  } catch (err) {
    console.error("Failed to read local dreams:", err);
  }
  return [
    {
      id: "dream_1",
      category: "TEACHING",
      title: "Launch a gothic coding curriculum for alternative youth",
      targetYear: "2026",
      status: "ACTIVE_ROUTE",
      email: "mentor@cyberhive.net"
    },
    {
      id: "dream_2",
      category: "GAMING",
      title: "Design and build an indie mecha platformer live on stream",
      targetYear: "2027",
      status: "INITIALIZING",
      email: "gamer@cyberhive.net"
    },
    {
      id: "dream_3",
      category: "SPOOKY",
      title: "Release a weekly gothic tech/horror analysis podcast series",
      targetYear: "2028",
      status: "COMPILED",
      email: "horror@cyberhive.net"
    }
  ];
}

function saveLocalDream(dream: any): Array<any> {
  const dreams = getLocalDreams();
  dreams.unshift(dream);
  try {
    fs.writeFileSync(LOCAL_DREAMS_FILE, JSON.stringify(dreams, null, 2));
  } catch (err) {
    console.error("Failed to save local dreams:", err);
  }
  return dreams;
}

// REST API Endpoints using local storage
app.post("/api/website-survey", async (req, res) => {
  try {
    const { email, category, title, description, newsletterConsent } = req.body;

    // Server-side validation
    if (!email || typeof email !== "string" || !email.includes("@")) {
      return res.status(400).json({ success: false, error: "Please provide a valid Node Email address." });
    }
    if (!category || typeof category !== "string" || category.trim() === "") {
      return res.status(400).json({ success: false, error: "Protocol Category is required." });
    }
    if (!title || typeof title !== "string" || title.trim() === "") {
      return res.status(400).json({ success: false, error: "Suggestion/Checkpoint Title is required." });
    }
    if (!description || typeof description !== "string" || description.trim() === "") {
      return res.status(400).json({ success: false, error: "Detailed Description is required." });
    }

    // Attempt saving to MongoDB
    if (mongoose.connection.readyState !== 1) {
      console.warn("⚠️ Mongoose is not connected. Attempting automatic recovery or fail fast.");
    }

    const surveyDoc = new WebsiteSurvey({
      email: email.trim(),
      category: category.trim(),
      title: title.trim(),
      description: description.trim(),
      newsletterConsent: newsletterConsent === true || newsletterConsent === "true",
      formName: "Website Survey"
    });

    await surveyDoc.save();

    return res.json({
      success: true,
      message: "UPLINK SUCCESSFUL: Transmitted to database terminal under websiteSurvey collection.",
      data: surveyDoc
    });
  } catch (err: any) {
    console.error("Survey insertion error:", err);
    return res.status(500).json({
      success: false,
      error: err?.message || "Internal server uplink failure."
    });
  }
});

app.post("/api/dreams/inject", async (req, res) => {
  try {
    const { email, category, title, targetYear, description, subscribeNewsletter, isAnonymous, location } = req.body;
    if (!email || typeof email !== "string" || !email.includes("@")) {
      return res.status(400).json({ success: false, error: "Invalid email address." });
    }
    if (!title || typeof title !== "string" || title.trim() === "") {
      return res.status(400).json({ success: false, error: "Submission suggestion details cannot be empty." });
    }

    const trimmedEmail = email.trim();
    const trimmedTitle = title.trim();
    const trimmedCategory = (category || "ANIME").toUpperCase();
    const year = targetYear || "2026";
    const desc = (description || "").trim();
    const shouldSubscribe = subscribeNewsletter === true || subscribeNewsletter === "true";
    const anonymous = isAnonymous === true || isAnonymous === "true";
    const loc = (location || "GENERIC_NODE").trim();

    const newDream = {
      id: `dream_${Date.now()}`,
      category: trimmedCategory,
      title: trimmedTitle,
      description: desc,
      targetYear: year,
      status: "INJECTED_NODE",
      email: trimmedEmail,
      isAnonymous: anonymous,
      location: loc,
      timestamp: new Date().toISOString()
    };

    saveLocalDream(newDream);
    if (shouldSubscribe) {
      saveLocalSubscriber(trimmedEmail);
    }

    const returnedDream = { ...newDream };
    if (anonymous) {
      returnedDream.email = "ANONYMOUS_NODE";
    }

    return res.json({
      success: true,
      message: "Uplink success! Suggestion stored safely.",
      database: "Local File DB",
      dream: returnedDream
    });
  } catch (err: any) {
    console.error("Dream injection error:", err);
    res.status(500).json({ success: false, error: err?.message || "Internal server error." });
  }
});

app.get("/api/dreams/all", async (req, res) => {
  try {
    const localDreams = getLocalDreams().map(doc => {
      const d = { ...doc };
      if (d.isAnonymous) {
        d.email = "ANONYMOUS_NODE";
      }
      return d;
    });
    return res.json({ success: true, dreams: localDreams, database: "Local File DB" });
  } catch (err: any) {
    console.error("Fetch dreams error:", err);
    res.status(500).json({ success: false, error: err?.message || "Internal server error." });
  }
});

app.post("/api/newsletter/subscribe", async (req, res) => {
  try {
    const { email } = req.body;
    if (!email || typeof email !== "string" || !email.includes("@")) {
      return res.status(400).json({ success: false, error: "Invalid email address." });
    }

    const trimmedEmail = email.trim();
    const subs = getLocalSubscribers();
    const isAlreadySubbed = subs.some(s => s.email.toLowerCase() === trimmedEmail.toLowerCase());
    
    if (!isAlreadySubbed) {
      saveLocalSubscriber(trimmedEmail);
    }

    return res.json({
      success: true,
      message: "Subscribed successfully!",
      database: "Local File DB",
      isNew: !isAlreadySubbed
    });
  } catch (err: any) {
    console.error("Subscription Error:", err);
    res.status(500).json({ success: false, error: err?.message || "Internal server error." });
  }
});

app.get("/api/newsletter/subscribers", async (req, res) => {
  try {
    const subs = getLocalSubscribers();
    const sorted = [...subs].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
    return res.json({ success: true, subscribers: sorted, database: "Local File DB" });
  } catch (err: any) {
    console.error("Get Subscribers Error:", err);
    res.status(500).json({ success: false, error: err?.message || "Internal server error." });
  }
});

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
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
