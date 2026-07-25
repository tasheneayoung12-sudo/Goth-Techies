import mongoose from "mongoose";

const secureMessageSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Sender name is required."],
      trim: true
    },
    email: {
      type: String,
      required: [true, "Sender email is required."],
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Please provide a valid email address."]
    },
    protocol_category: {
      type: String,
      required: [true, "Protocol category is required."],
      trim: true,
      default: "General Support"
    },
    raw_message_payload: {
      type: String,
      required: [true, "Raw message payload is required."],
      trim: true
    },
    coffeeAmount: {
      type: Number,
      default: null
    }
  },
  {
    timestamps: true,
    collection: "Secure_Message" // Collection explicitly named Secure_Message in database
  }
);

export const SecureMessage =
  mongoose.models.Secure_Message || mongoose.model("Secure_Message", secureMessageSchema);
