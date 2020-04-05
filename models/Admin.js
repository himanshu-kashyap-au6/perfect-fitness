const { compare } = require('bcryptjs')
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const { hasingPassword, confirmationToken } = require('../utils/schemaRelated')
// const { findByEmailAndPassword } = require('../faltu')
const adminSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    perEmail: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password:{
        type: String,
        required: true,
        trim: true
    },
    accessToken:{
        type: String,
        trim: true
    },
    resetToken:{
        type: String,
        trim: true
    },
    isConfirm:{
        type: Boolean,
        default: true,
    },
    role: {
        type: String,
        default: 'Admin',
        required: true
    }
},
{timestamps: true})

adminSchema.pre('save', hasingPassword)
adminSchema.methods.generateToken = confirmationToken
adminSchema.statics.findByEmailAndPassword = async (email, password)=>{
    try{
        const admin = await Admin.findOne({email: email})
        if(!admin) throw new Error('Invalid Credentials')
        const isMatched = await compare(password, admin.password)
        if(!isMatched) throw new Error('Invalid Credentials')
        return admin
    }catch(err){
        err.name = 'authError'
        throw err
    }
}

adminSchema.methods.toJSON = function(){
    const admin = this.toObject()
    delete admin.password
    delete admin.accessToken
    delete admin.__v
    return admin
}


const Admin = mongoose.model('admin', adminSchema)
module.exports = Admin