const express = require('express')
const router = express.Router()
const { verifyToken, verifyRole } = require("../middlewares/authMiddleware");
const commentController = require('../controllers/commentController')
router.post('/create', verifyToken, commentController.createComment)
router.post("/reply/:commentId", verifyToken, commentController.createReply);
router.get("/chapter/:chapterId", commentController.getCommentByChapterId);
router.get('/story/:storyId', commentController.getCommentByStoryId)
router.put("/react/:commentId", verifyToken, commentController.reactComment);
router.put("/react/reply/:commentId/:replyId", verifyToken, commentController.reactReply);
router.delete("/delete/:commentId", verifyToken, commentController.deleteComment)
router.delete("/delete/reply/:commentId/:replyId", verifyToken, commentController.deleteReply)
module.exports = router 