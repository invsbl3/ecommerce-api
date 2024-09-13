const mongoose = require("mongoose");


const ProductSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            required: true,
        },
        category: {
            type: String,
            required: true,
        },
        new_price: {
            type: Number,
            required: true,
        },
        old_price: {
            type: Number,
            required: true,
        },
        date: {
            type: Date,
            default: Date.now,
        },
        available: {
            type: Boolean,
            default: true
        },
        description:{
            type: String,
            default: ""
        }
    }
);

ProductSchema.virtual('id').get(
    function() {
    return this._id;
});

ProductSchema.set('toJSON', {
    virtuals: true,
});

const Product = mongoose.model("Product", ProductSchema);


module.exports = Product;