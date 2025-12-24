import express from "express";
import {
  createCategory,
  getAllCategories,
  getCategory,
  updateCategory,
  deleteCategory
} from "../src/controllers/categoryController.js";
import { protect, allowRoles } from "../src/middleware/authMiddleware.js";

const router = express.Router();

/* 🌍 PUBLIC ROUTES */
router.get("/", getAllCategories);
router.get("/:id", getCategory);

/* 🔐 ADMIN ROUTES */
router.post(
  "/create",
  protect,
  allowRoles("admin"),
  createCategory
);

router.put(
  "/:id",
  protect,
  allowRoles("admin"),
  updateCategory
);

router.delete(
  "/:id",
  protect,
  allowRoles("admin"),
  deleteCategory
);

export default router;
