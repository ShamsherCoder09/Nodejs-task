import Order from "../models/modelOrder.js";
import Product from "../models/modelProduct.js";
import Category from "../models/modelProduct.js";
import mongoose from "mongoose";

//  1. Sales Report - Category-wise
export const getCategoryWiseSales = async (req, res) => {
  try {
    const salesData = await Order.aggregate([
      { $unwind: "$products" },
      {
        $lookup: {
          from: "products",
          localField: "products.product",
          foreignField: "_id",
          as: "productDetails"
        }
      },
      { $unwind: "$productDetails" },
      {
        $lookup: {
          from: "categories",
          localField: "productDetails.category",
          foreignField: "_id",
          as: "categoryDetails"
        }
      },
      { $unwind: "$categoryDetails" },
      {
        $group: {
          _id: "$categoryDetails.name",
          totalSales: { $sum: { $multiply: ["$products.quantity", "$products.price"] } },
          totalQuantitySold: { $sum: "$products.quantity" }
        }
      },
      { $sort: { totalSales: -1 } }
    ]);

    res.status(200).json({ message: "Category-wise sales data", salesData });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

//  2. Top-Selling Products
export const getTopSellingProducts = async (req, res) => {
  try {
    const topProducts = await Order.aggregate([
      { $unwind: "$products" },
      {
        $group: {
          _id: "$products.product",
          totalQuantitySold: { $sum: "$products.quantity" },
          totalRevenue: { $sum: { $multiply: ["$products.quantity", "$products.price"] } }
        }
      },
      {
        $lookup: {
          from: "products",
          localField: "_id",
          foreignField: "_id",
          as: "productDetails"
        }
      },
      { $unwind: "$productDetails" },
      {
        $project: {
          _id: 1,
          productName: "$productDetails.name",
          totalQuantitySold: 1,
          totalRevenue: 1
        }
      },
      { $sort: { totalQuantitySold: -1 } },
      { $limit: 5 }
    ]);

    res.status(200).json({ message: "Top-selling products", topProducts });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

//3. Worst-Selling Products
export const getWorstSellingProducts = async (req, res) => {
  try {
    const worstProducts = await Order.aggregate([
      { $unwind: "$products" },
      {
        $group: {
          _id: "$products.product",
          totalQuantitySold: { $sum: "$products.quantity" },
          totalRevenue: { $sum: { $multiply: ["$products.quantity", "$products.price"] } }
        }
      },
      {
        $lookup: {
          from: "products",
          localField: "_id",
          foreignField: "_id",
          as: "productDetails"
        }
      },
      { $unwind: "$productDetails" },
      {
        $project: {
          _id: 1,
          productName: "$productDetails.name",
          totalQuantitySold: 1,
          totalRevenue: 1
        }
      },
      { $sort: { totalQuantitySold: 1 } },
      { $limit: 5 }
    ]);

    res.status(200).json({ message: "Worst-selling products", worstProducts });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
