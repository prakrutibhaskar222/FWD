import express from "express";
import {
  register,
  login,
  me,
  forgotPassword,
  resetPassword,
  createAdmin,
} from "../src/controllers/authenController.js";
import { protect } from "../src/middleware/authMiddleware.js";
import rateLimiter from "../src/middleware/rateLimiter.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

router.get("/me", protect, me);

router.post("/create-admin", createAdmin);

export default router;
