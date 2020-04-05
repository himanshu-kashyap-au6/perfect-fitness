const mongoose = require('mongoose')
const Schema = mongoose.Schema
const productSchema = new Schema({
    productName: {
        type: String,
        required: true,
        trim: true
    },
    brand: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true,
        trim: true
    },
    category: {
        type: String,
        required: true,
        trim: true
    },
    image:{
        type: String,
        required: true,
        trim: true
    },
    adminId: {
        type: Schema.Types.ObjectId,
        ref: "admin",
        required: true
    }
},
{timestamps: true})


const Product = mongoose.model('products', productSchema)
module.exports = Product