const express = require('express')
const router = express.Router()
const uploadStory = require("../middlewares/uploadStory");
const { verifyToken, verifyRole } = require("../middlewares/authMiddleware");
const storyController = require('../controllers/storyController')
router.post(
  "/create",
  verifyToken,
  verifyRole("admin"),
  uploadStory.single("thumbnail"),
  storyController.createStory
);

router.get("/latest", storyController.getLatestStory);
router.get("/select", storyController.getSelectAll);
router.get("/top-month", storyController.getTopMonth);
router.get("/top-week", storyController.getTopWeek);
router.get("/top-day", storyController.getTopDay);
router.get("/complete", storyController.getStoryComplete);
router.get("/top-view", storyController.getTopView);
router.get("/random", storyController.getRandomStory);

router.get("/all", storyController.getAllStories);
router.get("/all-admin", storyController.getAllStoryAdmin);

router.put(
  "/update/:slug",
  uploadStory.single("thumbnail"),
  storyController.updateStory
);

router.patch(
  "/soft/:id",
  verifyToken,
  verifyRole("admin"),
  storyController.softDeleteStory
);

router.patch(
  "/restore/:id",
  verifyToken,
  verifyRole("admin"),
  storyController.restoreStory
);

router.get("/category/:slug", storyController.getStoriesByCategorySlug);

router.get("/:slug", storyController.getStoryBySlug);

module.exports = router;
module.exports = router