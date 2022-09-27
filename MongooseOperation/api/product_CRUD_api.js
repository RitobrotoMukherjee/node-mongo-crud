const ProductModel = require('../models/products');
const { connection } = require('../../mongooseConnection');

const getAllProducts = async () => {
    await connection();
    return new Promise((resolve, reject) => {
        ProductModel.find({}, function(error, products) {
            if(error) reject(error);
            resolve(products);
        });
    });
}

const getProductWithSearch = async (params) => {
    await connection();
    const { name, type } = params;
    if(name) params.name = new RegExp(`.*${name}.*`, 'i');
    if(type) params.type = new RegExp(`.*${type}.*`, 'i');

    return new Promise((resolve, reject) => {
        ProductModel.find({ ...params }, 'name type price quantity', (error, products) => {
            if(error) reject(error);
            resolve(products);
        });
    })
}

const addProduct = async (params) => {
    await connection();
    const data = new ProductModel({ ...params });
    return data.save();
}

module.exports = { getAllProducts, getProductWithSearch, addProduct };
