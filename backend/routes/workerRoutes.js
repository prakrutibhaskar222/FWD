import express from "express";
import {
  createWorker,
  getWorkers,
  getWorker,
  updateWorker,
  deleteWorker
} from "../src/controllers/workerController.js";

const router = express.Router();

router.post("/create", createWorker);
router.get("/", getWorkers);
router.get("/:id", getWorker);
router.put("/:id", updateWorker);
router.delete("/:id", deleteWorker);

export default router;
