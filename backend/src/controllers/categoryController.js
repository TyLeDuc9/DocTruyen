const Category = require('../models/Category')
const slugify = require('slugify');
exports.getCategoryBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    const category = await Category.findOne({ slug });
    if (!category) {
      return res.status(404).json({
        message: "Category not found",
      });
    }
    res.json({
      message: "Success",
      category,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error",
    });
  }
};
exports.updateCategory = async (req, res) => {
    try {
        const { name, content } = req.body;
        const categoryId = req.params.id;
        const category = await Category.findById(categoryId);
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }
        if (name) category.name = name;
        if (content) category.content = content;
        await category.save();

        res.status(200).json({
            message: 'Updated category successfully',
            category
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error', error: error.message });
    }
}
exports.createCategory = async (req, res) => {
    try {
        const { name, content } = req.body;
        if (!name || name.trim() === '' || !content) {
            return res.status(400).json({ message: 'Please enter name and content' });
        }

        const exists = await Category.findOne({ name: name.trim() });
        if (exists) {
            return res.status(400).json({ message: 'Category already exists' });
        }

        const category = new Category({ name: name.trim(), content: content });
        const saved = await category.save();
        res.status(201).json(saved);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
exports.getAllCategory = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1
        const limit = parseInt(req.query.limit) || 60
        const skip = (page - 1) * limit
        const total = await Category.countDocuments()
        const category = await Category.find().skip(skip).limit(limit)
        res.json({ total, page, totalPages: Math.ceil(total / limit), category })
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}