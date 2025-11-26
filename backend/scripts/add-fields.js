import mongoose from "mongoose";
import dotenv from "dotenv";
import Service from "../src/models/Service.js";

// Force load .env correctly
dotenv.config({ path: "../.env" });

// Ensure env is loaded
const MONGO_URI = process.env.MONGO_URL;

if (!MONGO_URI) {
  console.error("❌ ERROR: MONGO_URL is missing in backend/.env");
  process.exit(1);
}

async function updateServices() {
  try {
    console.log("🔗 Connecting to MongoDB...");

    await mongoose.connect(MONGO_URI, {
      connectTimeoutMS: 30000,
      serverSelectionTimeoutMS: 30000,
    });

    console.log("✅ MongoDB connected successfully!");

    const services = await Service.find();

    console.log(`📦 Found ${services.length} services.`);

    for (const svc of services) {
      let updated = false;

      if (!svc.duration) {
        svc.duration = "1 hour";
        updated = true;
      }

      if (!svc.features || svc.features.length === 0) {
        svc.features = ["No features added yet"];
        updated = true;
      }

      if (updated) {
        await svc.save();
        console.log(`✔ Updated service: ${svc.title}`);
      }
    }

    console.log("🎉 All services updated successfully!");
    process.exit(0);

  } catch (err) {
    console.error("❌ Migration Error:", err);
    process.exit(1);
  }
}

updateServices();
