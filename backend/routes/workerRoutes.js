import express from "express";
import {
  getTasks,
  updateTaskStatus,
  clockEvent,
  getTimesheet,
  getNotifications
} from "../src/controllers/workersController.js";
import { protect, workerOnly } from "../src/middleware/authMiddleware.js";

const router = express.Router();

/* 🔐 AUTH + WORKER ROLE REQUIRED */
router.use(protect);
router.use(workerOnly);

router.get("/tasks", getTasks);
router.put("/tasks/:id", updateTaskStatus);

router.post("/attendance", clockEvent);
router.get("/timesheet", getTimesheet);
router.get("/notifications", getNotifications);

export default router;
