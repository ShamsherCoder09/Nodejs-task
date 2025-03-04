import express from "express";
import { addProduct, getProducts, getProductsByCategory, updateProduct, deleteProduct } from "../controllers/productController.js";
import { verifyToken, isAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/add", verifyToken, isAdmin, addProduct);
router.get("/list", getProducts);
router.get("/category/:categoryId", getProductsByCategory);  
router.put("/update/:id", verifyToken, isAdmin, updateProduct);
router.delete("/delete/:id", verifyToken, isAdmin, deleteProduct);

export default router;
