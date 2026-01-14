const express = require('express')
const router = express.Router()
const uploadUser = require("../middlewares/uploadUser");
const { verifyToken, verifyRole } = require("../middlewares/authMiddleware");
const userController = require('../controllers/userController')
router.get("/me", verifyToken, userController.getMeUser);
router.put("/update",verifyToken,uploadUser.single("avatar"), userController.updateUser);
module.exports = router;