const dbConnection = require('../mongodb');
const MongoDB = require('mongodb');

const COLLECTION = 'products';

const deleteO = async (id) => {
    const db = await dbConnection();
    const collection = db.collection(COLLECTION);
    return collection.deleteOne( { _id: new MongoDB.ObjectId(id) } );
}

const deleteM = async (name) => {
    const db = await dbConnection();
    const collection = db.collection(COLLECTION);
    return collection.deleteMany( { name } );
}

module.exports = { deleteO, deleteM };