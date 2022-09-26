const dbConnect = require('../mongodb');

const COLLECTION = 'products';

module.exports = async (data, many = false) => {
    const db = await dbConnect();
    const update = db.collection(COLLECTION);
    const { name } = data;
    if(many) {
        return update.updateMany( 
            { name }, 
            { $set: { ...data } }
        );
    }

    return update.updateOne(
        { name },
        { $set: { ...data } }
    );
}