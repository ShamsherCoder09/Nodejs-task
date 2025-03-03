import express from "express";
import { addCategory, getCategories, updateCategory, deleteCategory } from "../controllers/categoryController.js";
import { verifyToken, isAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/add", verifyToken, isAdmin, addCategory);
router.get("/list", getCategories);
router.put("/update/:id", verifyToken, isAdmin, updateCategory);
router.delete("/delete/:id", verifyToken, isAdmin, deleteCategory);

export default router;
