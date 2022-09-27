const app = require('./routes/routeMongoose');

app.listen(3030, () => {
    console.log(`Server started for Mongoose: http://localhost:3030`);
});