const Notify = require("../models/Notify");
const User = require("../models/User");
const Chapter = require("../models/Chapter");
const Story = require("../models/Story");
exports.deleteNotify = async (req, res) => {
  try {
    const notifyId = req.params.id;

    const notify = await Notify.findById(notifyId);

    if (!notify) {
      return res.status(404).json({
        success: false,
        message: "Thông báo không tồn tại",
      });
    }

    await notify.deleteOne();

    res.json({
      success: true,
      message: "Admin xoá thông báo thành công",
    });
  } catch (error) {
    console.error("Admin delete notify error:", error);
    res.status(500).json({
      success: false,
      message: "Lỗi server",
    });
  }
};

exports.getAllNotify = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const sortQuery = req.query.sort || "newest";

    let sortType = -1;
    if (sortQuery === "oldest" || sortQuery === "old") {
      sortType = 1;
    }

    const skip = (page - 1) * limit;

    const notifies = await Notify.find()
      .sort({ createdAt: sortType })
      .skip(skip)
      .limit(limit)
      .populate("storyId", "name thumbnail")
      .populate("chapterId", "title images")
      .populate("userId", "email")

    const total = await Notify.countDocuments();

    return res.json({
      message: "Success",
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      totalNotifies: total,
      data: notifies,
    });
  } catch (error) {
    console.error("getAllNotify error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};
exports.broadcastNotification = async (req, res) => {
  try {
    const { title, message, storyId, chapterId, link } = req.body;

    if (!title || !message) {
      return res.status(400).json({
        success: false,
        message: "Thiếu title hoặc message",
      });
    }

    const users = await User.find({ isBlocked: false }).select("_id");

    const notifications = users.map((user) => ({
      userId: user._id,
      title,
      message,
      storyId: storyId || null,
      chapterId: chapterId || null,
      link,
    }));

    await Notify.insertMany(notifications);

    res.status(201).json({
      success: true,
      message: `Đã gửi thông báo cho ${users.length} user`,
    });
  } catch (error) {
    console.error("Broadcast notification error:", error);
    res.status(500).json({
      success: false,
      message: "Lỗi server",
    });
  }
};

exports.getNotificationsByUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    const total = await Notify.countDocuments({ userId });

    const notifications = await Notify.find({ userId })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate("storyId", "name slug thumbnail")
      .populate("chapterId", "title slug displayNumber images");

    return res.json({
      success: true,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      totalNotify: total,
      data: notifications,
    });
  } catch (error) {
    console.error("Get notifications error:", error);
    res.status(500).json({
      success: false,
      message: "Lỗi server",
    });
  }
};

