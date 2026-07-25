import mongoose from "mongoose";

const dreamSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Email address is required."],
      trim: true
    },
    category: {
      type: String,
      default: "ANIME",
      uppercase: true
    },
    title: {
      type: String,
      required: [true, "Title is required."],
      trim: true
    },
    description: {
      type: String,
      default: ""
    },
    targetYear: {
      type: String,
      default: "2026"
    },
    status: {
      type: String,
      default: "INJECTED_NODE"
    },
    isAnonymous: {
      type: Boolean,
      default: false
    },
    location: {
      type: String,
      default: "GENERIC_NODE"
    }
  },
  {
    timestamps: true,
    collection: "dreams"
  }
);

export const Dream = mongoose.models.Dream || mongoose.model("Dream", dreamSchema);
