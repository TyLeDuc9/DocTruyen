const Favorite = require("../models/Favorite");
exports.forceDeleteFavorite = async (req, res) => {
  try {
    const { id } = req.params;

    const favorite = await Favorite.findById(id);
    if (!favorite) {
      return res.status(404).json({
        success: false,
        message: 'Favorite not found',
      });
    }

    await Favorite.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: 'Force delete favorite successfully',
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
exports.getAllFavorites = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;
    const sortQuery = req.query.sort || "newest";
    let sortOptions = { createdAt: -1 };
    if (sortQuery === "oldest" || sortQuery === "old") {
      sortOptions = { createdAt: 1 };
    }

    const favorites = await Favorite.find()
      .populate({
        path: "userId",
        select: "userName email avatarUrl role",
      })
      .populate({
        path: "storyId",
        select: "name slug thumbnail status views",
      })
      .sort(sortOptions)
      .skip(skip)
      .limit(limit);

    const total = await Favorite.countDocuments();

    return res.json({
      success: true,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      totalFavorites: total,
      data: favorites,
    });
  } catch (error) {
    console.error("getAllFavorites error:", error);
    return res.status(500).json({
      success: false,
      message: "Lỗi lấy danh sách favorite",
    });
  }
};

exports.getMyFavorites = async (req, res) => {
  try {
    const userId = req.user._id;

    const favorites = await Favorite.find({ userId })
      .populate({
        path: "storyId",
        select: "name slug thumbnail totalChapters",
      });

    res.json({
      favorites,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
exports.countFavoriteByStory = async (req, res) => {
  try {
    const { storyId } = req.params;

    if (!storyId) {
      return res.status(400).json({
        message: "Thiếu storyId",
      });
    }

    const count = await Favorite.countDocuments({ storyId });

    res.status(200).json({
      storyId,
      totalFavorites: count,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Lỗi server",
    });
  }
};  
exports.createFavorite = async (req, res) => {
  try {
    const userId = req.user._id;
    const { storyId } = req.body;
    if (!storyId) {
      return res.status(400).json({ message: "Thiếu storyId" });
    }
    const existed = await Favorite.findOne({ userId, storyId });
    if (existed) {
      return res.status(400).json({ message: "Truyện đã được yêu thích" });
    }
    const favorite = await Favorite.create({ userId, storyId });
    const populatedFavorite = await Favorite.findById(favorite._id)
      .populate("storyId", "name thumbnail totalChapters slug");

    res.status(201).json({
      message: "Favorite thành công",
      favorite: populatedFavorite,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Lỗi server" });
  }
};

exports.deleteFavorite = async (req, res) => {
  try {
    const userId = req.user._id;
    const { storyId } = req.params;

    const favorite = await Favorite.findOne({ userId, storyId });
    if (!favorite) {
      return res.status(404).json({ message: "Chưa yêu thích truyện này" });
    }

    await Favorite.deleteOne({ _id: favorite._id });

    return res.json({
      message: "Bỏ yêu thích thành công",
      storyId,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};