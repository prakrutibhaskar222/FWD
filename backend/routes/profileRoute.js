import express from "express";
import { protect } from "../src/middleware/authMiddleware.js";
import {
  getProfile,
  updateProfile,
  toggleFavorite,
  getServiceHistory,
  getInvoices
} from "../src/controllers/profileController.js";

const router = express.Router();

router.use(protect);

router.get("/", getProfile);
router.put("/", updateProfile);

router.post("/favorites/:serviceId", toggleFavorite);

router.get("/history", getServiceHistory);
router.get("/invoices", getInvoices);

export default router;
