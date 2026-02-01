const User = require("../models/User");
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findByIdAndDelete(id);

    if (!user) {
      return res.status(404).json({
        message: "User không tồn tại",
      });
    }

    res.status(200).json({
      message: "Xoá user thành công",
    });
  } catch (error) {
    res.status(500).json({
      message: "Lỗi khi xoá user",
      error: error.message,
    });
  }
};
exports.blockUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (user.isBlocked) {
      return res.status(400).json({
        success: false,
        message: "User is already blocked",
      });
    }

    user.isBlocked = true;
    await user.save();

    res.json({
      success: true,
      message: "User blocked successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.unblockUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (!user.isBlocked) {
      return res.status(400).json({
        success: false,
        message: "User is not blocked",
      });
    }

    user.isBlocked = false;
    await user.save();

    res.json({
      success: true,
      message: "User unblocked successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
exports.getAllUser = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const sortQuery = req.query.sort || "newest";

    let sortType = -1; 
    if (sortQuery === "oldest" || sortQuery === "old") {
      sortType = 1;
    }

    const skip = (page - 1) * limit;
    const search = req.query.search || "";
    const role = req.query.role || "";

    const filter = {};

    if (search) {
      filter.$or = [
        { userName: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
      ];
    }

    if (role) {
      filter.role = role;
    }

    const users = await User.find(filter)
      .select("-password")
      .sort({ createdAt: sortType })
      .skip(skip)
      .limit(limit);

    const total = await User.countDocuments(filter);

    return res.json({
      message: "Success",
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      totalUsers: total,
      data: users,
    });
  } catch (error) {
    console.error("getAllUser error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

exports.getMeUser = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "Không tìm thấy người dùng" });
    }

    res.json({
      user,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Lỗi server" });
  }
};
exports.updateUser = async (req, res) => {
  try {
    const userId = req.user.id;
    const { userName } = req.body;
    const updateData = {};
    if (userName) updateData.userName = userName;
    if (req.file) {
      updateData.avatarUrl = req.file.path;
    }
    const user = await User.findByIdAndUpdate(
      userId,
      updateData,
      { new: true }
    ).select("-password");
    res.json({
      message: "Cập nhật thông tin thành công",
      user,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Lỗi server" });
  }
};