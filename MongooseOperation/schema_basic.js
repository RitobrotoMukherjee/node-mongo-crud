const mongoose = require('mongoose');
const { connection } = require('../mongooseConnection');

const { Schema, model } = mongoose;

const ProductSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    price: {
        type: Number,
        required: true,
    },
    type: {
        type: String,
        required: true,
        match: /^[a-z ]+$/g
    }
});

const ProductModel = model('products', ProductSchema);

// Select few
const FindWithQuery = () => {
    ProductModel.find({ name: /^item.*\d+$/i }, 'name price type', (err, data) => {
        console.log(`\n\nSelect Only whose name starts with item and ends with a number\n`);
        if (err) return console.warn("Error: ", err);
        data.forEach((product) => {
            console.log("%s: price: %d is of type: %s", product.name, product.price, product.type);
        });
        return data;
    });
}

(async () => {
    await connection();

    // Select ALL
    ProductModel.find({}, 'name price type', (err, data) => {
        console.log(`Select All:\n`);
        if (err) return console.warn("Error: ", err);
        data.forEach((product) => {
            console.log("%s: price: %d is of type: %s", product.name, product.price, product.type);
        });
        return data;
    });

    FindWithQuery();

    // Create Data
    const data = [
        {
            name: "Item test 6",
            price: 7000,
            type: "test again 7"
        },
        {
            name: "Item test 7",
            price: 6000,
            type: "Test Again"
        }
    ];

    ProductModel.create(data).then(res => {
        console.log(`\nResponse: ${res}\n`);
        FindWithQuery();
    }, err => console.warn(`\n\n Error: ${err}`));
})();
