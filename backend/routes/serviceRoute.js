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

// CRUD by ID
router.get("/:id", getService);
router.put("/:id", updateService);
router.delete("/:id", deleteService);




export default router;
