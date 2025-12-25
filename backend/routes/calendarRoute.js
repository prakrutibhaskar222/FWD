// backend/routes/calendarRoute.js
import express from "express";
import {
  getWorkerCalendar,
  reassignBooking,
} from "../src/controllers/calendarController.js";
import { protect, allowRoles } from "../src/middleware/authMiddleware.js";

const router = express.Router();

/*
  🔐 AUTH REQUIRED
*/
router.use(protect);

/*
  📅 Get worker calendar
  - Admin: can view any worker
  - Worker: can view ONLY their own calendar
*/
router.get(
  "/worker/:workerId",
  allowRoles("admin", "worker"),
  getWorkerCalendar
);

/*
  🔄 Reassign booking
  - Admin only
*/
router.put(
  "/reassign",
  allowRoles("admin"),
  reassignBooking
);

export default router;
