const Razorpay = require('razorpay')

const { RAZORPAY_APT_KEY, RAZORPAY_APT_SECRET } = process.env
const instance = new Razorpay ({
    key_id: RAZORPAY_APT_KEY,
    key_secret: RAZORPAY_APT_SECRET
})

module.exports = instance