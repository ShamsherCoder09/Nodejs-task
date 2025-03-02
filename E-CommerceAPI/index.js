import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import userRouter from './routes/userRouter.js'

dotenv.config();
const app = express();

// Middleware
app.use(express.json());

// Default Route
app.get("/", (req, res) => {
  res.send("E-commerce API is running...");
});

// database connection 
connectDB();

// Router
app.use("/api/v1/user", userRouter);
// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
