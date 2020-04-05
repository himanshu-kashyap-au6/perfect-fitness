const sendMailToUser = require('./mailer')
const { hash } = require('bcryptjs')
const { sign } = require('jsonwebtoken')
module.exports = { 
  hasingPassword : async function(next){
    const pfit = this
    try{
        if(pfit.isModified('password')){
            const hp = await hash(pfit.password, 10)
            pfit.password = hp
            next()
        }
    }catch(err){
        next(err)
    }
  },
  async confirmationToken(mode){
    const commenUser = this
    const accessToken = await sign({id: commenUser._id}, process.env.JWT_SECRET_KEY, {expiresIn: '12h'})
    if (mode === "confirm") {
        commenUser.confirmToken = accessToken
        await sendMailToUser(mode, commenUser.email, accessToken)
    }else if (mode === "reset") {
        commenUser.resetToken = accessToken
        await sendMailToUser(mode, commenUser.email, accessToken)
    }else if (mode.mode === "trainerConfirm") {
        commenUser.confirmToken = accessToken
        await sendMailToUser(mode, commenUser.perEmail, accessToken)
    }
    else if (mode === "trainerReset") {
        commenUser.resetToken = accessToken
        await sendMailToUser(mode, commenUser.perEmail, accessToken)
    }
    else{
        commenUser.accessToken = accessToken 
    }
    await commenUser.save()
    return accessToken
    }
}
