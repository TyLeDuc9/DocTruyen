const Story = require('../models/Story');
const Category = require("../models/Category");
exports.getStoryComplete = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 36;
    const skip = (page - 1) * limit;

    const totalStories = await Story.countDocuments({
      status: "COMPLETED",
    });

    const story = await Story.find({
      status: "COMPLETED",
    })
      .sort({ updatedAt: -1 }) 
      .skip(skip)
      .limit(limit)
      .lean();

    const totalPages = Math.ceil(totalStories / limit);

    res.status(200).json({
      message: "Success",
      page,
      limit,
      totalPages,
      totalStories,
      story,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error",
      error: error.message,
    });
  }
};

exports.getTopView = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 36;
    const skip = (page - 1) * limit;
    const totalStories = await Story.countDocuments();
    const story = await Story.find()
      .sort({ views: -1 }) 
      .skip(skip)
      .limit(limit)
      .lean();

    const totalPages = Math.ceil(totalStories / limit);

    res.status(200).json({
      message: "Success",
      page,
      limit,
      totalPages,
      totalStories,
      story,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error",
      error: error.message,
    });
  }
};

exports.getTopDay = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 36;
    const skip = (page - 1) * limit;

    const oneDayAgo = new Date();
    oneDayAgo.setDate(oneDayAgo.getDate() - 1); 

    const totalStories = await Story.countDocuments({
      updatedAt: { $gte: oneDayAgo }
    });

    const story = await Story.find({
      updatedAt: { $gte: oneDayAgo }
    })
      .sort({ views: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    const totalPages = Math.ceil(totalStories / limit);

    res.status(200).json({
      message: "Success",
      page,
      limit,
      totalPages,
      totalStories,
      story,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error",
      error: error.message,
    });
  }
};

exports.getTopWeek = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 36;
    const skip = (page - 1) * limit;
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    const totalStories = await Story.countDocuments({
      updatedAt: { $gte: oneWeekAgo }
    });
    const story = await Story.find({
      updatedAt: { $gte: oneWeekAgo }
    })
      .sort({ views: -1 })
      .skip(skip)
      .limit(limit)
      .lean();
    const totalPages = Math.ceil(totalStories / limit);
    res.status(200).json({
      message: "Success",
      page,
      limit,
      totalPages,
      totalStories,
      story,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error",
      error: error.message,
    });
  }
};

exports.getTopMonth = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 36;
    const skip = (page - 1) * limit;

    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

    const totalStories = await Story.countDocuments({
      updatedAt: { $gte: oneMonthAgo }
    });

    const story = await Story.find({
      updatedAt: { $gte: oneMonthAgo }
    })
      .sort({ views: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    const totalPages = Math.ceil(totalStories / limit);

    res.status(200).json({
      message: "Success",
      page,
      limit,
      totalPages,
      totalStories,
      story,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error",
      error: error.message,
    });
  }
};

exports.getLatestStory = async (req, res) => {
  try {
    const story = await Story.find().sort({ createdAt: -1 }).limit(10)
    res.status(200).json({
      message: "Successfully", story
    })
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error', error: error.message })

  }
}
exports.getStoryBySlug = async (req, res) => {
  try {
    const { slug } = req.params;

    const story = await Story.findOne({ slug })
      .populate("categoryId", "name slug") 
      .lean();

    if (!story) {
      return res.status(404).json({
        message: "Không tìm thấy truyện",
      });
    }
    await Story.updateOne({ _id: story._id }, { $inc: { views: 1 } });

    res.status(200).json({
      message: "Lấy chi tiết truyện thành công",
      data: story,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};
exports.getAllStories = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 36;
    const sortOrder = req.query.sort === "oldest" ? 1 : -1;

    const { country, status, categoryId, keyword } = req.query;

    const filter = {};

    if (country) filter.country = country;
    if (status) filter.status = status;
    if (categoryId) filter.categoryId = categoryId;

    // 🔍 Tìm theo name hoặc alternateName
    if (keyword) {
      filter.$or = [
        { name: { $regex: keyword, $options: "i" } },
        { alternateName: { $regex: keyword, $options: "i" } },
      ];
    }

    const skip = (page - 1) * limit;

    const stories = await Story.find(filter)
      .populate("categoryId", "name slug")
      .sort({ createdAt: sortOrder })
      .skip(skip)
      .limit(limit);

    const totalStories = await Story.countDocuments(filter);

    res.status(200).json({
      message: "Success",
      page,
      limit,
      totalPages: Math.ceil(totalStories / limit),
      totalStories,
      story: stories,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

exports.getStoriesByCategorySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    const page = Number(req.query.page) || 1; 
    const limit = Number(req.query.limit) || 12;
    const sortOrder = req.query.sort === "oldest" ? 1 : -1;
    const country = req.query.country;
    const status = req.query.status; 

    const category = await Category.findOne({ slug });
    if (!category) {
      return res.status(404).json({
        message: "Không tìm thấy danh mục",
      });
    }
    const filter = {
      categoryId: category._id,
    };
    if (country) filter.country = country;
    if (status) filter.status = status;
    const skip = (page - 1) * limit;
    const story = await Story.find(filter)
      .populate("categoryId", "name slug content")
      .sort({ createdAt: sortOrder })
      .skip(skip)
      .limit(limit);
    const totalStories = await Story.countDocuments(filter);
    res.status(200).json({
      message: "Success",
      page,
      limit,
      totalPages: Math.ceil(totalStories / limit),
      totalStories,
      story,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};
exports.getRandomStory = async (req, res) => {
  try {
    const limit = Number(req.query.limit) || 10;

    const stories = await Story.aggregate([
      { $sample: { size: limit } }
    ]);

    res.status(200).json({
      message: "Successfully",
      story: stories
    });
  } catch (error) {
    res.status(500).json({
      message: "Error",
      error: error.message
    });
  }
};

exports.createStory = async (req, res) => {
  try {
    const { name, alternateName, author, status, country, totalChapters, description, categoryId } = req.body;
    if (!name || name.trim() === '') {
      return res.status(400).json({ message: 'Vui lòng nhập tên truyện' });
    }
    if (!req.file || !req.file.path) {
      return res.status(400).json({ message: 'Vui lòng thêm ảnh đại diện' });
    }
    const exists = await Story.findOne({ name: name.trim() });
    if (exists) return res.status(400).json({ message: 'Truyện đã tồn tại' });
    let alternateNames = [];
    if (alternateName) {
      if (Array.isArray(alternateName)) {
        alternateNames = alternateName.map(n => n.trim());
      } else {
        alternateNames = [alternateName.trim()];
      }
    }
    const story = new Story({
      name: name.trim(),
      alternateName: alternateNames,
      author,
      status: status || 'UPCOMING',
      thumbnail: req.file.path,
      country,
      totalChapters: totalChapters || 0,
      description,
      categoryId,
    });

    const saved = await story.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
