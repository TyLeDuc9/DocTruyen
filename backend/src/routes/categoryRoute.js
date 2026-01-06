const express = require('express')
const router = express.Router()
const categoryController = require('../controllers/categoryController')
router.post('/create', categoryController.createCategory)
router.get('/all', categoryController.getAllCategory)
router.get('/:slug', categoryController.getCategoryBySlug)
router.put('/:id', categoryController.updateCategory)
module.exports = router