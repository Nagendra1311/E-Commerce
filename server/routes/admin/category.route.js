// import
const express = require('express');
const {
    getCategories,
    storeCategory,
    updateCategory,
    deleteCategory
} = require('../../controllers/admin/category.controller');
const {
    upload
} = require('../../middleware/uploadFile.middleware');

// router
const router = express.Router();

// get categories
router.get('/', getCategories)

// add category
router.post('/store', upload.single('image'), storeCategory)

// update category
router.post('/update/:id', upload.single('image'), updateCategory)

// delete category
router.delete('/destroy/:id', deleteCategory)

module.exports = router;