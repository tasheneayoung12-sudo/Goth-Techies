import mongoose from "mongoose";

/**
 * Connects to the MongoDB Atlas database using Mongoose.
 * Checks for process.env.MONGODB_URL or process.env.MONGODB_URI.
 */
export const connectDB = async () => {
  const dbUri = process.env.MONGODB_URL || process.env.MONGODB_URI;

  if (!dbUri) {
    console.warn("⚠️ MONGODB_URL / MONGODB_URI is not set in environment variables. Database integration is inactive.");
    return false;
  }

  try {
    const conn = await mongoose.connect(dbUri, {
      dbName: "Uplink_contact"
    });
    console.log(`✅ MongoDB Atlas Connected: ${conn.connection.host} | Database: ${conn.connection.name}`);
    return true;
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    // Do not crash the app so non-DB routes continue operating smoothly
    return false;
  }
};
