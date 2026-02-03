const express = require("express");
const router = express.Router();
const notificationController = require("../controllers/notifyController");
const { verifyToken, verifyRole } = require("../middlewares/authMiddleware");
router.post("/create/broadcast", verifyToken, verifyRole('admin'),notificationController.broadcastNotification);
router.get("/all", verifyToken, verifyRole('admin'), notificationController.getAllNotify);
router.delete("/:id", verifyToken, verifyRole('admin'), notificationController.deleteNotify);
router.get("/:userId",  verifyToken, notificationController.getNotificationsByUser);



module.exports = router;
