const Chapter = require('../models/Chapter');
const Story = require("../models/Story");
exports.getSelectChapters = async (req, res) => {
  try {
    const chapters = await Chapter.find({ isDeleted: false });
    res.status(200).json(chapters);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.deleteChapter = async (req, res) => {
  try {
    const { id } = req.params;

    const chapter = await Chapter.findByIdAndDelete(id);

    if (!chapter) {
      return res.status(404).json({
        message: "Không tìm thấy chapter",
      });
    }

    return res.status(200).json({
      message: "Xoá chapter vĩnh viễn thành công",
      data: chapter,
    });
  } catch (error) {
    console.error("Delete chapter error:", error);
    return res.status(500).json({
      message: "Lỗi server khi xoá chapter",
    });
  }
};
exports.softDeleteChapter = async (req, res) => {
  try {
    const { id } = req.params;

    const chapter = await Chapter.findOne({
      _id: id,
      isDeleted: false,
    });

    if (!chapter) {
      return res.status(404).json({
        message: "Chapter not found or already deleted",
      });
    }

    chapter.isDeleted = true;
    await chapter.save();

    return res.json({
      message: "Chapter deleted (soft)",
      chapter,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Delete chapter failed",
      error: error.message,
    });
  }
};
exports.restoreChapter = async (req, res) => {
  try {
    const { id } = req.params;

    const chapter = await Chapter.findOne({
      _id: id,
      isDeleted: true,
    });

    if (!chapter) {
      return res.status(404).json({
        message: "Chapter not found or not deleted",
      });
    }

    chapter.isDeleted = false;
    await chapter.save();

    return res.json({
      message: "Chapter restored",
      chapter,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Restore chapter failed",
      error: error.message,
    });
  }
};

exports.getAllChapterAdmin = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    const sortQuery = req.query.sort || "newest";
    let sortOptions = { createdAt: -1 };

    if (sortQuery === "oldest" || sortQuery === "old") {
      sortOptions = { createdAt: 1 };
    }

    const filter = {};
    if (req.query.type) {
      filter.type = req.query.type;
    }


    let storyFilter = {};
    if (req.query.search) {
      storyFilter.name = { $regex: req.query.search, $options: "i" };
    }

    const chapters = await Chapter.find(filter)
      .populate({
        path: "storyId",
        select: "name slug",
        match: storyFilter,
      })
      .sort(sortOptions)
      .skip(skip)
      .limit(limit);

    const filteredChapters = chapters.filter(
      (chapter) => chapter.storyId !== null
    );
    let total = await Chapter.countDocuments(filter);
    if (req.query.search) {
      total = filteredChapters.length;
    }

    return res.json({
      message: "Success",
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      totalChapters: total,
      data: filteredChapters,
    });
  } catch (error) {
    console.error("getAllChapterAdmin error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};
exports.getChapterDetailBySlug = async (req, res) => {
  try {
    const { chapterSlug } = req.params;

    const chapter = await Chapter.findOneAndUpdate(
      { slug: chapterSlug, isDeleted: { $ne: true } },
      { $inc: { views: 1 } },
      { new: true }
    ).lean();

    if (!chapter) {
      return res.status(404).json({ message: "Không tìm thấy chương" });
    }

    const story = await Story.findById(chapter.storyId)
      .select("name slug")
      .lean();

    res.status(200).json({
      message: "Lấy chi tiết chương thành công",
      story,
      data: chapter,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};


exports.getChaptersByStorySlug = async (req, res) => {
  try {
    const { storySlug } = req.params;

    if (!storySlug) {
      return res.status(400).json({
        message: "Thiếu storySlug",
      });
    }

    const story = await Story.findOne({ slug: storySlug }).lean();

    if (!story) {
      return res.status(404).json({
        message: "Không tìm thấy truyện",
      });
    }

    const chapters = await Chapter.find({
      storyId: story._id,
      isDeleted: { $ne: true },
    })
      .sort({ chapterMain: 1, chapterSub: 1 })
      .lean();

    res.status(200).json({
      message: "Lấy danh sách chương thành công",
      story: {
        _id: story._id,
        name: story.name,
        slug: story.slug,
      },
      total: chapters.length,
      data: chapters,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

exports.createChapter = async (req, res) => {
  try {
    const {
      title,
      chapterMain,
      chapterSub = 0,
      content,
      storyId,
    } = req.body;

    if (!title || chapterMain === undefined || !storyId) {
      return res.status(400).json({
        message: "Thiếu dữ liệu bắt buộc",
      });
    }

    const existed = await Chapter.findOne({
      storyId,
      chapterMain,
      chapterSub,
    });

    if (existed) {
      return res.status(409).json({
        message: "Chapter đã tồn tại",
      });
    }

    const images = req.files
      ? req.files.map((file) => file.path)
      : [];

    const displayNumber =
      chapterSub && chapterSub > 0
        ? `${chapterMain}.${chapterSub}`
        : `${chapterMain}`;

    const chapter = new Chapter({
      title,
      chapterMain,
      chapterSub,
      displayNumber,
      content: content || null,
      images,
      storyId,
    });

    await chapter.save();

    // 🔥 THÊM DÒNG NÀY
    await Story.findByIdAndUpdate(storyId, {
      $inc: { totalChapters: 1 },
    });

    res.status(201).json({
      message: "Tạo chapter thành công",
      data: chapter,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        message: "Chapter bị trùng",
      });
    }

    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};