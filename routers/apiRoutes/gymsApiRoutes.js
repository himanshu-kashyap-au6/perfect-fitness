const passport = require('passport')
const { Router } = require('express')
const router = Router()
const { addPFGym,
        updatePFgym } = require('../../controllers/apiControllers/gymsApiControllers')

router.post('/add/gym', passport.authenticate('jwt', {session: false}), addPFGym)
router.patch('/update/gym/:gymId', passport.authenticate('jwt', {session: false}), updatePFgym)
module.exports = router