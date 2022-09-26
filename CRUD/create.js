const dbConnection = require('../mongodb');

const COLLECTION = 'products';

module.exports = async (data) => {
    const db = await dbConnection();
    const products = db.collection(COLLECTION);

    return products.insertOne(data);
}