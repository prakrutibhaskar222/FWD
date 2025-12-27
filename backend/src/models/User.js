import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: String,

  resetPasswordToken: String,
  resetPasswordExpires: Date,
  favorites: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Service",
      },
    ],
  role: {
    type: String,
    enum: ["user", "admin", "worker"],
    default: "user"
  },

  address: {
  type: String,
  trim: true,
},


  // 🔍 Audit logging
  passwordResetHistory: [
    {
      at: Date,
      ip: String,
      userAgent: String,
    }
  ]
}, { timestamps: true });

/* 🔐 Hash password */
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

export default mongoose.model("User", userSchema);
