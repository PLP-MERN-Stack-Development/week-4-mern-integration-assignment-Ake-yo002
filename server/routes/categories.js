const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const { protect, admin } = require('../middleware/authMiddleware');
const Category = require('../models/Category');

// Import your existing controller functions
const { getCategories, createCategory } = require('../controllers/categoryController');

// Update category handler
const updateCategory = asyncHandler(async (req, res) => {
  const { name, description } = req.body;
  const category = await Category.findById(req.params.id);

  if (!category) {
    res.status(404);
    throw new Error('Category not found');
  }

  // Check for duplicate name (excluding current category)
  if (name && name !== category.name) {
    const categoryExists = await Category.findOne({ name });
    if (categoryExists) {
      res.status(400);
      throw new Error('Category name already exists');
    }
  }

  // Update fields
  if (name) category.name = name;
  if (description !== undefined) category.description = description;

  // Save will trigger slug regeneration
  const updatedCategory = await category.save();
  res.json(updatedCategory);
});

// Delete category handler
const deleteCategory = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);
  
  if (!category) {
    res.status(404);
    throw new Error('Category not found');
  }

  // Check for associated posts (pseudo-code - implement based on your Post model)
  // const postCount = await Post.countDocuments({ category: req.params.id });
  // if (postCount > 0) {
  //   res.status(400);
  //   throw new Error('Cannot delete category with associated posts');
  // }

  await category.deleteOne();
  res.json({ message: 'Category removed' });
});

// Public routes
router.route('/')
  .get(asyncHandler(getCategories));  // Get all categories

// Protected admin routes
router.route('/')
  .post(protect, admin, asyncHandler(createCategory));  // Create new category

router.route('/:id')
  .put(protect, admin, asyncHandler(updateCategory))    // Update category
  .delete(protect, admin, asyncHandler(deleteCategory)); // Delete category

module.exports = router;