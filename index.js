const app = require('./routes/routes');
const { connection } = require('./connection');

app.listen(3030, async () => {
    try {
        await connection();
    } catch (err) {
        console.warn(`Connection Error: ${err}`);
    }
    console.log(`Server started for MongoDB: http://localhost:3030`);
});
