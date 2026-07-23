import mongoose, { Schema, Document } from "mongoose";

export interface IWebsiteSurvey extends Document {
  email: string;
  category: string;
  title: string;
  description: string;
  newsletterConsent: boolean;
  formName: string;
  createdAt: Date;
}

const websiteSurveySchema = new Schema<IWebsiteSurvey>({
  email: {
    type: String,
    required: [true, "Node Email is required."],
    trim: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, "Please use a valid email address."]
  },
  category: {
    type: String,
    required: [true, "Protocol Category is required."],
    trim: true
  },
  title: {
    type: String,
    required: [true, "Suggestion/Checkpoint Title is required."],
    trim: true
  },
  description: {
    type: String,
    required: [true, "Detailed Description is required."],
    trim: true
  },
  newsletterConsent: {
    type: Boolean,
    default: false
  },
  formName: {
    type: String,
    required: true,
    default: "Website Survey"
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  collection: "websiteSurvey" // Explicitly name the collection
});

export const WebsiteSurvey = mongoose.models.WebsiteSurvey || mongoose.model<IWebsiteSurvey>("WebsiteSurvey", websiteSurveySchema);
