const Favorite = require("../models/Favorite");
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


// ================== DELETE FAVORITE ==================
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