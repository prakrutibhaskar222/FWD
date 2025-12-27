import express from "express";
import { protect } from "../src/middleware/authMiddleware.js";
import { getMyProfile } from "../src/controllers/userController.js";

const router = express.Router();

router.get("/me", protect, getMyProfile);

export default router;
