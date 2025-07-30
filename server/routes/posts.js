const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const { protect } = require('../middleware/authMiddleware');
const validate = require('../middleware/validate');
const upload = require('../middleware/upload');

router.route('/')
  .get(postController.getPosts)
  .post(protect, validate.validatePost, postController.createPost);

router.route('/:id')
  .get(postController.getPostBySlug)
  .put(protect, validate.validatePost, postController.updatePost)
  .delete(protect, postController.deletePost);

router.route('/:id/comments')
  .post(protect, postController.addComment);

module.exports = router; // Must export the router