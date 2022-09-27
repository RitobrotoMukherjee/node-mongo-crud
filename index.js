const app = require('./routes/routes');

app.listen(3030, () => {
    console.log(`Server started for MongoDB: http://localhost:3030`);
});