const mongoose = require('mongoose')
const Schema = mongoose.Schema

const reviewSchema = new Schema({
    userId: {
        type: String,
        required: true,
        trim: true
    },
    productId: {
        type: String,
        required: true,
        trim: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    review: {
        type: String,
        required: true,
        trim: true
    }
},
{timestamps: true})


const Review = mongoose.model('reviews', reviewSchema)
module.exports = Review