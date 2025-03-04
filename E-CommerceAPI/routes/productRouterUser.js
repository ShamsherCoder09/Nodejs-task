import express from "express";
import { getAllProducts, getProductById } from "../controllers/productControllerforUser.js";

const router = express.Router();

router.get("/", getAllProducts); //  Get All Products
router.get("/:id", getProductById); //  Get Single Product

export default router;
