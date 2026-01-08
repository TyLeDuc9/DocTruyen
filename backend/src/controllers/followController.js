const Follow = require('../models/Follow')
const Story = require("../models/Story")
const User = require('../models/User')
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
