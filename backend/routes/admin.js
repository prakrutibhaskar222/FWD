import express from "express";
import { protect, allowRoles } from "../src/middleware/authMiddleware.js";
import {
  getAllUsers,
  getAllBookings,
  updateUserRole,
  registerWorker,
  getAllWorkers,
  getPendingWorkers,
  verifyWorker
} from "../src/controllers/adminController.js";

const router = express.Router();

/* 🔐 ADMIN ONLY */
router.use(protect);
router.use(allowRoles("admin"));


router.get("/users", getAllUsers);
router.get("/bookings", getAllBookings);
router.put("/user/:id/role", updateUserRole);

/* 👷 REGISTER WORKER */
router.post("/register-worker", registerWorker);
router.get("/workers", getAllWorkers);
router.get("/workers/pending", getPendingWorkers);
router.put("/workers/:id/verify", verifyWorker);


export default router;
