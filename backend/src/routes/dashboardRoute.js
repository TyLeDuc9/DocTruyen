const express = require("express");
const router = express.Router();
const dashboardController = require("../controllers/dashboardController");
router.get("/overview", dashboardController.overview);
router.get("/top-view-week", dashboardController.topViewedStoriesThisWeek);
router.get("/user-register-by-date", dashboardController.userRegisterByDate);
module.exports = router;
