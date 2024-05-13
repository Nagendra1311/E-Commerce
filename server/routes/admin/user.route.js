// import
const express = require('express');
const {
    getUsers,
    storeUser,
    updateUser,
    deleteUser
} = require('../../controllers/admin/user.controller');
const { upload } = require('../../middleware/uploadFile.middleware');

// router
const router = express.Router();

// get categories
router.get('/', getUsers)

// add category
router.post('/store', upload.single('image'), storeUser)

// update category
router.post('/update/:id', upload.single('image'), updateUser)

// delete category
router.delete('/destroy/:id', deleteUser)

module.exports = router;