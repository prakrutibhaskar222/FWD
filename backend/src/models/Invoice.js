// models/Invoice.js
import mongoose from "mongoose";

const InvoiceSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    serviceTitle: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    status: {
      type: String,
      enum: ["paid"],
      default: "paid",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Invoice", InvoiceSchema);
