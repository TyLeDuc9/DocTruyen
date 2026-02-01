const express = require('express')
const router = express.Router()
const { verifyToken, verifyRole } = require("../middlewares/authMiddleware");
const followController = require('../controllers/followController')
router.get("/me", verifyToken, followController.getMyFollows);
router.get("/all",  followController.getAllFollows);
router.post("/create", verifyToken, followController.createFollow)
router.delete("/:storyId", verifyToken, followController.deleteFollow);
router.delete('/force/:id',verifyToken,verifyRole('admin'),followController.forceDeleteFollow)
router.get("/count/:storyId", followController.countFollowByStory);
module.exports = router