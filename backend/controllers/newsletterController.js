import { Subscriber } from "../models/Subscriber.js";
import mongoose from "mongoose";
import fs from "fs";
import path from "path";

const LOCAL_DB_FILE = path.join(process.cwd(), "local_subscribers.json");

function getLocalSubscribers() {
  try {
    if (fs.existsSync(LOCAL_DB_FILE)) {
      return JSON.parse(fs.readFileSync(LOCAL_DB_FILE, "utf-8"));
    }
  } catch (err) {
    console.error("Local subscribers read error:", err);
  }
  return [];
}

function saveLocalSubscriber(email) {
  const subs = getLocalSubscribers();
  if (!subs.some((s) => s.email.toLowerCase() === email.toLowerCase())) {
    subs.push({ email, timestamp: new Date().toISOString() });
    try {
      fs.writeFileSync(LOCAL_DB_FILE, JSON.stringify(subs, null, 2));
    } catch (err) {
      console.error("Local subscriber save error:", err);
    }
  }
  return subs;
}

/**
 * @desc Subscribe to newsletter
 * @route POST /api/newsletter/subscribe
 */
export const subscribeNewsletter = async (req, res, next) => {
  try {
    const { email } = req.body;
    if (!email || typeof email !== "string" || !email.includes("@")) {
      return res.status(400).json({ success: false, error: "Please provide a valid email address." });
    }

    const trimmedEmail = email.trim().toLowerCase();

    // Try MongoDB first if connected
    if (mongoose.connection.readyState === 1) {
      const existing = await Subscriber.findOne({ email: trimmedEmail });
      if (!existing) {
        await Subscriber.create({ email: trimmedEmail });
      }
      return res.status(200).json({
        success: true,
        message: "Subscribed successfully to MongoDB Atlas!",
        isNew: !existing
      });
    }

    // Fallback to local file store
    const localSubs = getLocalSubscribers();
    const isAlreadySubbed = localSubs.some(s => s.email.toLowerCase() === trimmedEmail);
    if (!isAlreadySubbed) {
      saveLocalSubscriber(trimmedEmail);
    }

    return res.status(200).json({
      success: true,
      message: "Subscribed successfully!",
      database: "Local File DB",
      isNew: !isAlreadySubbed
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc Get all newsletter subscribers
 * @route GET /api/newsletter/subscribers
 */
export const getSubscribers = async (req, res, next) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const subscribers = await Subscriber.find({ active: true }).sort({ createdAt: -1 });
      return res.json({ success: true, count: subscribers.length, subscribers });
    }

    const localSubs = getLocalSubscribers();
    return res.json({ success: true, count: localSubs.length, subscribers: localSubs, database: "Local File DB" });
  } catch (error) {
    next(error);
  }
};
