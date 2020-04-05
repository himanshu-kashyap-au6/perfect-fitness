const multer = require('multer')
var multerConfig1 = multer({ storage: multer.memoryStorage() })
var upload = multer(multerConfig1)
module.exports = upload