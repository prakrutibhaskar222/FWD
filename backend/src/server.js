import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";

// ROUTES
import authRoutes from "../routes/authRoute.js";
import adminRoutes from "../routes/admin.js";
import serviceRoute from "../routes/serviceRoute.js";
import bookingRoute from "../routes/bookingRoute.js";
import categoryRoute from "../routes/categoryRoute.js";
import reviewRoute from "../routes/reviewRoute.js";
import workerRoute from "../routes/workerRoutes.js";
import calendarRoute from "../routes/calendarRoute.js";

dotenv.config();
const app = express();

// Middleware
app.use(express.json());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/services", serviceRoute);
app.use("/api/bookings", bookingRoute);
app.use("/api/categories", categoryRoute);
app.use("/api/reviews", reviewRoute);
app.use("/api/workers", workerRoute);
app.use("/api/calendar", calendarRoute);

// Health check
app.get("/", (req, res) => res.send("API is running..."));

// Start server
connectDB().then(() => {
  const PORT = process.env.PORT || 5001;
  app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
});
