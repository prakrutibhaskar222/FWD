import express from "express";
import workersController from "../src/controllers/workersController.js";


const router = express.Router();

router.get("/tasks", workersController.getTasks);
router.put("/tasks/:id", workersController.updateTaskStatus);
router.post("/attendance",workersController.clockEvent);
router.get("/timesheet", workersController.getTimesheet);

export default router;
