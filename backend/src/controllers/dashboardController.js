const User = require("../models/User");
const Story = require("../models/Story");
const Chapter = require("../models/Chapter");
const mongoose = require("mongoose");

exports.topViewedStoriesThisWeek = async (req, res) => {
  try {
    const limit = Number(req.query.limit) || 10;

    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 7);

    const stories = await Story.find({
      isDeleted: false,
      updatedAt: { $gte: startDate },
    })
      .select("name slug views thumbnail author status")
      .sort({ views: -1 })
      .limit(limit);

    res.json({
      success: true,
      data: stories,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.userRegisterByDate = async (req, res) => {
  try {
    const data = await User.aggregate([
      {
        $group: {
          _id: {
            $dateToString: {
              format: "%Y-%m-%d",
              date: "$createdAt"
            }
          },
          total: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.overview = async (req, res) => {
  try {
    const [totalUsers, totalStories, totalChapters, totalViews] =
      await Promise.all([
        User.countDocuments(),
        Story.countDocuments(),      
        Chapter.countDocuments(),    
        Story.aggregate([
          {
            $group: {
              _id: null,
              total: { $sum: "$views" }, 
            },
          },
        ]),
      ]);

    res.json({
      totalUsers,
      totalStories,
      totalChapters,
      totalViews: totalViews[0]?.total || 0,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


