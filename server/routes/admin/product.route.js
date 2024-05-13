// import
const express = require('express');

const {
    upload
} = require('../../middleware/uploadFile.middleware');
const { getProducts, storeProduct, updateProduct, deleteProduct } = require('../../controllers/admin/product.controller');

// router
const router = express.Router();

// get categories
router.get('/', getProducts)

// add category
router.post('/store', upload.single('image'), storeProduct)

// update category
router.post('/update/:id', upload.single('image'), updateProduct)

// delete category
router.delete('/destroy/:id', deleteProduct)

module.exports = router;