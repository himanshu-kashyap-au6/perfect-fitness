const passport = require('passport')
const { Router } = require('express')
const router = Router()
const { addMembership,
        updatePFmembership } = require('../../controllers/apiControllers/membershipApiControllers')

router.post('/add/membership/:gymId', passport.authenticate('jwt', {session: false}), addMembership)
router.patch('/update/membership/:MSId', passport.authenticate('jwt', {session: false}), updatePFmembership)

module.exports = router