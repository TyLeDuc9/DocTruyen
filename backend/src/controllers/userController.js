const User = require("../models/User");
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