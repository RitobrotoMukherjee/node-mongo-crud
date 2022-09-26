const { MongoClient } = require('mongodb');

const URL = 'mongodb://localhost:27017'
const client = new MongoClient(URL);

const DB = 'e-comm';

const dbConnection = async () => {
    const connection = await client.connect();
    console.log(`Server connection established to: ${URL}`);
    return connection.db(DB);
}

module.exports = dbConnection;
