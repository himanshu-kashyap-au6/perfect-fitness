const DataUri = require('datauri')
const path = require('path')
const dataURIChild = new DataUri()

module.exports = function(originalFileName, buffer){
    const extension = path.extname(originalFileName)
    return dataURIChild.format(extension, buffer).content
}