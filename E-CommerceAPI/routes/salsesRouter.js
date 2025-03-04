import express from "express";
import { verifyToken } from "../middleware/authMiddleware.js";
import { getCategoryWiseSales, getTopSellingProducts, getWorstSellingProducts } from "../controllers/salesController.js";

const router = express.Router();

// Sales category-wise
router.get("/category-sales", verifyToken, getCategoryWiseSales);

// Top-selling products
router.get("/top-products", verifyToken, getTopSellingProducts);

// Worst-selling products
router.get("/worst-products", verifyToken, getWorstSellingProducts);

export default router;
