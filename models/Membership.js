const mongoose = require('mongoose')
const Schema = mongoose.Schema
const membershipSchema = new Schema({
    price:{
        type: Number,
        require: true
    },
    duration: {
        type: String,
        required: true
    },
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
    },
    gymId: {
        type: Schema.Types.ObjectId,
        ref: 'admin',
        required: true
    },
},
{timestamps: true})


const Membership = mongoose.model('membership', membershipSchema)
module.exports = Membership