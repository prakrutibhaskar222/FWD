// backend/src/models/Worker.js
import mongoose from "mongoose";

const WorkerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: String,
  skills: [String],
});

export default mongoose.model("Worker", WorkerSchema);
