import express from "express";
import { placeOrder, getOrderHistory } from "../controllers/orderController.js";
import { verifyToken } from "../middleware/authMiddleware.js"; // Ensures only logged-in users place orders

const router = express.Router();

router.post("/place", verifyToken, placeOrder); //  Place Order
router.get("/history", verifyToken, getOrderHistory); //  View Order History

export default router;
