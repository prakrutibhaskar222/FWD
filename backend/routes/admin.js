// routes/admin.js
import express from "express";
import { protect, allowRoles } from "../src/middleware/authMiddleware.js";
import {
  getAllUsers,
  getAllBookings,
  updateUserRole
} from "../src/controllers/adminController.js";

const router = express.Router();

/* 🔐 AUTH + ADMIN ONLY */
router.use(protect);
router.use(allowRoles("admin"));

// Get all users
router.get("/users", getAllUsers);

// Get all bookings
router.get("/bookings", getAllBookings);

// Update a user's role (VERY sensitive)
router.put("/user/:id/role", updateUserRole);

export default router;
