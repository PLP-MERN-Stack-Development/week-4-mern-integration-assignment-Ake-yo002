const asyncHandler = require('express-async-handler'); // Add this import
const Category = require('../models/Category');

// Get all categories
exports.getCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find().sort({ name: 1 });
  res.json(categories);
});

// Create new category
exports.createCategory = asyncHandler(async (req, res) => {
  const { name, description } = req.body;
  
  const categoryExists = await Category.findOne({ name });
  if (categoryExists) {
    return res.status(400).json({ message: 'Category already exists' });
  }

  const category = new Category({ name, description });
  const createdCategory = await category.save();
  res.status(201).json(createdCategory);
});