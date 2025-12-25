import express from "express";
import {
  createService,
  getAllServices,
  getService,
  viewAndGetService,
  updateService,
  deleteService,
  getCategories,
  getServiceByCategory,
  getFeaturedServices,
  getPopularServices
} from "../src/controllers/servicesController.js";
import { protect, allowRoles } from "../src/middleware/authMiddleware.js";

const router = express.Router();

router.get("/navbar-search", getAllServices);

// Create
router.post("/create", createService);

// List all
router.get("/", getAllServices);

// Featured + Popular
router.get("/featured", getFeaturedServices);
router.get("/popular", getPopularServices);
router.get("/popular/:category", getPopularServices);

// Categories (must be before :id)
router.get("/category/:category", getServiceByCategory);
router.get("/list/categories", getCategories);




// View count
router.get("/:id/view", viewAndGetService);

// Get single service
router.get("/:id", getService);

/* ================= ADMIN ROUTES ================= */

router.post(
  "/create",
  protect,
  allowRoles("admin"),
  createService
);

router.put(
  "/:id",
  protect,
  allowRoles("admin"),
  updateService
);

router.delete(
  "/:id",
  protect,
  allowRoles("admin"),
  deleteService
);




export default router;
