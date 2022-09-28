const { app, express } = require('../server');
const  { getOrCreatePath } = require('./file_helper');

app.use(express.json());

app.post('/upload-file', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    
});

app.put('/:name', async (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    
});

app.delete('/:id', async (req, resp) => {
    resp.setHeader('Content-Type', 'application/json');
    
});


module.exports = app;