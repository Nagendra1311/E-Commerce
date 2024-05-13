// import
const express = require('express');
const { getOrders } = require('../../controllers/admin/order.controller');

// router
const router = express.Router();

// get categories
router.post('/', getOrders)

module.exports = router;