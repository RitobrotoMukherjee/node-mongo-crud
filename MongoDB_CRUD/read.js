const dbConnection = require('../mongodb');

const COLLECTION = 'products';

const data = async (query) => {
    const db = await dbConnection();
    const products = db.collection(COLLECTION);
    const { name } = query;
    if(name) query.name = new RegExp(name, 'i');
    return products.find(query).toArray();
}

module.exports = data;
