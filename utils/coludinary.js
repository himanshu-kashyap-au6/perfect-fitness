const coludinary = require('cloudinary').v2
const { COLUDINARY_CLOUD_NAME, COLUDINARY_API_KEY, COLUDINARY_API_SECRET } = process.env
coludinary.config({
    cloud_name: COLUDINARY_CLOUD_NAME,
    api_key: COLUDINARY_API_KEY,
    api_secret: COLUDINARY_API_SECRET
})

module.exports = coludinary