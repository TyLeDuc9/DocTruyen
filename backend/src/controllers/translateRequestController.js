const User=require('../models/User')
const TranslateRequest = require("../models/TranslateRequest");
exports.deleteTranslateRequest = async (req, res) => {
    try {
        const { id } = req.params;

        const request = await TranslateRequest.findById(id);

        if (!request) {
            return res.status(404).json({
                success: false,
                message: "Translate request not found"
            });
        }

        await TranslateRequest.findByIdAndDelete(id);

        res.status(200).json({
            success: true,
            message: "Delete translate request successfully"
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

exports.createTranslate = async (req, res) => {
  try {
    const { content } = req.body;
    const userId = req.user._id; 
    if (!content) {
      return res.status(400).json({
        message: "Vui lòng nhập nội dung cần dịch",
      });
    }
    const translateRequest = await TranslateRequest.create({
      userId,
      content,
    });
    res.status(201).json({
      message: "Tạo yêu cầu dịch thành công",
      data: translateRequest,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Lỗi server",
    });
  }
};

exports.getAllTranslate = async (req, res) => {
  try {
    const translates = await TranslateRequest.find()
      .populate("userId", "userName email");

    res.status(200).json({
      message: "Lấy tất cả yêu cầu dịch thành công",
      data: translates,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Lỗi server",
    });
  }
};