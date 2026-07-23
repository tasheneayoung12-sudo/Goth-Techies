import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

async function testConnection() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error("❌ MONGODB_URI is not defined in .env");
    return;
  }

  console.log("Testing connection string: " + uri.replace(/:([^@]+)@/, ":****@")); // Mask password for security

  try {
    const client = new MongoClient(uri, {
      connectTimeoutMS: 5000,
      serverSelectionTimeoutMS: 5000,
    });
    console.log("Connecting...");
    await client.connect();
    console.log("✅ SUCCESS: Successfully connected to MongoDB!");
    
    const db = client.db("tashibee-cyber-hive");
    const collections = await db.listCollections().toArray();
    console.log("Available collections:", collections.map(c => c.name));
    
    await client.close();
  } catch (error: any) {
    console.error("❌ CONNECTION FAILED:", error.message || error);
  }
}

testConnection();
