import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema({
  worker: { type: mongoose.Schema.Types.ObjectId, ref: "Worker" },
  type: { type: String, enum: ["in", "out", "breakStart", "breakEnd"] },
  timestamp: { type: Date, default: Date.now }
});

export default mongoose.model("Attendance", attendanceSchema);
