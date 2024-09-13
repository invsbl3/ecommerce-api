const express = require('express');
const router = express.Router();
const {storageUpload, uploadImage} = require('../controllers/image.controller.js');


router.post("/", storageUpload, uploadImage);

module.exports = router;