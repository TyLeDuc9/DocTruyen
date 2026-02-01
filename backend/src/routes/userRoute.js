const express = require('express')
const router = express.Router()
const uploadUser = require("../middlewares/uploadUser");
const { verifyToken, verifyRole } = require("../middlewares/authMiddleware");
const userController = require('../controllers/userController')
router.get("/me", verifyToken, userController.getMeUser);
router.put("/block/:id", verifyToken,verifyRole("admin"),userController.blockUser);
router.put("/unblock/:id",verifyToken,verifyRole("admin"),userController.unblockUser);
router.delete("/delete/:id",verifyToken,verifyRole("admin"),userController.deleteUser);
router.get("/all", verifyToken, verifyRole("admin"), userController.getAllUser);
router.put("/update", verifyToken, uploadUser.single("avatar"), userController.updateUser);
module.exports = router;