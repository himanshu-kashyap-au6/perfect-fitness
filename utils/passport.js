const passport = require('passport')
const {Strategy: localStrategy} = require('passport-local')
const {Strategy: JWTStrategy, ExtractJwt} = require('passport-jwt')
const {Strategy: GoogleStrategy} = require('passport-google-oauth20')
const {Strategy: FacebookStrategy} = require('passport-facebook')
const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, FACEBOOK_CLIENT_ID, FACEBOOK_CLIENT_SECRET } = process.env
const User = require('../models/Users')
const Admin = require('../models/Admin')
const Trainer = require('../models/Trainer')
// passport-local Strategy for user-login 
passport.use(
    new localStrategy({
        usernameField: 'email',
        passwordField: 'password'
    }, 
    async (email, password, done)=>{
        try{
            let data = null
            if(email){
                const admin = await Admin.findOne({email})
                const user = await User.findOne({email})
                const trainer = await Trainer.findOne({email})
                if (admin) {
                    const admin = await Admin.findByEmailAndPassword(email, password)
                    if(!admin.isConfirm) return done(null, false, {message: 'Invalid Credentials'}) 
                    else data = admin
                }
                if (user) {
                    const user = await User.findByEmailAndPassword(email, password)
                    if(!user.isConfirm) return done(null, false, {message: 'Invalid Credentials'})
                    else data = user
                }
                if (trainer) {
                    const trainer = await Trainer.findByEmailAndPassword(email, password)
                    if(!trainer.isConfirm) return done(null, false, {message: 'Invalid Credentials'})
                    else data = trainer
                }
            }
            return done(null, data)
        }catch(err){
            if(err.name === 'authError') done(null, false, {message: err.message})
            done(err)
        }
    })
)

// passport-jwt Strategy for protective routes
const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromExtractors([
        ExtractJwt.fromAuthHeaderWithScheme('JWT'),
        // req=>req.cookies.accessToken
    ]), 
    secretOrKey: process.env.JWT_SECRET_KEY
}
passport.use(new JWTStrategy(jwtOptions, async ({id}, done)=>{
    try{
        let data = null
        if(id){
            const admin = await Admin.findOne({_id: id})
            const user = await User.findOne({_id: id})
            const trainer = await Trainer.findOne({_id: id})
            if (admin) {
                const admin = await Admin.findById(id)
                if(!admin) return done(null, false, {message: 'Invalid Credentials'})
                else data = admin
            }
            if (user) {
                const user = await User.findById(id)
                if(!user) return done(null, false, {message: 'Invalid Credentials'})
                else data = user
            }
            if (trainer) {
                const trainer = await Trainer.findById(id)
                if(!trainer) return done(null, false, {message: 'Invalid Credentials'})
                else data = trainer
            }
        }
        done(null, data)
    }catch(err){
        if(err.name === 'Error'){
            done(err)
        }
    }
})
)

// passport-google Strategy for login/register
const googleOptions = {
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: `http://localhost:1234/google/redirect`
}
passport.use(new GoogleStrategy(googleOptions, async(_, __, googleProfile, done)=>{
    try{
        const { _json: {email, name} } = googleProfile
        let user = await User.findOne({email})
        if(!user)
            user = await User.create({email, name, isThirdParty: true})
        return done(null, user)
    }catch(err){
        if(err.name === 'Error')
        return done(err)
    }
}))

// passport-facebook Strategy for login/register
const facebookOptions = {
    clientID: FACEBOOK_CLIENT_ID,
    clientSecret: FACEBOOK_CLIENT_SECRET,
    callbackURL: `http://localhost:1234/facebook/redirect`,
    profileFields: [ 'id', 'emails', 'name' ]
}
passport.use(new FacebookStrategy(facebookOptions, async(_, __, facebookProfile, done)=>{
    try{
        const { _json: {email, first_name, last_name} } = facebookProfile
        let user = await User.findOne({email})
        if(!user)
            user = await User.create({email, name: `${first_name} ${last_name}`, isThirdParty: true})
        return done(null, user)
    }catch(err){
        if(err.name === 'Error')
        return done(err)
    }
}))