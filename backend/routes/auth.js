import express from "express";
import {
  registerUser,
  loginUser,
  getProfile
} from "../src/controllers/authcontroller.js";

import { protect } from "../src/middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/me", protect, getProfile);

export default router;
