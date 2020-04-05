const passport = require('passport')
const { Router } = require('express')
const upload = require('../../utils/multer')
const router = Router()
const { commonLogin,
        renderChangePassword,
        renderForgotPasswordEmail,
        renderAllResetPassword,
        deletePFGym_Product_WO_DietP,
        addWorkoutDiet,
        updateWODietPlan,
        commonLogOut } = require('../../controllers/apiControllers/commonControllers')

router.post('/login', passport.authenticate('local', {session: false}), commonLogin)
router.post('/forgot-password', renderForgotPasswordEmail)
router.post('/reset/:resetToken', renderAllResetPassword)
router.post('/change-password', passport.authenticate('jwt', {session: false}), renderChangePassword)
router.delete('/delete/items/:commonId', passport.authenticate('jwt', {session: false}), deletePFGym_Product_WO_DietP)
router.post('/add/workout-diet',passport.authenticate('jwt', {session: false}), upload.array("image"), addWorkoutDiet)
router.patch('/update/WO-DP/:commonId',passport.authenticate('jwt', {session: false}), upload.array("image"), updateWODietPlan)
router.delete('/logout',passport.authenticate('jwt', {session: false}), commonLogOut)

module.exports = router
