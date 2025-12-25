import express from "express";
import { register, login, me } from "../src/controllers/authenController.js";
import { protect } from "../src/middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me", protect, me);

export default router;
