// routes/admin.js
import express from "express";
import { protect } from "../src/middleware/authMiddleware.js";
import {
  getAllUsers,
  getAllBookings,
  updateUserRole
} from "../src/controllers/adminController.js"; // You can create this controller

const router = express.Router();

// Example routes
router.get("/users", getAllUsers);            // Get all users
router.get("/bookings", getAllBookings);      // Get all bookings
router.put("/user/:id/role", updateUserRole); // Update a user's role

export default router;
