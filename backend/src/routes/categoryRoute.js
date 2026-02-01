const express = require('express')
const router = express.Router()
const categoryController = require('../controllers/categoryController')
const { verifyToken, verifyRole } = require("../middlewares/authMiddleware");
router.post('/create', categoryController.createCategory)
router.get('/all', categoryController.getAllCategory)
router.get('/all-admin', verifyToken, verifyRole("admin"), categoryController.getAllCategoryAdmin)
router.put('/:slug', categoryController.updateCategory)
router.delete('/soft/:id', verifyToken, verifyRole("admin", "author"), categoryController.softDeleteCategory)
router.patch('/restore/:id', verifyToken, verifyRole("admin"), categoryController.restoreCategory)
router.delete('/force/:id', verifyToken, verifyRole("admin"), categoryController.forceDeleteCategory)
router.get('/:slug', categoryController.getCategoryBySlug)

module.exports = router;
