import mongoose from "mongoose";

const subscriberSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Subscriber email is required."],
      unique: true,
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Please provide a valid email address."]
    },
    active: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true,
    collection: "subscribers"
  }
);

export const Subscriber = mongoose.models.Subscriber || mongoose.model("Subscriber", subscriberSchema);
