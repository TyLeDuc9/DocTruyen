const mongoose = require("mongoose");
const commentSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    storyId: { type: mongoose.Schema.Types.ObjectId, ref: "Story" }, 
    chapterId: { type: mongoose.Schema.Types.ObjectId, ref: "Chapter" }, 
    content: { type: String, required: true },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], 
    dislikes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    replies: [
      {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        content: { type: String, required: true },
        likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
        dislikes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
        createdAt: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

commentSchema.index({ storyId: 1, chapterId: 1, createdAt: -1 });
module.exports = mongoose.model("Comment", commentSchema);