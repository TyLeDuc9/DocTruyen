const ReadingHistory = require("../models/ReadingHistory");
const Story = require("../models/Story");
const Chapter=require("../models/Chapter")
const mongoose = require("mongoose");
exports.checkChapterHistory = async (req, res) => {
  try {
    const userId = req.user.id;
    const { chapterId } = req.params;

    if (!chapterId) {
      return res.status(400).json({ message: "chapterId required" });
    }

    const history = await ReadingHistory.findOne({
      userId,
      chapterId,
    });

    res.json({
      saved: !!history, 
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.deleteChapterHistory = async (req, res) => {
  try {
    const userId = req.user.id;
    const { chapterId } = req.params;

    if (!chapterId) {
      return res.status(400).json({ message: "chapterId required" });
    }

    const deleted = await ReadingHistory.findOneAndDelete({
      userId,
      chapterId
    });

    if (!deleted) {
      return res.status(404).json({ message: "History not found" });
    }

    res.json({
      message: "Deleted chapter history successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.saveChapterHistory = async (req, res) => {
  try {
    const userId = req.user.id;
    const { storyId, chapterId } = req.body;

    if (!storyId || !chapterId) {
      return res.status(400).json({ message: "storyId & chapterId required" });
    }

    const story = await Story.findById(storyId);
    if (!story) {
      return res.status(404).json({ message: "Story not found" });
    }
    const chapter = await Chapter.findOne({ _id: chapterId, storyId }).select(
      "title displayNumber slug chapterMain chapterSub"
    );

    if (!chapter) {
      return res
        .status(400)
        .json({ message: "Chapter not belong to this story" });
    }

    let history = await ReadingHistory.findOne({ userId, storyId });

    if (history) {
      history.chapterId = chapterId;
      history.readAt = new Date();
      await history.save();
    } else {
      history = await ReadingHistory.create({
        userId,
        storyId,
        chapterId,
      });
    }

    res.json({
      message: "Saved current chapter",
      data: {
        lastChapter: {
          id: chapter._id,
          title: chapter.title,
          displayNumber: chapter.displayNumber,
          slug: chapter.slug,
          chapterMain: chapter.chapterMain,
          chapterSub: chapter.chapterSub,
        },
        lastReadAt: history.readAt,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getChapterReadingHistory = async (req, res) => {
  try {
    const userId = req.user.id;

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const sortType = req.query.sort === "old" ? 1 : -1;

    const skip = (page - 1) * limit;

    const history = await ReadingHistory.find({
      userId,
      chapterId: { $ne: null }, // CHỈ LẤY CHAPTER
    })
      .sort({ readAt: sortType })
      .skip(skip)
      .limit(limit)
      .populate(
        "chapterId",
        "title displayNumber slug chapterMain chapterSub storyId"
      );

    const total = await ReadingHistory.countDocuments({
      userId,
      chapterId: { $ne: null },
    });

    const result = history.map((item) => ({
      lastChapter: {
        id: item.chapterId._id,
        title: item.chapterId.title,
        displayNumber: item.chapterId.displayNumber,
        slug: item.chapterId.slug,
        chapterMain: item.chapterId.chapterMain,
        chapterSub: item.chapterId.chapterSub,
        storyId: item.chapterId.storyId,
      },
      lastReadAt: item.readAt,
    }));

    res.json({
      message: "Success",
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      totalChapters: total,
      data: result,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};




exports.saveStoryHistory = async (req, res) => {
  try {
    const userId = req.user.id;
    const { storyId, chapterId } = req.body;

    if (!storyId) {
      return res.status(400).json({ message: "storyId is required" });
    }
    await ReadingHistory.deleteOne({ userId, storyId });
    const list = await ReadingHistory.find({ userId }).sort({ readAt: 1 });
    if (list.length >= 20) {
      await ReadingHistory.deleteOne({ _id: list[0]._id });
    }


    const history = await ReadingHistory.create({
      userId,
      storyId,
      chapterId: chapterId || null,
      readAt: new Date()
    });

    const story = await Story.findById(storyId)
      .select("name slug thumbnail totalChapters");

    res.json({
      message: "Saved story history",
      data: {
        story: {
          id: story._id,
          name: story.name,
          slug: story.slug,
          thumbnail: story.thumbnail,
          totalChapters: story.totalChapters
        },
        lastChapterId: history.chapterId,
        lastReadAt: history.readAt
      }
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getStoryReadingHistory = async (req, res) => {
  try {
    const userId = req.user.id;

    const histories = await ReadingHistory.find({ userId })
      .sort({ readAt: -1 })
      .limit(20);

    const storyIds = histories.map(h => h.storyId);

    const stories = await Story.find({ _id: { $in: storyIds } })
      .select("name slug thumbnail totalChapters");

    let result = histories
      .map(h => {
        const story = stories.find(
          s => s._id.toString() === h.storyId.toString()
        );

    
        if (!story) return null;

        return {
          story: {
            id: story._id,
            name: story.name,
            slug: story.slug,
            thumbnail: story.thumbnail,
            totalChapters: story.totalChapters
          },
          lastChapterId: h.chapterId,
          lastReadAt: h.readAt
        };
      })
      .filter(Boolean);

    res.json({
      message: "Success",
      data: result
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};



