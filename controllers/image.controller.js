const multer = require('multer');
const express = require('express');


const storageUpload = (req, file, cb) => {
    console.log('in storageupl');
    const storage = multer.diskStorage({
        destination: './upload/images',
        filename: (req, file, cb) => {
            return cb(null, `${file.fieldname}_${Date.now()}_${path.extname(file.originalname)}`)
        }
    });
    const upload = multer({ storage: storage });
    upload.single('image');
    console.log('final upl');
};

const uploadImage = (req, res) => {
    console.log('in backend uploading');
    //const basePath = `${req.protocol}://${req.get('host')}/upload/images/`;
    const basePath = `/upload/images/`;
    
    
    res.json({
        success: 1,
        image_url: `${basePath}${fileName}`
    })
};

module.exports = {
    storageUpload,
    uploadImage
};