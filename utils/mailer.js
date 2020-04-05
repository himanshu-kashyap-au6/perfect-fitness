const dotenv = require('dotenv')
dotenv.config()
const nodemailer = require('nodemailer')
const {USER_EMAIL, USER_PASSWORD, NODE_ENV} = process.env
const transport = {
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    debug: NODE_ENV === 'developement',
    auth: {
        user: USER_EMAIL,
        pass: USER_PASSWORD
    }
}
const mailTranport =nodemailer.createTransport(transport)

// mailTranport.verify().then((res)=>{console.log(res)}).catch((err)=>{console.log(err)})

const sendMailToUser = async (mode, email, token) => {
    const domainName = process.env.DOMAIN_NAME || `http://localhost:1234`;
    let html = null;
    if (mode === "confirm")
      html = `<h1>Welcome to Perfect-fitness</h1>
      <p>Thanks for creating an account. Click 
      <a href=${domainName}/confirm/${token}>here</a> to confirm your account. 
      Or copy paste ${domainName}/confirm/${token} to your browser.</p>`
    else if (mode === "reset")
      html = `<h1>Hi there.</h1>
      <p>You have recently requested for a change in password please copy paste ${domainName}/reset/${token} to your browser and create you new Password.
      If you didnt initiate the request. Kindly ignore. Thanksyou</p>`
    else if (mode === "adminReset")
      html = `<h1>Hi there.</h1>
      <p>You have recently requested for a change in password please copy paste ${domainName}/reset/${token} to your browser and create you new Password.
      If you didnt initiate the request. Kindly ignore. Thanksyou</p>`
    else if (mode.mode === "trainerConfirm")
      html = `<h1>Welcome to Perfect-fitness</h1>
      <h2>Congratulation you are selected as trainer in Perfect-fitness</h2>.
      <h3>Your official email is: ${mode.email}</h3>
      <h3>And password is: ${mode.password}</h3>
      <p> Click <a href=${domainName}/confirm/${token}>here</a> to confirm your account. 
      Or copy paste ${domainName}/confirm/${token} to your browser.</p>`
    else if (mode === "trainerReset")
      html = `<h1>Hi there.</h1>
      <p>You have recently requested for a change in password please copy paste ${domainName}/reset/${token} to your browser and create you new Password.
      If you didnt initiate the request. Kindly ignore. Thanksyou</p>`
    else if (mode === "Workout")
      html = `<h1>Hi there.</h1>
      <h2>Please download your selected workout from here: ${token}</h2>
       <p>Thanksyou</p>`
    else if (mode === "dietplan")
      html = `<h1>Hi there.</h1>
      <h2>Please download your selected dietPlan from here: ${token}</h2>
      <p>Thanksyou</p>`   
    else if (mode === "order")
      html = `<h1>Hi there.</h1>
      <h2>Your order has been successfully placed your transaction id is: ${token}</h2>
      <h3>Thanksyou</h3>`   

     function message(mode){
        let msg = null
        if (mode === 'reset') msg = "Reset your password"
        if (mode === 'trainerReset') msg = "Reset your password"
        if (mode === 'confirm') msg = "Confirm your email"
        if (mode.mode === 'trainerConfirm') msg = "Confirm your email"
        if (mode === 'Workout') msg = "Pefrect-fitness Workout"
        if (mode === 'dietplan') msg = "Perfect-fitness DietPlan"
        if (mode === 'order') msg = "Perfect-fitness orderConfirmation"
        return msg
      }
      try {
      await mailTranport.sendMail({
        from: USER_EMAIL,
        to: email,
        subject: message(mode),
        html
      })
    } catch (err) {
      res.status(400).json({ statusCode: 400, message: 'Server Error' })
    }
}

module.exports = sendMailToUser