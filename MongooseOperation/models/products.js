const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const ProductSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        match: /^[a-z0-9 ]+$/i
    },
    price: {
        type: Number,
        required: true,
    },
    type: {
        type: String,
        required: true,
        match: /^[a-z ]+$/g
    },
    quantity: {
        type: Number,
        required: true,
        match: [/\d+/g, 'Only integers are allowed']
    }
});

const ProductModel = model('products', ProductSchema);

module.exports = ProductModel;
