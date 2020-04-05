const mongoose = require('mongoose')
const Schema = mongoose.Schema
const { compare }= require('bcryptjs')
const { hasingPassword, confirmationToken } = require('../utils/schemaRelated')
const trainerSchema = new Schema({
    adminId: {
        type: Schema.Types.ObjectId,
        ref: "admin",
        required: true
    },
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
    confirmToken:{
        type: String,
        trim: true
    },
    resetToken:{
        type: String,
        trim: true
    },
    isConfirm:{
        type: Boolean,
        default: false,
    },
    role:{
        type: String,
        default: 'Trainer',
        require: true
    },
    price:{
        type: Number,
        required: true
    }
},
{timestamps: true})

trainerSchema.pre('save', hasingPassword)
trainerSchema.methods.generateToken = confirmationToken
trainerSchema.statics.findByEmailAndPassword = async (email, password)=>{
    try{
        const trainer = await Trainer.findOne({email: email})
        if(!trainer) throw new Error('Invalid Credentials')
        const isMatched = await compare(password, trainer.password)
        if(!isMatched) throw new Error('Invalid Credentials')
        return trainer
    }catch(err){
        err.name = 'authError'
        throw err
    }
}

trainerSchema.methods.toJSON = function(){
    const trainer = this.toObject()
    delete trainer.password
    delete trainer.accessToken
    delete trainer.__v
    return trainer
}


const Trainer = mongoose.model('trainer', trainerSchema)
module.exports = Trainer