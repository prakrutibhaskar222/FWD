import mongoose from "mongoose";

const workerSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: { type: String, default: "worker" },
  department: String,
  skills: [String],
  userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true
    },},
{ timestamps: true }
);

export default mongoose.model("Worker", workerSchema);
