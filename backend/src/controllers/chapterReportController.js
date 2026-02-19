const ChapterReport = require("../models/ChapterReport");
const Chapter = require("../models/Chapter");
exports.deleteChapterReport = async (req, res) => {
  try {
    const { id } = req.params;

    const report = await ChapterReport.findById(id);
    if (!report) {
      return res.status(404).json({
        success: false,
        message: "Report không tồn tại",
      });
    }
    await ChapterReport.findByIdAndDelete(id);
    return res.json({
      success: true,
      message: "Xóa report thành công",
    });
  } catch (error) {
    console.error("Delete Chapter Report Error:", error);
    return res.status(500).json({
      success: false,
      message: "Lỗi server",
    });
  }
};
exports.getAllChapterReport = async (req, res) => {
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


    if (req.query.status) {
      filter.status = req.query.status;
    }

 
    if (req.query.chapterId) {
      filter.chapterId = req.query.chapterId;
    }


    if (req.query.search) {
      filter.reason = {
        $regex: req.query.search,
        $options: "i",
      };
    }

    const reports = await ChapterReport.find(filter)
      .populate("chapterId", "title slug chapterNumber")
      .populate("userId", "username email")
      .sort(sortOptions)
      .skip(skip)
      .limit(limit);

    const total = await ChapterReport.countDocuments(filter);

    return res.json({
      message: "Success",
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      totalReports: total,
      data: reports,
    });
  } catch (error) {
    console.error("getAllChapterReport error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};


exports.createChapterReport = async (req, res) => {
  try {
    const { chapterId, reason } = req.body;

    if (!chapterId || !reason) {
      return res.status(400).json({
        success: false,
        message: "Thiếu thông tin bắt buộc",
      });
    }

    const chapter = await Chapter.findById(chapterId);
    if (!chapter) {
      return res.status(404).json({
        success: false,
        message: "Chapter không tồn tại",
      });
    }


    const existedReport = await ChapterReport.findOne({
      chapterId,
      userId: req.user.id,
    });

    if (existedReport) {
      return res.status(400).json({
        success: false,
        message: "Bạn đã báo lỗi chương này rồi",
      });
    }

    const newReport = await ChapterReport.create({
      chapterId,
      userId: req.user.id,
      reason,
    });

    return res.status(201).json({
      success: true,
      message: "Báo lỗi chương thành công",
      data: newReport,
    });
  } catch (error) {
    console.error("Create Chapter Report Error:", error);
    return res.status(500).json({
      success: false,
      message: "Lỗi server",
    });
  }
};
exports.updateChapterReportStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    // validate status
    const validStatus = ["PENDING", "FIXED", "REJECTED"];
    if (!status || !validStatus.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Status không hợp lệ",
      });
    }

    const report = await ChapterReport.findById(id);
    if (!report) {
      return res.status(404).json({
        success: false,
        message: "Report không tồn tại",
      });
    }

    report.status = status;
    await report.save();

    return res.json({
      success: true,
      message: "Cập nhật trạng thái report thành công",
      data: report,
    });
  } catch (error) {
    console.error("Update Chapter Report Status Error:", error);
    return res.status(500).json({
      success: false,
      message: "Lỗi server",
    });
  }
};