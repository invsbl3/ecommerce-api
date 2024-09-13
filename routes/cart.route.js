const express = require("express");
const User = require("../models/user.model.js");
const router = express.Router();
const {fetchUser, addToCart, removeFromCart, getCart} = require('../controllers/cart.controller.js');

router.post('/addtocart', fetchUser, addToCart);

router.post('/removefromcart', fetchUser, removeFromCart);

router.post('/getcart', fetchUser, getCart);

module.exports = router;