// backend/src/models/Slot.js
import mongoose from "mongoose";

const SlotSchema = new mongoose.Schema({
  serviceId: { type: mongoose.Schema.Types.ObjectId, ref: "Service", required: true },
  date: { type: String, required: true }, // YYYY-MM-DD
  // bookedSlots: array of slot strings currently booked
  bookedSlots: { type: [String], default: [] },
  // optional map: slot -> bookingId for traceability
  slotMap: { type: Map, of: mongoose.Schema.Types.ObjectId, default: {} },
}, { timestamps: true });

SlotSchema.index({ serviceId: 1, date: 1 }, { unique: true });

export default mongoose.model("Slot", SlotSchema);
