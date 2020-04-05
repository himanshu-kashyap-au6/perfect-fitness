const mongoose = require('mongoose')
const { compare } = require('bcryptjs')
const Schema = mongoose.Schema
const { hasingPassword, confirmationToken } = require('../utils/schemaRelated')
const userSchema = new Schema({
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
    password:{
        type: String,
        required: function(){
            return !this.isThirdParty
        },
        trim: true
    },
    isThirdParty: {
        type: Boolean,
        default: false,
        required: true
    },
    accessToken:{
        type: String,
        trim: true
    },
    isConfirm:{
        type: Boolean,
        default: false,
    },
    confirmToken:{
        type: String,
        trim: true
    },
    resetToken:{
        type: String,
        trim: true
    },
    role: {
        type: String,
        default: 'User'
    },
    personalTrainer: {
        type: Schema.Types.ObjectId,
        ref: 'Trainer'
    },
    memberShip: {
        type: Schema.Types.ObjectId,
        ref: 'Membership'
    }
},
{timestamps: true})

userSchema.pre('save', hasingPassword)
// function to create a auth
userSchema.methods.generateToken = confirmationToken
userSchema.statics.findByEmailAndPassword = async (email, password)=>{
    try{
        const user = await User.findOne({email: email})
        if(!user) throw new Error('Invalid Credentials')
        const isMatched = await compare(password, user.password)
        if(!isMatched) throw new Error('Invalid Credentials')
        return user
    }catch(err){
        err.name = 'authError'
        throw err
    }
}

// function to removing some confidential information of user while sending the response at client side
// although this will be present in db
userSchema.methods.toJSON = function(){
    const user = this.toObject()
    delete user.password
    delete user.accessToken
    delete user.__v
    return user
}

const User = mongoose.model('users', userSchema)
module.exports = User