const express = require('express')
const router = express.Router()
const { verifyToken, verifyRole } = require("../middlewares/authMiddleware");
const favoriteController = require('../controllers/favoriteController')
router.get("/me", verifyToken, favoriteController.getMyFavorites);
router.get("/all", verifyToken, verifyRole('admin'),  favoriteController.getAllFavorites)
router.post("/create", verifyToken, favoriteController.createFavorite)
router.delete("/:storyId", verifyToken, favoriteController.deleteFavorite);
router.delete("/force/:id", verifyToken, verifyRole('admin'), favoriteController.forceDeleteFavorite);
router.get("/count/:storyId", favoriteController.countFavoriteByStory);
module.exports = router