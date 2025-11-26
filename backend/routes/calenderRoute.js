// backend/routes/calendarRoute.js
import express from "express";
import {
  getWorkerCalendar,
  reassignBooking,
} from "../src/controllers/calendarController.js";

const router = express.Router();

// Get all bookings for a worker
router.get("/worker/:workerId", getWorkerCalendar);

// Drag & drop reschedule
router.put("/reassign", reassignBooking);

export default router;
