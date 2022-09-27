const { app, express } = require('../server');
const { getAllProducts, getProductWithSearch } = require('../MongooseOperation/api/product_CRUD_api');

app.use(express.json());

app.get('/', (_, resp) => {
    resp.setHeader('Content-Type', 'application/json');
    getAllProducts().then((products) => {
        resp.status(200).send(products);
    },(err) => resp.status(500).send(err));
});

app.get('/search', async (req, resp) => {
    resp.setHeader('Content-Type', 'application/json');
    const { query } = req;
    try {
        const products = await getProductWithSearch(query);
        resp.send(products);
    } catch(e) {
        resp.status(500).send(e);
    }
})

module.exports = app;