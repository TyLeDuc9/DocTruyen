const express = require('express')
const router = express.Router()
const translateController = require('../controllers/translateRequestController')
const {  verifyToken, verifyRole } = require('../middlewares/authMiddleware')
router.post("/create",verifyToken,translateController.createTranslate);
router.delete("/:id",verifyToken,verifyRole('admin'),translateController.deleteTranslateRequest);
router.get("/all",verifyToken,verifyRole('admin'),translateController.getAllTranslate);
module.exports = router;