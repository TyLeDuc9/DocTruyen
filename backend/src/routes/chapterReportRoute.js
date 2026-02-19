const express = require("express");
const router = express.Router();
const chapterReportController = require("../controllers/chapterReportController");
const { verifyToken, verifyRole } = require("../middlewares/authMiddleware");
router.get(
  "/all",
  verifyToken, verifyRole('admin'),
  chapterReportController.getAllChapterReport
);
router.put(
  "/status/:id",
  verifyToken, verifyRole('admin'),
  chapterReportController.updateChapterReportStatus
);
router.delete(
  "/:id",
  verifyToken, verifyRole('admin'),
  chapterReportController.deleteChapterReport
);
router.post(
  "/create",
  verifyToken,
  chapterReportController.createChapterReport
);

module.exports = router;