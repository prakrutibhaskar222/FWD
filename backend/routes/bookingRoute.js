import express from "express";
import {
  createBooking,
  getAvailableSlots,
  getAllBookings,
  getBookingsByUser,
  getBookingsByService,
  cancelBooking,
  rescheduleBooking,
  updateBookingStatus,
  getBookingsFiltered,
  assignWorker,
  markPaid,
  getBookingById
} from "../src/controllers/bookingController.js"; 


const router = express.Router();

router.post("/create", createBooking);
router.get("/", getBookingsFiltered); // supports filters via query params

router.get("/slots", getAvailableSlots);

router.get("/user/:id", getBookingsByUser);
router.get("/service/:id", getBookingsByService);

router.get("/:id", getBookingById); // booking detail for flyout
router.put("/:id/cancel", cancelBooking);
router.put("/:id/reschedule", rescheduleBooking);
router.put("/:id/status", updateBookingStatus);
router.put("/:id/assign", assignWorker);
router.put("/:id/markpaid", markPaid);

export default router;
