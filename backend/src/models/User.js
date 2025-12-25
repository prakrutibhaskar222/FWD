import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String },
    password: { type: String, required: true },

    role: {
      type: String,
      enum: ["user", "admin", "worker"],
      default: "user",
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", UserSchema);
