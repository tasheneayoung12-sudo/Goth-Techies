import { SecureMessage } from "../models/SecureMessage.js";
import mongoose from "mongoose";
import fs from "fs";
import path from "path";

const LOCAL_MESSAGES_FILE = path.join(process.cwd(), "local_secure_messages.json");

function getLocalMessages() {
  try {
    if (fs.existsSync(LOCAL_MESSAGES_FILE)) {
      return JSON.parse(fs.readFileSync(LOCAL_MESSAGES_FILE, "utf-8"));
    }
  } catch (err) {
    console.error("Local messages read error:", err);
  }
  return [];
}

function saveLocalMessage(msg) {
  const messages = getLocalMessages();
  messages.unshift(msg);
  try {
    fs.writeFileSync(LOCAL_MESSAGES_FILE, JSON.stringify(messages, null, 2));
  } catch (err) {
    console.error("Local message save error:", err);
  }
  return messages;
}

/**
 * @desc Submit a new secure transmission to the Secure_Message database collection
 * @route POST /api/secure-message
 */
export const createSecureMessage = async (req, res, next) => {
  try {
    const { name, email, protocol_category, category, raw_message_payload, message, coffeeAmount } = req.body;

    const senderName = (name || "Anonymous Node").trim();
    const senderEmail = (email || "").trim().toLowerCase();
    const categoryVal = (protocol_category || category || "General Support").trim();
    const payloadVal = (raw_message_payload || message || "").trim();

    // Validation
    if (!senderEmail || !senderEmail.includes("@")) {
      return res.status(400).json({ success: false, error: "Please provide a valid sender email address." });
    }
    if (!payloadVal) {
      return res.status(400).json({ success: false, error: "Raw message payload cannot be empty." });
    }

    // Store in MongoDB Atlas if connected
    if (mongoose.connection.readyState === 1) {
      const doc = await SecureMessage.create({
        name: senderName,
        email: senderEmail,
        protocol_category: categoryVal,
        raw_message_payload: payloadVal,
        coffeeAmount: coffeeAmount ? Number(coffeeAmount) : null
      });

      return res.status(201).json({
        success: true,
        message: "SIGNAL TRANSMITTED: Stored in Secure_Message database collection.",
        database: "MongoDB Atlas (Secure_Message)",
        data: doc
      });
    }

    // Fallback if database offline
    const localMsg = {
      id: `msg_${Date.now()}`,
      name: senderName,
      email: senderEmail,
      protocol_category: categoryVal,
      raw_message_payload: payloadVal,
      coffeeAmount: coffeeAmount ? Number(coffeeAmount) : null,
      createdAt: new Date().toISOString()
    };

    saveLocalMessage(localMsg);

    return res.status(200).json({
      success: true,
      message: "SIGNAL TRANSMITTED: Stored in local fallback buffer.",
      database: "Local Secure Message Storage",
      data: localMsg
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc Get all secure messages from the Secure_Message collection
 * @route GET /api/secure-message
 */
export const getSecureMessages = async (req, res, next) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const messages = await SecureMessage.find().sort({ createdAt: -1 }).limit(100);
      return res.json({ success: true, count: messages.length, data: messages, database: "MongoDB Atlas (Secure_Message)" });
    }

    const localMsgs = getLocalMessages();
    return res.json({ success: true, count: localMsgs.length, data: localMsgs, database: "Local Secure Message Storage" });
  } catch (error) {
    next(error);
  }
};
