const mongoose = require('mongoose');

const URL = 'mongodb://localhost:27017';

const DB = 'e-comm';

const connection = async () => {
    return mongoose.connect(`${URL}/${DB}`);
}

module.exports = { connection, DB, URL };
