const path = require('path')

function injectDate(fileName){
    const extname = path.extname(fileName)
    const newFileName = fileName.replace(extname, '') + "-" + Date.now() + extname
    return newFileName
}

module.exports = injectDate