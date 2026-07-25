import { Dream } from "../models/Dream.js";
import { Subscriber } from "../models/Subscriber.js";
import mongoose from "mongoose";
import fs from "fs";
import path from "path";

const LOCAL_DREAMS_FILE = path.join(process.cwd(), "local_dreams.json");

function getLocalDreams() {
  try {
    if (fs.existsSync(LOCAL_DREAMS_FILE)) {
      return JSON.parse(fs.readFileSync(LOCAL_DREAMS_FILE, "utf-8"));
    }
  } catch (err) {
    console.error("Local dreams read error:", err);
  }
  return [];
}

function saveLocalDream(dream) {
  const dreams = getLocalDreams();
  dreams.unshift(dream);
  try {
    fs.writeFileSync(LOCAL_DREAMS_FILE, JSON.stringify(dreams, null, 2));
  } catch (err) {
    console.error("Local dream save error:", err);
  }
  return dreams;
}

/**
 * @desc Inject a new dream/suggestion
 * @route POST /api/dreams/inject
 */
export const injectDream = async (req, res, next) => {
  try {
    const { email, category, title, targetYear, description, subscribeNewsletter, isAnonymous, location } = req.body;

    if (!email || typeof email !== "string" || !email.includes("@")) {
      return res.status(400).json({ success: false, error: "Invalid email address." });
    }
    if (!title || typeof title !== "string" || title.trim() === "") {
      return res.status(400).json({ success: false, error: "Title details cannot be empty." });
    }

    const trimmedEmail = email.trim();
    const trimmedTitle = title.trim();
    const trimmedCategory = (category || "ANIME").toUpperCase();
    const year = targetYear || "2026";
    const desc = (description || "").trim();
    const shouldSubscribe = subscribeNewsletter === true || subscribeNewsletter === "true";
    const anonymous = isAnonymous === true || isAnonymous === "true";
    const loc = (location || "GENERIC_NODE").trim();

    if (mongoose.connection.readyState === 1) {
      const dreamDoc = await Dream.create({
        email: trimmedEmail,
        category: trimmedCategory,
        title: trimmedTitle,
        description: desc,
        targetYear: year,
        isAnonymous: anonymous,
        location: loc
      });

      if (shouldSubscribe) {
        await Subscriber.findOneAndUpdate(
          { email: trimmedEmail.toLowerCase() },
          { email: trimmedEmail.toLowerCase() },
          { upsert: true, new: true }
        );
      }

      const returnedDoc = dreamDoc.toObject();
      if (anonymous) {
        returnedDoc.email = "ANONYMOUS_NODE";
      }

      return res.status(201).json({
        success: true,
        message: "Uplink success! Stored in MongoDB Atlas.",
        dream: returnedDoc
      });
    }

    // Fallback to local
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
  } catch (error) {
    next(error);
  }
};

/**
 * @desc Get all dreams/suggestions
 * @route GET /api/dreams/all
 */
export const getAllDreams = async (req, res, next) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const dreams = await Dream.find().sort({ createdAt: -1 }).limit(100);
      const sanitized = dreams.map((d) => {
        const obj = d.toObject();
        if (obj.isAnonymous) {
          obj.email = "ANONYMOUS_NODE";
        }
        return obj;
      });
      return res.json({ success: true, count: sanitized.length, dreams: sanitized });
    }

    const localDreams = getLocalDreams().map((doc) => {
      const d = { ...doc };
      if (d.isAnonymous) {
        d.email = "ANONYMOUS_NODE";
      }
      return d;
    });
    return res.json({ success: true, count: localDreams.length, dreams: localDreams, database: "Local File DB" });
  } catch (error) {
    next(error);
  }
};
