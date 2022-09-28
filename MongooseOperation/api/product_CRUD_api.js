const ProductModel = require('../models/products');
const { connection } = require('../../mongooseConnection');
const mongoose = require('mongoose');

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

    return new Promise((resolve, reject) => {
        ProductModel.find({ $or: [
            { 
                "name": { $regex: new RegExp(`.*${name}.*`, 'i') } ,
            },
            {
                "type": type
            }
        ]}, 'name type price quantity', (error, products) => {
            if(error) reject(error);
            resolve(products);
        });
    })
}

const addProduct = async (params) => {
    await connection();
    const data = new ProductModel({ ...params });
    const errors = data.validateSync();
    if(errors) return Promise.reject(errors);
    return Promise.resolve(data.save());
}

const updateProduct = async (id, data) => {
    await connection();
    const _id = mongoose.Types.ObjectId(id);
    return ProductModel.updateOne({ _id }, {
        $set: { ...data }
    }, { runValidators: true });
}

const deleteManyProducts = async (name) => {
    await connection();
    return ProductModel.deleteMany({ name });
}

const deleteById = async (id) => {
    await connection();
    const _id = mongoose.Types.ObjectId(id);
    return ProductModel.deleteOne({ _id });
}

module.exports = { getAllProducts, getProductWithSearch, addProduct, updateProduct, deleteManyProducts, deleteById };
