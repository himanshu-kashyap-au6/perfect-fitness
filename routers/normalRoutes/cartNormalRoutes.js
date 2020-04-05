const passport = require('passport')
const { Router } = require('express')
const router = Router()
const { getUserCart } = require('../../controllers/normalControllers/cartNormalController')

router.get('/get/cart', passport.authenticate('jwt' , {session: false}) , getUserCart)

module.exports = router