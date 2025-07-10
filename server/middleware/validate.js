const Joi = require('joi');

exports.validatePost = (req, res, next) => {
  const schema = Joi.object({
    title: Joi.string().required().min(3).max(100),
    content: Joi.string().required().min(10),
    category: Joi.string().required(),
    tags: Joi.array().items(Joi.string()),
    isPublished: Joi.boolean()
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
};

// Add similar validators for other models