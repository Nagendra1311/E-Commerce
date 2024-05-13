// import
const express = require('express');
const { register, login } = require('../../controllers/front/authentication.controller');

// router
const router = express.Router();

// register route
router.post('/register', register)

// login route
router.post('/login', login)

module.exports = router;