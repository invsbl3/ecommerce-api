const Product = require("../models/product.model");

const addProduct = async (req, res) => {

    const product = new Product({
        name: req.body.name,
        image: req.body.image,
        category: req.body.category,
        new_price: req.body.new_price,
        old_price: req.body.old_price,
    });
    await product.save();
    console.log('Saved');
    res.json({
        success: true,
        name: req.body.name,
    })
};

const removeProduct = async (req, res) => {
    await Product.findOneAndDelete({ id: req.body.id });
    console.log("Removed");
    res.json({
        success: true,
        name: req.body.name
    })
}

const baseUrl = 'https://ecommerce-api-ebon-five.vercel.app/';
const allProducts = async (req, res) => {
    let products = await Product.find({});
    console.log("All Products Fetched");
    for (i=0;i<products.length;i++){
        products[i].image = baseUrl + products[i].image;
    }
    res.send(products);
}

// PRODUCT SECTIONS
const newCollections = async (req, res) => {
    let products = await Product.find({});
    let newcollections = products;
    console.log("NewCollection Fetched");
    res.send(newcollections);
}
const popularInWomen = async (req, res) => {
    let products = await Product.find({ category: "women" });
    let popular_in_women = products;
    console.log("Popular in women fetched");
    res.send(popular_in_women);
}



module.exports = {
    addProduct,
    removeProduct,
    allProducts,
    newCollections,
    popularInWomen
};