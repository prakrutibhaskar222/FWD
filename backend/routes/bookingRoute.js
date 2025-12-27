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
  getBooking,          
  assignWorker,
  markPaid,
} from "../src/controllers/bookingController.js"; 

import { protect } from "../src/middleware/authMiddleware.js";



const router = express.Router();
 
router.post("/", createBooking);

router.get("/slots", getAvailableSlots);
 
router.get("/", getAllBookings);
router.get("/filter", getBookingsFiltered); 
router.get("/:id", getBooking); 
router.get("/user/:id", protect, getBookingsByUser);
router.get("/service/:id", getBookingsByService);
 
router.put("/:id/cancel", cancelBooking); 
router.put("/:id/reschedule", rescheduleBooking); 
router.put("/:id/status", updateBookingStatus); 
router.put("/:id/assign-worker", assignWorker); 
router.put("/:id/mark-paid", markPaid);

export default router;
