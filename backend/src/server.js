import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import serviceRoute from "../routes/serviceRoute.js";
import bookingRoute from "../routes/bookingRoute.js";
import categoryRoute from "../routes/categoryRoute.js";
import reviewRoute from "../routes/reviewRoute.js";
import workerRoute from "../routes/workerRoutes.js";
import calendarRoute from "../routes/calenderRoute.js";

dotenv.config();
const app = express();

// MIDDLEWARE
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"]
  })
);

// ROUTES
app.use("/api/services", serviceRoute);
app.use("/api/bookings", bookingRoute);
app.use("/api/categories", categoryRoute);
app.use("/api/reviews", reviewRoute);
app.use("/api/workers", workerRoute);
app.use("/api/calendar", calendarRoute);



// START SERVER
connectDB().then(() => {
  app.listen(process.env.PORT || 5001, () =>
    console.log("Server running on port", process.env.PORT)
  );
});
