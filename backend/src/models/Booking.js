// backend/src/models/Booking.js

import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

  serviceId: { type: mongoose.Schema.Types.ObjectId, ref: "Service" },
  serviceTitle: String,
  serviceCategory: String,

  customerName: String,
  customerPhone: String,

  address: {
  type: String,
  required: true,
  trim: true,
},
    customerEmail: {
      type: String,
      required: true
    },



  date: { type: String, required: true }, // e.g. "2025-01-25"
  slot: { type: String, required: true }, // e.g. "10:30"

  notes: String,

  workerassigned: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Worker",
    default: null,
  },

  serviceOTP: {
    code: String,        // hashed
    expiresAt: Date,
    verified: { type: Boolean, default: false }
  },

  reminderSent: {
    type: Boolean,
    default: false
  },
  
  status: {
    type: String,
    enum: ["pending","assigned","on_the_way","service_started", "in-progress","completed", "cancelled"],
    default: "pending",
  },statusTimeline: [
  {
    status: String,
    at: { type: Date, default: Date.now }
  }
],

  serviceOTP: String,
  serviceOTPExpires: Date,
  otpVerified: { type: Boolean, default: false }},
    { timestamps: true }
  );

export default mongoose.model("Booking", BookingSchema);
