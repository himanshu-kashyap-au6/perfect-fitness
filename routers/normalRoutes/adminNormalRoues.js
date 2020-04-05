const passport = require('passport')
const { Router } = require('express')
const router = Router()
const { getAdminProfile } = require('../../controllers/normalControllers/adminNormalController')

router.get('/admin/profile', passport.authenticate('jwt' , {session: false}) , getAdminProfile)

module.exports = router