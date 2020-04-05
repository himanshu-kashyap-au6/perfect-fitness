const mongoose = require('mongoose')
const Schema = mongoose.Schema
const orderSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "users",
        required: true
    },
    productId: {
        type: Schema.Types.ObjectId,
        ref: "products",
        required: true
    },
    order_value: {
        type: String,
        required: true
    },
    razorpay_order_id: {
        type: String,
        require: true
    },
    razorpay_payment_id: {
        type: String,
        default: null
    },
    razorpay_signature: {
        type: String,
        default: null
    },
    isPending: {
        type: Boolean,
        default: true
    },
    txnId: {
        type: String,
        required: true
    }
},
{timestamps: true})


const Order = mongoose.model('order', orderSchema)
module.exports = Order