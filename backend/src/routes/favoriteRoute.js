const express = require('express')
const router = express.Router()
const { verifyToken, verifyRole } = require("../middlewares/authMiddleware");
const favoriteController = require('../controllers/favoriteController')
router.get("/me", verifyToken, favoriteController.getMyFavorites);
router.post("/create", verifyToken, favoriteController.createFavorite)
router.delete("/:storyId", verifyToken, favoriteController.deleteFavorite);
router.get("/count/:storyId", favoriteController.countFavoriteByStory);
module.exports = router