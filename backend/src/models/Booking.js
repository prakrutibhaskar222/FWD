// backend/src/models/Booking.js

import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

  serviceId: { type: mongoose.Schema.Types.ObjectId, ref: "Service" },
  serviceTitle: String,
  serviceCategory: String,

  customerName: String,
  customerPhone: String,

  date: { type: String, required: true }, // e.g. "2025-01-25"
  slot: { type: String, required: true }, // e.g. "10:30"

  notes: String,

  assignedWorker: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Worker",
    default: null,
  },

  status: {
    type: String,
    enum: ["pending", "in-progress", "completed"],
    default: "pending",
  },
});

export default mongoose.model("Booking", BookingSchema);
