const express = require('express')
const router = express.Router()
const { verifyToken, verifyRole } = require("../middlewares/authMiddleware");
const readingHistory = require('../controllers/readingHistoryController')
router.post("/story", verifyToken, readingHistory.saveStoryHistory);
router.post("/chapter", verifyToken, readingHistory.saveChapterHistory);
router.get("/story", verifyToken, readingHistory.getUserReadingHistory);
module.exports = router