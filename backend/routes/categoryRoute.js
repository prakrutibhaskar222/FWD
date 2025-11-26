import express from "express";
import {
  createCategory,
  getAllCategories,
  getCategory,
  updateCategory,
  deleteCategory
} from "../src/controllers/categoryController.js";

const router = express.Router();

router.post("/create", createCategory);
router.get("/", getAllCategories);
router.get("/:id", getCategory);
router.put("/:id", updateCategory);
router.delete("/:id", deleteCategory);

export default router;
