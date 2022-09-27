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
        validate: {
            validator: function(v) {
                return /^[a-z ]+$/g.test(v);
            },
            message: props => `${props.value} Only string and space is allowed`
        }
    },
    quantity: {
        type: Number,
        required: [true, "Quantity is required"],
        validate: {
            validator: function(v) {
                return /\d+/g.test(v);
            },
            message: props => `${props.value} is not a valid quantity!`
        }
    }
});

const ProductModel = model('products', ProductSchema);

module.exports = ProductModel;
