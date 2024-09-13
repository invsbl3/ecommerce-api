const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require('cors');

//ROUTES
const productRoute = require('./routes/product.route.js');
const userRoute = require('./routes/user.route.js');
const cartRoute = require('./routes/cart.route.js');
const productImages = require('./routes/image.route.js');
//MODELS
const Product = require("./models/product.model.js");
const User = require("./models/user.model.js");

// MIDDLEWARE
app.use(express.json());
app.use('*', cors());

// ROUTES
app.use("/api/product", productRoute);
app.use("/api/user", userRoute);
app.use("/api/cart", cartRoute);
app.use("/api/product-images", productImages);
app.use('/upload/images/', express.static('./upload/images'));

// EXPRESS MAIN ENDPOINT TEST
app.get("/", (req, res) => {
    res.send("Express App is Running")
})

// GETTING PROTECTED DATA
require("dotenv").config();
user = process.env.MONGODB_USER;
password = process.env.MONGODB_PASSWORD;
port = process.env.PORT;

// DB CONNECTION
mongoose
    .connect("mongodb+srv://" + user + ":" + password + "@cluster0.alvkt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
    .then(() => {
        console.log("Connected to database!");
        app.listen(port, () => {
            console.log("Server is running on port ", port);
        });
    })
    .catch(() => {
        console.log("Connection failed!");
    });