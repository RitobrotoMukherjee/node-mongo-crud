const { app, express } = require('../server');
const { getAllProducts, getProductWithSearch, addProduct, updateProduct, deleteManyProducts, deleteById }
    = require('../MongooseOperation/api/product_CRUD_api');

app.use(express.json());



module.exports = app;