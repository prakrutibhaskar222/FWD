import express from "express";
import { signup, loginUser} from "../src/controllers/authcontroller.js";

const router = express.Router();

// Public routes
router.post("/signup", signup);
router.post("/login", loginUser);


export default router;
