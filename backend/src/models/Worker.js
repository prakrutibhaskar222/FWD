import mongoose from "mongoose";

const workerSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: { type: String, default: "worker" },
  department: String,
  skills: [String]
});

export default mongoose.model("Worker", workerSchema);
