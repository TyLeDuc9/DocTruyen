const Category = require('../models/Category')
const slugify = require('slugify');
const Story=require('../models/Story')
exports.restoreCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const category = await Category.findById(id);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    if (!category.isDeleted) {
      return res.status(400).json({ message: "Category is not deleted" });
    }

    category.isDeleted = false;
    await category.save();

    res.json({ message: "Category restored successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
exports.softDeleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const category = await Category.findById(id);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    category.isDeleted = true;
    await category.save();
    await Story.updateMany(
      { categoryId: id },
      { $set: { categoryId: null } }
    );

    res.json({ message: "Category deleted and stories updated" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
exports.forceDeleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const category = await Category.findById(id);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    await Story.updateMany(
      { categoryId: id },
      { $set: { categoryId: null } }
    );

    await Category.findByIdAndDelete(id);

    res.json({ message: "Category permanently deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
exports.deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const category = await Category.findById(id);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    category.isDeleted = true;
    await category.save();
    await Story.updateMany(
      { categoryId: id },
      { $set: { categoryId: null } }
    );

    res.json({ message: "Category deleted and stories updated" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
exports.getAllCategoryAdmin = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const sortQuery = req.query.sort || "newest";
    const sortType =
      sortQuery === "oldest" || sortQuery === "old" ? 1 : -1;

    const skip = (page - 1) * limit;
    const search = req.query.search || "";

    const filter = {};
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { content: { $regex: search, $options: "i" } },
      ];
    }

    const categories = await Category.find(filter)
      .sort({ createdAt: sortType })
      .skip(skip)
      .limit(limit);

    const total = await Category.countDocuments(filter);

    return res.json({
      message: "Success",
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      totalCategories: total,
      data: categories,
    });
  } catch (error) {
    console.error("getAllCategoryAdmin error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

exports.getCategoryBySlug = async (req, res) => {
  try {
    const { slug } = req.params;

    const category = await Category.findOne({
      slug,
      $or: [
        { isDeleted: false },
        { isDeleted: { $exists: false } }
      ]
    });

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
    const { slug } = req.params;
    const { name, content } = req.body;

    const category = await Category.findOne({
      slug,
      $or: [
        { isDeleted: false },
        { isDeleted: { $exists: false } }
      ]
    });

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    if (name && name !== category.name) {
      const exists = await Category.findOne({ name });
      if (exists) {
        return res.status(400).json({ message: "Category name already exists" });
      }
      category.name = name;
    }

    if (content !== undefined) {
      category.content = content;
    }

    await category.save();

    res.status(200).json({
      message: "Updated category successfully",
      category,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.createCategory = async (req, res) => {
    try {
        const { name, content } = req.body;
        if (!name || name.trim() === '') {
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
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 60;
    const skip = (page - 1) * limit;

    const filter = {
      $or: [
        { isDeleted: false },
        { isDeleted: { $exists: false } }
      ]
    };

    const total = await Category.countDocuments(filter);

    const category = await Category.find(filter)
      .skip(skip)
      .limit(limit);

    res.json({
      total,
      page,
      totalPages: Math.ceil(total / limit),
      category
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
