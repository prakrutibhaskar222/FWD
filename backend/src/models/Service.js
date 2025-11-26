import mongoose from "mongoose";

const ServiceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, required: true },
  sub_category: { type: String, default: "" },

  // 🆕 Duration of the service in minutes  
  duration: { type: Number, default: 60 },  // Example: 30, 45, 60, 90 etc.

  price: { type: Number, required: true },

  description: { type: String, default: "" },

  // Optional: what the customer gets
  features: { type: [String], default: [] },

  // 🆕 Working hours override (per service)
  workingHours: {
    start: { type: String, default: "09:00" },
    end: { type: String, default: "18:00" }
  },

  slug: { type: String },

}, { timestamps: true });

export default mongoose.model("Service", ServiceSchema);


