const Story = require('../models/Story');
const Category = require("../models/Category");
exports.getSelectAll = async (req, res) => {
  try {
    const stories = await Story.find({ isDeleted: false })
      .select("_id name slug thumbnail status totalChapters")
      .sort({ createdAt: -1 });

    res.status(200).json({
      message: "Lấy danh sách story thành công",
      total: stories.length,
      data: stories,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};
exports.updateStory = async (req, res) => {
  try {
    const { slug } = req.params;

    const story = await Story.findOne({
      slug,
      $or: [{ isDeleted: false }, { isDeleted: { $exists: false } }],
    });

    if (!story) {
      return res.status(404).json({ message: "Story not found" });
    }

    const {
      name,
      author,
      status,
      country,
      description,
      totalChapters,
      categoryId,
      alternateName,
    } = req.body;

    if (name !== undefined) story.name = name.trim();
    if (author !== undefined) story.author = author;
    if (status !== undefined) story.status = status;
    if (country !== undefined) story.country = country;
    if (description !== undefined) story.description = description;


    if (totalChapters !== undefined) {
      const total = Number(totalChapters);
      if (isNaN(total) || total < 0) {
        return res.status(400).json({
          message: "Tổng số chương phải là số >= 0",
        });
      }
      story.totalChapters = total;
    }

    if (alternateName !== undefined) {
      story.alternateName = Array.isArray(alternateName)
        ? alternateName.map(n => n.trim())
        : [alternateName.trim()];
    }

    if (categoryId !== undefined) {
      story.categoryId = Array.isArray(categoryId)
        ? categoryId
        : [categoryId];
    }

    if (req.file?.path) {
      story.thumbnail = req.file.path;
    }

    await story.save();

    res.json({
      message: "Update story successfully",
      data: story,
    });
  } catch (error) {
    console.error("Update story error:", error);

    if (error.code === 11000) {
      return res.status(400).json({
        message: "Story name already exists",
      });
    }

    res.status(500).json({ message: "Server error" });
  }
};


exports.restoreStory = async (req, res) => {
  try {
    const { id } = req.params;

    const story = await Story.findById(id);
    if (!story) {
      return res.status(404).json({ message: "Story not found" });
    }

    if (!story.isDeleted) {
      return res.status(400).json({ message: "Story is not deleted" });
    }

    story.isDeleted = false;
    await story.save();

    res.json({
      message: "Restore story successfully",
      story,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.softDeleteStory = async (req, res) => {
  try {
    const { id } = req.params;

    const story = await Story.findById(id);
    if (!story) {
      return res.status(404).json({ message: "Story not found" });
    }

    if (story.isDeleted) {
      return res.status(400).json({ message: "Story already deleted" });
    }

    story.isDeleted = true;
    await story.save();

    res.json({
      message: "Soft delete story successfully",
      story,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getAllStoryAdmin = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 36;
    const skip = (page - 1) * limit;

    const sortQuery = req.query.sort || "newest";
    let sortOptions = { createdAt: -1 };
    if (sortQuery === "oldest" || sortQuery === "old") {
      sortOptions = { createdAt: 1 };
    }

    const filter = {};
    if (req.query.status) {
      filter.status = req.query.status;
    }


    if (req.query.categorySlug) {
      const category = await Category.findOne({
        slug: req.query.categorySlug,
      }).select("_id");

      if (category) {
        filter.categoryId = category._id;
      } else {

        return res.json({
          message: "Success",
          page,
          limit,
          totalPages: 0,
          totalStories: 0,
          data: [],
        });
      }
    }

    if (req.query.search) {
      filter.$or = [
        { name: { $regex: req.query.search, $options: "i" } },
        { author: { $regex: req.query.search, $options: "i" } },
        { alternateName: { $regex: req.query.search, $options: "i" } },
      ];
    }

    const stories = await Story.find(filter)
      .populate("categoryId", "name slug")
      .sort(sortOptions)
      .skip(skip)
      .limit(limit);

    const total = await Story.countDocuments(filter);

    return res.json({
      message: "Success",
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      totalStories: total,
      data: stories,
    });
  } catch (error) {
    console.error("getAllStory error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};
exports.getStoryComplete = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 36;
    const skip = (page - 1) * limit;

    const filter = {
      status: "COMPLETED",
      $or: [
        { isDeleted: false },
        { isDeleted: { $exists: false } }
      ]
    };

    const totalStories = await Story.countDocuments(filter);

    const story = await Story.find(filter)
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

    const filter = {
      $or: [
        { isDeleted: false },
        { isDeleted: { $exists: false } }
      ]
    };

    const totalStories = await Story.countDocuments(filter);

    const story = await Story.find(filter)
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

    const filter = {
      updatedAt: { $gte: oneDayAgo },
      $or: [
        { isDeleted: false },
        { isDeleted: { $exists: false } }
      ]
    };

    const totalStories = await Story.countDocuments(filter);

    const story = await Story.find(filter)
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

    const filter = {
      updatedAt: { $gte: oneWeekAgo },
      $or: [
        { isDeleted: false },
        { isDeleted: { $exists: false } }
      ]
    };

    const totalStories = await Story.countDocuments(filter);

    const story = await Story.find(filter)
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

    const filter = {
      updatedAt: { $gte: oneMonthAgo },
      $or: [
        { isDeleted: false },
        { isDeleted: { $exists: false } }
      ]
    };

    const totalStories = await Story.countDocuments(filter);

    const story = await Story.find(filter)
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
    const story = await Story.find({ isDeleted: false })
      .sort({ createdAt: -1 })
      .limit(10);

    res.status(200).json({
      message: "Successfully",
      story,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error",
      error: error.message,
    });
  }
};


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

exports.getStoryBySlug = async (req, res) => {
  try {
    const { slug } = req.params;

    const story = await Story.findOne({
      slug,
      $or: [
        { isDeleted: false },
        { isDeleted: { $exists: false } }
      ]
    })
      .populate("categoryId", "name slug")
      .lean();

    if (!story) {
      return res.status(404).json({
        message: "Không tìm thấy truyện",
      });
    }
    await Story.updateOne(
      { _id: story._id },
      { $inc: { views: 1 } }
    );

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

    const filter = {
      $or: [
        { isDeleted: false },
        { isDeleted: { $exists: false } },
      ],
    };

    if (country) filter.country = country;
    if (status) filter.status = status;
    if (categoryId) filter.categoryId = categoryId;

    if (keyword) {
      filter.$and = [
        {
          $or: [
            { name: { $regex: keyword, $options: "i" } },
            { alternateName: { $regex: keyword, $options: "i" } },
          ],
        },
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
      $or: [
        { isDeleted: false },
        { isDeleted: { $exists: false } },
      ],
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
      {
        $match: {
          $or: [
            { isDeleted: false },
            { isDeleted: { $exists: false } },
          ],
        },
      },
      { $sample: { size: limit } },
    ]);

    res.status(200).json({
      message: "Successfully",
      story: stories,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error",
      error: error.message,
    });
  }
};


exports.createStory = async (req, res) => {
  try {
    const {
      name,
      alternateName,
      author,
      status,
      country,
      totalChapters,
      description,
      categoryId,
    } = req.body;

    if (!name || name.trim() === "") {
      return res.status(400).json({ message: "Vui lòng nhập tên truyện" });
    }

    if (!req.file || !req.file.path) {
      return res.status(400).json({ message: "Vui lòng thêm ảnh đại diện" });
    }

    const total = Number(totalChapters);
    if (isNaN(total) || total < 0) {
      return res.status(400).json({
        message: "Tổng số chương phải là số >= 0",
      });
    }

    const exists = await Story.findOne({ name: name.trim() });
    if (exists) {
      return res.status(400).json({ message: "Truyện đã tồn tại" });
    }

    let alternateNames = [];
    if (alternateName) {
      alternateNames = Array.isArray(alternateName)
        ? alternateName.map(n => n.trim())
        : [alternateName.trim()];
    }

    const story = new Story({
      name: name.trim(),
      alternateName: alternateNames,
      author,
      status: status || "UPCOMING",
      thumbnail: req.file.path,
      country,
      totalChapters: total,
      description,
      categoryId,
    });

    const saved = await story.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
