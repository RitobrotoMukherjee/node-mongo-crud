const { app, express } = require('../server');
const { getAllProducts, getProductWithSearch, addProduct, updateProduct, deleteManyProducts, deleteById }
    = require('../MongooseOperation/api/product_CRUD_api');

app.use(express.json());

app.get('/', (_, resp) => {
    resp.setHeader('Content-Type', 'application/json');
    getAllProducts().then((products) => {
        resp.status(200).send(products);
    }, (err) => resp.status(500).send(err));
});

app.get('/search', async (req, resp) => {
    resp.setHeader('Content-Type', 'application/json');
    const { query } = req;
    try {
        const products = await getProductWithSearch(query);
        resp.send(products);
    } catch (e) {
        resp.status(500).send(e);
    }
});

app.post('/add', (req, resp) => {
    resp.setHeader('Content-Type', 'application/json');
    const params = req.body;
    addProduct(params).then((product) => {
        resp.setHeader('Content-Type', 'application/text');
        resp.send(`Successfully added ${product.name}`);
    }).catch(e => resp.status(500).send(e));
});

app.put('/update/:_id', (req, resp) => {
    resp.setHeader('Content-Type', 'application/json');
    const { _id } = req.params;
    const successObject = { success: true, message: "Data Updated" };
    updateProduct(_id, req.body)
    .then((data) => {
        const { acknowledged, modifiedCount, matchedCount } = data;
        if(acknowledged && modifiedCount) {
            resp.status(200).send({ ...successObject, message: `matched: ${matchedCount}, modified: ${modifiedCount}` });
        } else if(acknowledged && !modifiedCount) {
            resp.status(200).send({ ...successObject, message: `matched: ${matchedCount}, modified: ${modifiedCount}` });
        } else {
            resp.status(400).send({ error: true, message: "Unknown error"});
        }
        
    })
    .catch((err) => {
        resp.status(500).send({
            error: true, message: "Contact Team", details: err
        }); 
    });
});

app.delete('/delete/:name', (req, resp) => {
    resp.setHeader('Content-Type', 'application/text');
    const { name } = req.params;
    deleteManyProducts(name)
        .then(({ acknowledged, deletedCount }) => {
            if (acknowledged && deletedCount) {
                resp.send(`Deleted ${deletedCount} data with name ${name}`)
            } else if (acknowledged && !deletedCount) {
                resp.status(404).send(`No data found with with name: ${name}`)
            }
        })
        .catch(e => resp.status(500).send("Internal server error while deleting " + name));
});

app.delete('/delete-one/:id', async (req, resp) => {
    resp.setHeader('Content-Type', 'application/text');
    const { id } = req.params;

    try {
        const { acknowledged, deletedCount } = await deleteById(id);
        if (acknowledged && deletedCount) {
            resp.send(`Deleted data with ID ${id}`)
        } else if (acknowledged && !deletedCount) {
            resp.status(404).send(`No data found with with ID ${id}`)
        }
    }catch (e) {
        resp.status(500).send(`Server Error while deleting ${id}`);
    }
});

module.exports = app;