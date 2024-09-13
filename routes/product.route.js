const express = require("express");
const mongoose = require('mongoose');
const Product = require("../models/product.model.js");
const router = express.Router();
const { addProduct, removeProduct, allProducts, newCollections, popularInWomen } = require('../controllers/product.controller.js');

const multer = require('multer');

const FILE_TYPE_MAP = {
    'image/png': 'png',
    'image/jpeg': 'jpeg',
    'image/jpg': 'jpg'
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {

        const isValid = FILE_TYPE_MAP[file.mimetype];
        let uploadError = new Error('invalid image type');

        if (isValid) {
            uploadError = null
        }
        cb(uploadError, 'upload/images')
    },
    filename: function (req, file, cb) {
        const fileName = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const extension = FILE_TYPE_MAP[file.mimetype];
        cb(null, `${fileName}-${Date.now()}.${extension}`)
    }
})

const uploadOptions = multer({ storage: storage })


const newProduct = async (req, res) => {
    //const category = await Category.findById(req.body.category);
    //if (!category) { return res.status(400).send('Invalid Category'); }
    if (!req.body) {
        return res.status(500).send('empty body ');
    }
    const productExist = await Product.findOne({ name: req.body.name });
    if (productExist) {
        return res.status(409).send('Product already registered!');
    }

    const file = req.file;
    if (!file) return res.status(400).send('No image in the request')
    const fileName = file.filename

    //const basePath = `${req.protocol}://${req.get('host')}/upload/images/`;
    const basePath = `upload/images/`;
    
    console.log(req.body);
    console.log(basePath, req.body.name);

    console.log('newproduct');
    let newProduct = new Product({
        name: req.body.name,
        category: req.body.category,
        new_price: req.body.new_price,
        old_price: req.body.old_price,
        image: `${basePath}${fileName}`  // "upload/image-2323232"
    })

    product = await newProduct.save();

    if (!product)
        return res.status(500).send('The product could not be created. Try again.')

    res.send(product);
}

router.post('/register', uploadOptions.single('file'), newProduct);





const deleteProduct = async (req, res) => {
    const deleted = await Product.findByIdAndDelete(req.body.id);
    if (deleted) {
        return res.status(200).json({ success: true, message: 'the product was deleted!' })
    } else {
        return res.status(404).json({ success: false, message: "product not found!" })
    }
    return res.status(500).json({ success: false, error: err })
};





router.post('/addproduct', addProduct);

router.delete('/removeproduct', deleteProduct);

router.get('/allproducts', allProducts);

// PRODUCT SECTIONS
router.get('/newcollections', newCollections);

router.get('/popularinwomen', popularInWomen);

const baseUrl = 'https://ecommerce-api-ebon-five.vercel.app/';

const getById = async (req, res) => {
    if (!mongoose.isValidObjectId(req.params.id)) {
        return res.status(400).send('Invalid Product Id')
    }
    const product = await Product.findById(req.params.id);
    if (!product) {
        return res.status(500).send({ success: false });
    }
    product.image = baseUrl + product.image;
    res.status(200).send(product);
}

const popularInCategory = async (req, res) => {
    let products = await Product.find({ category: req.params.cat });
    let popular_in= products;
    console.log("Popular in ",req.params.cat, " fetched");
    res.send(popular_in);
}

router.get('/popularin/:cat', popularInCategory);


router.get('/:id', getById);

module.exports = router;