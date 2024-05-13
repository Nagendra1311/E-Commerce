// import
const express = require('express');
const { getCart, addCart, updateCart, destroyCart, placeOrder, stripePay } = require('../../controllers/front/cart.controller');
const { authorization } = require('../../middleware/authorization.middleware');

// router
const router = express.Router();

router.use(authorization)


// getCart route
router.post('/', getCart)

// addCart route
router.post('/add/:id', addCart)

// updateCart route
router.post('/update/:id', updateCart)

// delete route
router.post('/destroy/:id', destroyCart)


// place order 
router.post('/place-order/:cartId', placeOrder);


// payment
router.post('/stripe-pay', stripePay);

module.exports = router;