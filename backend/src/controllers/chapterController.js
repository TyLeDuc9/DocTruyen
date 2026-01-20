const Chapter = require('../models/Chapter');
const Story = require("../models/Story");
exports.getChapterDetailBySlug = async (req, res) => {
  try {
    const { chapterSlug } = req.params;

    const chapter = await Chapter.findOne({ slug: chapterSlug }).lean();
    if (!chapter) {
      return res.status(404).json({ message: "Không tìm thấy chương" });
    }

    // Lấy info truyện
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

    // 1. Tìm story theo slug
    const story = await Story.findOne({ slug: storySlug }).lean();

    if (!story) {
      return res.status(404).json({
        message: "Không tìm thấy truyện",
      });
    }

    // 2. Lấy danh sách chapter theo storyId
    const chapters = await Chapter.find({ storyId: story._id })
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