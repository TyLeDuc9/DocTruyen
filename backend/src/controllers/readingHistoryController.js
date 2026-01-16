const ReadingHistory = require("../models/ReadingHistory");
const Story = require("../models/Story");
const mongoose = require("mongoose");
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

exports.getUserReadingHistory = async (req, res) => {
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


exports.saveChapterHistory = async (req, res) => {
  try {
    const userId = req.user.id;
    const { storyId, chapterId } = req.body;

    if (!storyId || !chapterId) {
      return res.status(400).json({ message: "storyId & chapterId required" });
    }

    let history = await ReadingHistory.findOne({ userId, storyId });

    if (history) {
      history.chapterId = chapterId;
      history.readAt = new Date();
      await history.save();
    } else {
      history = await ReadingHistory.create({ userId, storyId, chapterId });
    }

    const story = await Story.findById(storyId)
      .select("name slug thumbnail totalChapters");

    res.json({
      message: "Saved current chapter",
      data: {
        story: {
          id: story._id,
          name: story.name,
          slug: story.slug,
          thumbnail: story.thumbnail,
          totalChapters: story.totalChapters
        },
        lastChapterId: chapterId,
        lastReadAt: history.readAt
      }
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};




