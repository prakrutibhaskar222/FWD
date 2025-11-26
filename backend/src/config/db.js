import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const url = process.env.MONGO_URL;

    if (!url) {
      throw new Error("❌ MONGO_URL is missing in .env");
    }

    await mongoose.connect(url);
    console.log("✅ MongoDB Connected");
  } catch (err) {
    console.error("DB Connection Error:", err.message);
    process.exit(1);
  }
};

export default connectDB;
