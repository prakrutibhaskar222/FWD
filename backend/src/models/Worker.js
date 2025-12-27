import mongoose from "mongoose";

const workerSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  phone: String,
  password: String,

  role: { type: String, default: "worker" },

  verified: { type: Boolean, default: false },

  documents: {
    idProof: String,
    addressProof: String,
    certificate: String
  },

  skills: [{
    type: String
  }],

  categories: [{
    type: String
  }],

  availability: {
    days: [String],
    slots: [String]
  },

  rating: { type: Number, default: 0 },
  ratingsCount: { type: Number, default: 0 },

  earnings: { type: Number, default: 0 },

  trainingCompleted: { type: Boolean, default: false },
  complianceStatus: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending"
  }

}, { timestamps: true });

export default mongoose.model("Worker", workerSchema);
