const { app } = require('./server');
const list = require('./models/list');

app.get('/', async (_, resp) => {
    resp.setHeader('Content-Type', 'application/json');
    try {
        const data = await list();
        resp.send(data);
    } catch(error) {
        resp.send({ error })
    }
});

module.exports = app;