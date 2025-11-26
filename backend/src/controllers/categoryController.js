import Category from "../models/Category.js";

export const createCategory = async (req, res) => {
  try {
    const category = await Category.create(req.body);
    res.json({ success: true, data: category });
  } catch (error) {
    res.json({ success: false, error: error.message });
  }
};

export const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find().sort({ sortOrder: 1 });
    res.json({ success: true, data: categories });
  } catch (error) {
    res.json({ success: false, error: error.message });
  }
};

export const getCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    res.json({ success: true, data: category });
  } catch (error) {
    res.json({ success: false, error: error.message });
  }
};

export const updateCategory = async (req, res) => {
  try {
    const updated = await Category.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json({ success: true, data: updated });
  } catch (error) {
    res.json({ success: false, error: error.message });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    await Category.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Category deleted" });
  } catch (error) {
    res.json({ success: false, error: error.message });
  }
};
