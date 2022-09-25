const { app } = require('./server');
const list = require('./models/list');

app.get('/', async (req, resp) => {
    resp.setHeader('Content-Type', 'application/json');
    const { query } = req;
    try {
        const data = await list(query);
        resp.send(data);
    } catch(error) {
        resp.send({ error })
    }
});

module.exports = app;