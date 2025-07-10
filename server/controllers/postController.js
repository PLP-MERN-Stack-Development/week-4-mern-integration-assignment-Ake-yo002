// server/controllers/postController.js
const Post = require('../models/Post');
const Category = require('../models/Category');
const User = require('../models/User');
const asyncHandler = require('express-async-handler');

// @desc    Create a new post
// @route   POST /api/posts
// @access  Private
exports.createPost = asyncHandler(async (req, res) => {
  const { title, content, category, tags, isPublished } = req.body;
  
  // Get author from authenticated user
  const author = req.user.id;
  
  // Check if category exists
  const categoryExists = await Category.findById(category);
  if (!categoryExists) {
    return res.status(400).json({ message: 'Category not found' });
  }

  const post = new Post({
    title,
    content,
    author,
    category,
    tags: tags || [],
    isPublished: isPublished || false
  });

  const createdPost = await post.save();
  res.status(201).json(createdPost);
});

// @desc    Get all posts
// @route   GET /api/posts
// @access  Public
exports.getPosts = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const posts = await Post.find({ isPublished: true })
    .populate('author', 'username')
    .populate('category', 'name')
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  const total = await Post.countDocuments({ isPublished: true });

  res.json({
    posts,
    page,
    pages: Math.ceil(total / limit),
    total
  });
});

// @desc    Get single post by slug
// @route   GET /api/posts/:slug
// @access  Public
exports.getPostBySlug = asyncHandler(async (req, res) => {
  const post = await Post.findOne({ slug: req.params.slug })
    .populate('author', 'username email')
    .populate('category', 'name');

  if (!post) {
    return res.status(404).json({ message: 'Post not found' });
  }

  // Increment view count
  await post.incrementViewCount();

  res.json(post);
});

// @desc    Add comment to post
// @route   POST /api/posts/:id/comments
// @access  Private
exports.addComment = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);
  
  if (!post) {
    return res.status(404).json({ message: 'Post not found' });
  }

  const { content } = req.body;
  const user = req.user.id;

  await post.addComment(user, content);
  res.status(201).json({ message: 'Comment added' });
});


exports.updatePost = asyncHandler(async (req, res) => {
  const { title, content, category, tags, isPublished } = req.body;
  const postId = req.params.id;
  
  const post = await Post.findById(postId);
  if (!post) {
    return res.status(404).json({ message: 'Post not found' });
  }

  // Check authorization
  if (post.author.toString() !== req.user.id && req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Not authorized' });
  }

  // Update fields
  post.title = title || post.title;
  post.content = content || post.content;
  post.tags = tags || post.tags;
  post.isPublished = isPublished !== undefined ? isPublished : post.isPublished;

  if (category) {
    const categoryExists = await Category.findById(category);
    if (!categoryExists) {
      return res.status(400).json({ message: 'Category not found' });
    }
    post.category = category;
  }

  const updatedPost = await post.save();
  res.json(updatedPost);
});


exports.deletePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);
  
  if (!post) {
    return res.status(404).json({ message: 'Post not found' });
  }

  // Check authorization
  if (post.author.toString() !== req.user.id && req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Not authorized' });
  }

  await post.remove();
  res.json({ message: 'Post removed' });
});