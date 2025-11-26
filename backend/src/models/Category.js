import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema({
  key: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  description: { type: String, default: "" },
  icon: { type: String, default: "" },  // emoji or URL
  sortOrder: { type: Number, default: 0 }
}, { timestamps: true });

export default mongoose.model("Category", CategorySchema);
