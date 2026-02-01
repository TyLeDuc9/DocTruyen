const Comment = require("../models/Comment");
  exports.deleteReplyAdmin = async (req, res) => {
    try {
      const { commentId, replyId } = req.params;

      await Comment.findByIdAndUpdate(
        commentId,
        { $pull: { replies: { _id: replyId } } },
        { new: true }
      );

      res.json({
        success: true,
        message: "Reply deleted",
      });
    } catch (err) {
      res.status(500).json({ message: "Server error" });
    }
  };
exports.deleteParentComment = async (req, res) => {
  try {
    const { id } = req.params; 
    const comment = await Comment.findById(id);
    if (!comment) {
      return res.status(404).json({
        success: false,
        message: "Comment not found",
      });
    }
    await Comment.findByIdAndDelete(id);
    res.json({
      success: true,
      message: "Parent comment deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
exports.getAllComments = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 20;
    const skip = (page - 1) * limit;
    const sortQuery = req.query.sort || "newest";
    const sortOptions =
      sortQuery === "oldest" || sortQuery === "old"
        ? { createdAt: 1 }
        : { createdAt: -1 };

    const [comments, total] = await Promise.all([
      Comment.find({})
        .populate("userId", "userName email avatarUrl role")
        .populate("storyId", "name slug")
        .populate("chapterId", "chapterMain title")
        .populate("replies.userId", "userName email avatarUrl")
        .sort(sortOptions)
        .skip(skip)
        .limit(limit),

      Comment.countDocuments({})
    ]);

    return res.json({
      success: true,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      totalComments: total,
      data: comments,
    });
  } catch (err) {
    console.error("getAllComments error:", err);
    return res.status(500).json({
      success: false,
      message: "Lỗi lấy danh sách comment",
    });
  }
};


exports.getCommentByChapterId = async (req, res) => {
  try {
    const { chapterId } = req.params;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    const totalComments = await Comment.countDocuments({ chapterId });
    const totalPages = Math.ceil(totalComments / limit);

    const comments = await Comment.find({ chapterId })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate("userId", "userName avatarUrl")
      .populate("replies.userId", "userName avatarUrl");

    res.json({
      page,
      limit,
      totalPages,
      totalComments,
      comments,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getCommentByStoryId = async (req, res) => {
  try {
    const { storyId } = req.params;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;
    const totalComments = await Comment.countDocuments({ storyId });
    const totalPages = Math.ceil(totalComments / limit);
    const comments = await Comment.find({ storyId })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate("userId", "userName avatarUrl")
      .populate("replies.userId", "userName avatarUrl");

    res.json({
      page,
      limit,
      totalPages,
      totalComments,
      comments,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
}
exports.deleteReply = async (req, res) => {
  try {
    const { commentId, replyId } = req.params;
    const userId = req.user._id;

    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    const reply = comment.replies.find(r => r._id.toString() === replyId);
    if (!reply) {
      return res.status(404).json({ message: "Reply not found" });
    }

    if (reply.userId.toString() !== userId.toString()) {
      return res.status(403).json({ message: "You are not allowed to delete this reply" });
    }

    comment.replies = comment.replies.filter(r => r._id.toString() !== replyId);
    await comment.save();

    res.json({ message: "Reply deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.deleteComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const userId = req.user._id;
    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }
    if (comment.userId.toString() !== userId.toString()) {
      return res.status(403).json({ message: "You are not allowed to delete this comment" });
    }
    await Comment.findByIdAndDelete(commentId);
    res.json({ message: "Comment and all its replies deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
exports.reactReply = async (req, res) => {
  const { commentId, replyId } = req.params;
  const { type } = req.body;
  const userId = req.user._id;

  const comment = await Comment.findById(commentId);
  if (!comment) return res.status(404).json({ message: "Comment not found" });

  const reply = comment.replies.id(replyId);
  if (!reply) return res.status(404).json({ message: "Reply not found" });

  if (type === "like") {
    reply.dislikes.pull(userId);
    reply.likes.includes(userId)
      ? reply.likes.pull(userId)
      : reply.likes.push(userId);
  }

  if (type === "dislike") {
    reply.likes.pull(userId);
    reply.dislikes.includes(userId)
      ? reply.dislikes.pull(userId)
      : reply.dislikes.push(userId);
  }

  await comment.save();

  res.json({
    likes: reply.likes,
    dislikes: reply.dislikes
  });
};
exports.reactComment = async (req, res) => {
  const { commentId } = req.params;
  const { type } = req.body;
  const userId = req.user._id;

  const comment = await Comment.findById(commentId);
  if (!comment) return res.status(404).json({ message: "Not found" });

  if (type === "like") {
    comment.dislikes.pull(userId);
    comment.likes.includes(userId)
      ? comment.likes.pull(userId)
      : comment.likes.push(userId);
  }

  if (type === "dislike") {
    comment.likes.pull(userId);
    comment.dislikes.includes(userId)
      ? comment.dislikes.pull(userId)
      : comment.dislikes.push(userId);
  }

  await comment.save();

  res.json({
    likes: comment.likes,
    dislikes: comment.dislikes
  });
};
exports.createReply = async (req, res) => {
  try {
    const { commentId } = req.params;
    const { content } = req.body;
    const userId = req.user._id;
    if (!content) {
      return res.status(400).json({ message: "Content is required" });
    }
    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }
    const newReply = {
      userId,
      content,
    };
    comment.replies.push(newReply);
    await comment.save();
    const populatedComment = await Comment.findById(commentId)
      .populate("replies.userId", "userName avatarUrl");

    const lastReply = populatedComment.replies.at(-1);

    res.status(201).json({
      message: "Reply created successfully",
      reply: lastReply,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.createComment = async (req, res) => {
  try {
    const { storyId, chapterId, content } = req.body;
    const userId = req.user._id;

    if (!content) {
      return res.status(400).json({ message: "Content is required" });
    }

    if (!storyId && !chapterId) {
      return res.status(400).json({ message: "Must provide storyId or chapterId" });
    }
    const comment = new Comment({
      userId,
      storyId: storyId || null,
      chapterId: chapterId || null,
      content,
    });

    await comment.save();

    const populatedComment = await Comment.findById(comment._id)
      .populate("userId", "avatarUrl userName");

    res.status(201).json({
      message: "Comment created successfully",
      comment: populatedComment,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

