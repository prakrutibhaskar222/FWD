import express from "express";
import {
  getNotifications,
  markAsRead,
  markAllAsRead,
} from "../src/controllers/notificationController.js";
import { protect } from "../src/middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, getNotifications);
router.patch("/:id/read", protect, markAsRead);
router.patch("/mark-all-read", protect, markAllAsRead);

export default router;
