const express = require("express");
const router = express.Router();
const uploadChapter = require("../middlewares/uploadChapter");
const { verifyToken, verifyRole } = require("../middlewares/authMiddleware");
const chapterController = require("../controllers/chapterController");
router.post(
  "/create",
  uploadChapter.array("images", 50),
  chapterController.createChapter
);
router.get("/all", chapterController.getAllChapterAdmin);
router.delete(
  "/soft-delete/:id",
  verifyToken,
  verifyRole("admin"),
  chapterController.softDeleteChapter
);
router.delete(
  "/force-delete/:id",
  verifyToken,
  verifyRole("admin"),
  chapterController.deleteChapter
);
router.patch(
  "/restore/:id",
  verifyToken,
  verifyRole("admin"),
  chapterController.restoreChapter
);
router.get("/detail/:chapterSlug", chapterController.getChapterDetailBySlug);
router.get("/:storySlug", chapterController.getChaptersByStorySlug);

module.exports = router;
