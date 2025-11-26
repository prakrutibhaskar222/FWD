// backend/routes/reviewRoute.js
import express from "express";
import { createReview, getReviewsForService } from "../src/controllers/reviewsController.js";

const router = express.Router();

router.post("/create", createReview);
router.get("/service/:serviceId", getReviewsForService);

export default router;
