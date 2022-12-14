const { app, express } = require('../server');
const read = require('../MongoDB_CRUD/read');
const create = require('../MongoDB_CRUD/create');
const UPDATE = require('../MongoDB_CRUD/update');
const { deleteO, deleteM } = require('../MongoDB_CRUD/delete');

app.use(express.json());

app.get('/', async (req, resp) => {
    resp.setHeader('Content-Type', 'application/json');
    const { query } = req;
    try {
        const data = await read(query);
        resp.status(200).send(data);
    } catch(error) {
        resp.status(400).send({ error })
    }
});

app.post('/', (req, res) => {
    res.setHeader('Content-Type', 'application/text');
    create(req.body)
    .then((resp) => {
        const { acknowledged, insertedId } = resp;
        if(acknowledged) res.status(200).send(`Data saved with id: ${insertedId}`);
        else res.status(403).send("Cannot save data")
    }).catch((error) => res.status(400).send(error))
});

app.put('/:name', async (req, res) => {
    res.setHeader('Content-Type', 'application/text');
    const { name } = req.params;
    const { acknowledged, modifiedCount } = await UPDATE( req.body, name );
    if(acknowledged && modifiedCount) res.status(200).send('Data Updated');
    else if(acknowledged && !modifiedCount) res.status(200).send('No data has been Updated');
    else res.status(400).send('Error');
});

app.delete('/:id', async (req, resp) => {
    resp.setHeader('Content-Type', 'application/text');
    const { id } = req.params;
    const { acknowledged, deletedCount } = await deleteO(id)
    if(acknowledged && deletedCount) resp.status(200).send('Data Deleted');
    else if(acknowledged && !deletedCount) resp.status(200).send('0 data has been Deleted');
    else resp.status(400).send('Error');
});

app.delete('/many/:name', async (req, resp) => {
    resp.setHeader('Content-Type', 'application/text');
    const { name } = req.params;
    const { acknowledged, deletedCount } = await deleteM(name)
    if(acknowledged && deletedCount) resp.status(200).send(`${deletedCount} Data Deleted`);
    else if(acknowledged && !deletedCount) resp.status(200).send('0 data has been Deleted');
    else resp.status(400).send('Error');
});

module.exports = app;