import Product from "../models/modelProduct.js";
import Category from "../models/modelCotegory.js";

// Add Product (Admin Only)
export const addProduct = async (req, res) => {
  try {
    const { name, price, description, category, stock, image } = req.body;

    const categoryExists = await Category.findById(category);
    if (!categoryExists) return res.status(404).json({ message: "Category not found" });

    const product = new Product({ name, price, description, category, stock, image });
    await product.save();

    res.status(201).json({ message: "Product added successfully", product });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get All Products
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find().populate("category", "name");
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Products by Category
export const getProductsByCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;

    const categoryExists = await Category.findById(categoryId);
    if (!categoryExists) return res.status(404).json({ message: "Category not found" });

    const products = await Product.find({ category: categoryId }).populate("category", "name");
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Product (Admin Only)
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, description, category, stock, image } = req.body;

    if (category) {
      const categoryExists = await Category.findById(category);
      if (!categoryExists) return res.status(404).json({ message: "Category not found" });
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { name, price, description, category, stock, image },
      { new: true }
    );

    if (!updatedProduct) return res.status(404).json({ message: "Product not found" });

    res.status(200).json({ message: "Product updated successfully", updatedProduct });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Product (Admin Only)
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedProduct = await Product.findByIdAndDelete(id);
    if (!deletedProduct) return res.status(404).json({ message: "Product not found" });

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
