const mongoose = require('mongoose')
const Schema = mongoose.Schema
const gymSchema = new Schema({
    country: {
        type: String,
        default: 'India',
        required: true,
        trim: true
    },
    city: {
        type: String,
        required: true,
        trim: true
    },
    state: {
        type: String,
        required: true,
        trim: true
    },
    address: {
        type: String,
        required: true,
        trim: true
    },
    contactNumber: {
        type: String,
        required: true
    },
    adminId: {
        type: Schema.Types.ObjectId,
        ref: 'admin',
        required: true
    },
    search: {
        type: String,
        required: true
    }
},
{timestamps: true})


const Gyms = mongoose.model('gyms', gymSchema)
module.exports = Gyms