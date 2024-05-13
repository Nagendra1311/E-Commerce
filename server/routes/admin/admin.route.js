// import
const express = require('express')
const categoryRoute = require('./category.route')
const productRoute = require('./product.route')
const orderRoute = require('./order.route');
const userRoute = require('./user.route');
const { authorization } = require('../../middleware/authorization.middleware');

// router
const router = express.Router();

router.use(authorization)
router.use('/category', categoryRoute)
router.use('/product', productRoute)
router.use('/user', userRoute)
router.use('/order', orderRoute)

module.exports = router;