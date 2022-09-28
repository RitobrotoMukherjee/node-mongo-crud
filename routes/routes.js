const { app, express } = require('../server');
const  { getOrCreatePath } = require('../file_helper');
const path = require('path');
const multer = require('multer');
const fs = require('fs');

const uploadPath = 'public/uploads';
getOrCreatePath(uploadPath, '/');

app.use(express.json());

const storage = multer.diskStorage({
    destination: function(_, file, cb) {
        const filePath = `${uploadPath}/${file.fieldname}`;
        const resPath = path.resolve(__dirname,filePath);
        if(!fs.existsSync(resPath)) {
            getOrCreatePath(filePath, '/');
        }
        cb(null, filePath);
    },
    filename: function(_, file, cb) {
        const FileName = `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`;
        cb(null, FileName)
    }
})

const uploadOneMiddleWare = multer({ storage }).single('projects');

app.post('/upload-file', uploadOneMiddleWare, (_, res) => {
    res.send('File Uploaded');
});

module.exports = app;