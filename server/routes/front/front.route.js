// import
const express = require('express')
const authenticationRoutes = require('./authentication.route');
const cartRoutes = require('./cart.route')
// router
const router = express.Router();

router.use('/', authenticationRoutes)
router.use('/cart', cartRoutes)

module.exports = router;