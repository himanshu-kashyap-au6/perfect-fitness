const passport = require('passport')
const { Router } = require('express')
const router = Router()
const { createOrder,
        orderVerify,
        createCartOrder } = require('../../controllers/apiControllers/orderApiController')

router.post('/order/:productId', passport.authenticate('jwt', {session: false}), createOrder)
router.post('/cart/order', passport.authenticate('jwt', {session: false}), createCartOrder)
router.post('/verify', passport.authenticate('jwt', {session: false}), orderVerify)

module.exports = router