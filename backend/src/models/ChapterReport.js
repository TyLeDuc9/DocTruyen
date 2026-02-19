const mongoose = require("mongoose");

const chapterReportSchema = new mongoose.Schema(
    {
        chapterId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Chapter",
            required: true,
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        reason: {
            type: String,
            required: true,
            trim: true,
        },
        status: {
            type: String,
            enum: ["PENDING", "FIXED", "REJECTED"],
            default: "PENDING",
        },

   
    },
    { timestamps: true }
);

chapterReportSchema.index({ chapterId: 1, createdAt: -1 });

module.exports = mongoose.model("ChapterReport", chapterReportSchema);