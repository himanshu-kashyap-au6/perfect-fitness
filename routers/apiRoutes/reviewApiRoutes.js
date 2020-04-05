const passport = require('passport')
const { Router } = require('express')
const router = Router()

const { addReview,
        updateReview,
        deleteReview } = require('../../controllers/apiControllers/reviewApiController')

router.post('/add/review/:productId' ,passport.authenticate('jwt', {session: false}), addReview)
router.patch('/update/review/:reviewId' ,passport.authenticate('jwt', {session: false}), updateReview)
router.delete('/delete/review/:reviewId' ,passport.authenticate('jwt', {session: false}), deleteReview)


module.exports = router