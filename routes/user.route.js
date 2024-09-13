const express = require("express");
const User = require("../models/user.model");
const router = express.Router();
const { signUp, login} = require('../controllers/user.controller.js');

router.post('/signup', signUp);

router.post('/login', login);

module.exports = router;