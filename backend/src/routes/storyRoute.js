const express = require('express')
const router = express.Router()
const uploadStory = require("../middlewares/uploadStory");
const storyController = require('../controllers/storyController')
router.post("/create", uploadStory.single("thumbnail"), storyController.createStory);
router.get("/latest",  storyController.getLatestStory);
router.get("/random",  storyController.getRandomStory);
router.get("/all",  storyController.getAllStories);
router.get("/:slug", storyController.getStoryBySlug);
router.get("/category/:slug",  storyController.getStoriesByCategorySlug);
module.exports = router