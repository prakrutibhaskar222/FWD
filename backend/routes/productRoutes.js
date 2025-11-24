import express from "express"
import { createProduct, deleteProduct, getAllProducts, getProduct, updateProduct } from "../src/controllers/productsController.js";

const router = express.Router();

router.get("/",getAllProducts)
router.get("/:id",getProduct)
router.post("/create",createProduct)
router.put("/:id",updateProduct)
router.delete("/:id",deleteProduct)

export default router;