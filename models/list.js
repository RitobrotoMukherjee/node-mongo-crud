const dbConnection = require('../mongodb');

const COLLECTION = 'products';

const data = async () => {
    const db = await dbConnection();
    const products = db.collection(COLLECTION);

    return products.find().toArray();
}

module.exports = data;
