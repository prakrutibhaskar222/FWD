import express from "express";
import { protect } from "../src/middleware/authMiddleware.js";
import {
  addToFavorites,
  removeFromFavorites,
  getFavorites,
} from "../src/controllers/favoritesController.js";

const router = express.Router();

router.get("/",protect,  getFavorites);
router.post("/",protect,addToFavorites);
router.delete("/:serviceId",protect, removeFromFavorites);

export default router;
