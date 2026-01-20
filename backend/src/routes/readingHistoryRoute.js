const express = require('express')
const router = express.Router()
const { verifyToken, verifyRole } = require("../middlewares/authMiddleware");
const readingHistory = require('../controllers/readingHistoryController')
router.post("/story", verifyToken, readingHistory.saveStoryHistory);
router.post("/chapter", verifyToken, readingHistory.saveChapterHistory);
router.get("/story", verifyToken, readingHistory.getStoryReadingHistory);
router.get("/chapter", verifyToken, readingHistory.getChapterReadingHistory);
router.get("/check/chapter/:chapterId",verifyToken, readingHistory.checkChapterHistory);
router.delete("/chapter/:chapterId",verifyToken,  readingHistory.deleteChapterHistory);
module.exports = router