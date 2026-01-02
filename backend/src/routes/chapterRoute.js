const express = require('express')
const router = express.Router()
const uploadChapter = require("../middlewares/uploadChapter");
const chapterController = require('../controllers/chapterController')
router.post( "/create",uploadChapter.array("images", 50), chapterController.createChapter);
router.get("/:storySlug", chapterController.getChaptersByStorySlug);
router.get("/detail/:chapterSlug", chapterController.getChapterDetailBySlug);
module.exports = router