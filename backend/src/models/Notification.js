// models/Notification.js
import mongoose from "mongoose";

const NotificationSchema = new mongoose.Schema({
  toWorker: { type: mongoose.Schema.Types.ObjectId, ref: "Worker", required: true },
  type: { type: String, enum: ["taskAssigned","shiftChanged","urgentUpdate","safetyIncident","general"], default: "general" },
  title: { type: String, required: true },
  message: { type: String },
  booking: { type: mongoose.Schema.Types.ObjectId, ref: "Booking" },
  read: { type: Boolean, default: false },
  severity: { type: String, enum: ["info","warning","urgent"], default: "info" },
  payload: { type: Object } // extra context
}, { timestamps: true });

export default mongoose.model("Notification", NotificationSchema);
