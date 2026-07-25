import { Survey } from "../models/Survey.js";
import mongoose from "mongoose";

/**
 * @desc Submit a new website survey / checkpoint
 * @route POST /api/website-survey
 */
export const submitSurvey = async (req, res, next) => {
  try {
    const { email, category, title, description, newsletterConsent } = req.body;

    // Server-side input validation
    if (!email || typeof email !== "string" || !email.includes("@")) {
      return res.status(400).json({ success: false, error: "Please provide a valid email address." });
    }
    if (!category || typeof category !== "string" || category.trim() === "") {
      return res.status(400).json({ success: false, error: "Category is required." });
    }
    if (!title || typeof title !== "string" || title.trim() === "") {
      return res.status(400).json({ success: false, error: "Title is required." });
    }
    if (!description || typeof description !== "string" || description.trim() === "") {
      return res.status(400).json({ success: false, error: "Description is required." });
    }

    // Check if connected to MongoDB Atlas
    if (mongoose.connection.readyState === 1) {
      const newSurvey = new Survey({
        email: email.trim(),
        category: category.trim(),
        title: title.trim(),
        description: description.trim(),
        newsletterConsent: newsletterConsent === true || newsletterConsent === "true",
        formName: "Website Survey"
      });

      await newSurvey.save();

      return res.status(201).json({
        success: true,
        message: "UPLINK SUCCESSFUL: Transmitted to database terminal under websiteSurvey collection.",
        data: newSurvey
      });
    } else {
      // Fallback message if MongoDB is disconnected
      return res.status(200).json({
        success: true,
        message: "Survey received (Database in offline mode).",
        data: { email, category, title, description }
      });
    }
  } catch (error) {
    next(error);
  }
};

/**
 * @desc Get all submitted surveys
 * @route GET /api/website-survey
 */
export const getSurveys = async (req, res, next) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const surveys = await Survey.find().sort({ createdAt: -1 }).limit(100);
      return res.json({ success: true, count: surveys.length, data: surveys });
    }
    return res.json({ success: true, count: 0, data: [], note: "Database disconnected" });
  } catch (error) {
    next(error);
  }
};
