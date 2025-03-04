import Category from "../models/modelCotegory.js";

// Add Category (Admin Only)
export const addCategory = async (req, res) => {
  try {
    const { name , description} = req.body;

    const categoryExists = await Category.findOne({ name });
    if (categoryExists) return res.status(400).json({ message: "Category already exists" });

    const category = new Category({ name });
    await category.save();

    res.status(201).json({ message: "Category added successfully", category ,description });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get All Categories
export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Category (Admin Only)
export const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const updatedCategory = await Category.findByIdAndUpdate(id, { name }, { new: true });
    if (!updatedCategory) return res.status(404).json({ message: "Category not found" });

    res.status(200).json({ message: "Category updated successfully", updatedCategory });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Category (Admin Only)
export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedCategory = await Category.findByIdAndDelete(id);
    if (!deletedCategory) return res.status(404).json({ message: "Category not found" });

    res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
