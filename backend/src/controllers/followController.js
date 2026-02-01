const Follow = require('../models/Follow')
const Story = require("../models/Story")
const User = require('../models/User')
exports.forceDeleteFollow = async (req, res) => {
  try {
    const { id } = req.params;

    const follow = await Follow.findByIdAndDelete(id);

    if (!follow) {
      return res.status(404).json({
        message: 'Follow not found',
      });
    }

    return res.json({
      message: 'Delete follow successfully',
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.getAllFollows = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    const sortQuery = req.query.sort || "newest";
    let sortOptions = { createdAt: -1 };
    if (sortQuery === "oldest" || sortQuery === "old") {
      sortOptions = { createdAt: 1 };
    }

    const follows = await Follow.find()
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

    const total = await Follow.countDocuments();

    return res.json({
      success: true,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      totalFollows: total,
      data: follows,
    });
  } catch (error) {
    console.error("getAllFollows error:", error);
    return res.status(500).json({
      success: false,
      message: "Lỗi lấy danh sách follow",
    });
  }
};



exports.countFollowByStory = async (req, res) => {
  try {
    const { storyId } = req.params;

    if (!storyId) {
      return res.status(400).json({
        message: "Thiếu storyId",
      });
    }

    const count = await Follow.countDocuments({ storyId });

    res.status(200).json({
      storyId,
      totalFollows: count,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Lỗi server",
    });
  }
};  
exports.deleteFollow = async (req, res) => {
  try {
    const userId = req.user._id;
    const { storyId } = req.params;

    const follow = await Follow.findOne({ userId, storyId });
    if (!follow) {
      return res.status(404).json({ message: "Chưa follow truyện này" });
    }

    await Follow.deleteOne({ _id: follow._id });

    return res.json({
      message: "Unfollow thành công",
      storyId,
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};
exports.getMyFollows = async (req, res) => {
  try {
    const userId = req.user._id;

    const follows = await Follow.find({ userId })
      .populate({
        path: "storyId",
        select: "name slug thumbnail totalChapters", 
      });

    res.json({
      follows,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.createFollow = async (req, res) => {
  try {
    const userId = req.user._id;
    const { storyId } = req.body;

    const story = await Story.findById(storyId);
    if (!story) {
      return res.status(404).json({ message: "Story không tồn tại" });
    }

    const existed = await Follow.findOne({ userId, storyId });
    if (existed) {
      return res.status(409).json({ message: "Already followed" });
    }

    const follow = await Follow.create({ userId, storyId });

    const populatedFollow = await Follow.findById(follow._id)
      .populate("storyId", "name slug thumbnail totalChapters");

    return res.status(201).json(populatedFollow);

  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};
