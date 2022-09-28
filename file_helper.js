const path = require('path');
const fs = require('fs');

const getOrCreatePath = (inpath, sp) => {
    const pathArray = inpath.split(sp);
    const publicPath = path.resolve(__dirname, '');

    let currPath = publicPath;
    for (let i = 0; i < pathArray.length; i++) {
        if (pathArray[i] !== '') {
            if(!fs.existsSync(`${currPath}/${pathArray[i]}`)) {
                fs.mkdirSync(`${currPath}/${pathArray[i]}`)
            }
            currPath += `/${pathArray[i]}`;
        }
    }
}

module.exports = { getOrCreatePath }
