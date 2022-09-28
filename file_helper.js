const path = require('path');
const fs = require('fs');

const getOrCreatePath = (inpath) => {
    const pathArray = inpath.split('/');
    const publicPath = path.resolve(__dirname, 'public');

    if (!fs.existsSync(publicPath)) {
        fs.mkdirSync(publicPath);
    }
    let currPath = publicPath;
    for (let i = 0; i < pathArray.length; i++) {
        if (pathArray[i] !== '') {
            fs.access(`${currPath}/${pathArray[i]}`, (err) => {
                (err && fs.mkdirSync(`${currPath}/${pathArray[i]}`));
                currPath += `/${pathArray[i]}`;
            });
        }
    }
}

module.exports = { getOrCreatePath }
