const passport = require('passport')
const { Router } = require('express')
const router = Router()
const { renderConfirmEmail } = require('../../controllers/apiControllers/commonControllers')
const { getUserProfile, 
        fetchGooglePofile, 
        fetchfacebookPofile } = require('../../controllers/normalControllers/userNormalController')
        
const domainName = process.env.DOMAIN_NAME || `http://localhost:1234`;

router.get('/user/profile', passport.authenticate('jwt' , {session: false}) , getUserProfile)
router.get('/user/google', passport.authenticate('google', {session: false, scope: ['profile', 'email']}))
router.get('/google/redirect', passport.authenticate('google', {session: false, 
    failureRedirect: `${domainName}/user/google`}), fetchGooglePofile)

router.get('/user/facebook', passport.authenticate('facebook', {session: false, scope: ['email']}))
router.get('/facebook/redirect', passport.authenticate('facebook', {session: false, 
    failureRedirect: `${domainName}/user/facebook`}), fetchfacebookPofile)

router.get("/confirm/:confirmToken", renderConfirmEmail)

module.exports = router