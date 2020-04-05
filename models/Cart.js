const mongoose = require('mongoose')
const Schema = mongoose.Schema
const cartSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "users",
        required: true
    },
    productId: {
        type: Schema.Types.ObjectId,
        ref: "product",
        required: true
    },
    quantity: {
        type: Number,
        default: 1
    },
    orderTotal:{
        type: Number
    }
},
{timestamps: true})


const Cart = mongoose.model('cart', cartSchema)
module.exports = Cart