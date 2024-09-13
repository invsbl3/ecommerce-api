const User = require("../models/user.model");
const jwt = require("jsonwebtoken");

// middleware to fetch user
const fetchUser = async (req, res, next) => {
    const token = req.header('auth-token');
    if (!token) {
        res.status(401).send({ errors: "Please login again" })
    } else {
        try {
            const data = jwt.verify(token, 'secret_ecom');
            req.user = data.user;
            next();

        } catch (error) {
            res.status(401).send({ errors: "Please login again" })
        }
    }
};

const addToCart = async (req, res) => {
    console.log("added ", req.body.itemId);
    let userData = await User.findOne({ _id: req.user.id });
    console.log(userData);
    if(!userData.cartData){
        userData.cartData={};
    }
    if(!userData.cartData[req.body.itemId]){
        userData.cartData[req.body.itemId] = 0;
    }
    userData.cartData[req.body.itemId] += 1;
    await User.findOneAndUpdate({ _id: req.user.id }, { cartData: userData.cartData });
    res.status(200).send(userData.cartData);
};

const removeFromCart = async (req, res) => {
    console.log("removed ", req.body.itemId);
    let userData = await User.findOne({ _id: req.user.id });
    if (userData.cartData[req.body.itemId] > 0) {
        userData.cartData[req.body.itemId] -= 1;
        await User.findOneAndUpdate({ _id: req.user.id }, { cartData: userData.cartData });
        res.status(200).send("Removed product to cart")
    }
};

const getCart = async (req, res) => {
    console.log(req)
    let userData = await User.findOne({ id: req.user.id });
    if (userData) {
        return res.json(userData.cartData);
    }
    res.status(500);
};

module.exports = {
    fetchUser,
    addToCart,
    removeFromCart,
    getCart
};