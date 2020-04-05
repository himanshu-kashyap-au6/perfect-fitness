const passport = require('passport')
const { Router } = require('express')
const router = Router()
const { addToCart,
        quantityIncrement,
        quantityDecrement } = require('../../controllers/apiControllers/cartApiController')

router.post('/add/cart/:productId',  passport.authenticate('jwt', {session: false}), addToCart)
router.post('/increaseQuantity/:productId',  passport.authenticate('jwt', {session: false}), quantityIncrement)
router.post('/decrementQuantity/:productId',  passport.authenticate('jwt', {session: false}), quantityDecrement)

module.exports = router