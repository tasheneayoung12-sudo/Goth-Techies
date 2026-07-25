import mongoose from "mongoose";

const surveySchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Email address is required."],
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Please provide a valid email address."]
    },
    category: {
      type: String,
      required: [true, "Category is required."],
      trim: true
    },
    title: {
      type: String,
      required: [true, "Title is required."],
      trim: true
    },
    description: {
      type: String,
      required: [true, "Description is required."],
      trim: true
    },
    newsletterConsent: {
      type: Boolean,
      default: false
    },
    formName: {
      type: String,
      default: "Website Survey"
    }
  },
  {
    timestamps: true,
    collection: "websiteSurvey"
  }
);

export const Survey = mongoose.models.Survey || mongoose.model("Survey", surveySchema);
