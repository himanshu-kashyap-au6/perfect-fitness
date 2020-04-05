const { Router } = require('express')
const router = Router()

const  { getReview } = require('../../controllers/normalControllers/reviewNormalController')

router.get('/getreview/:productId' , getReview)

module.exports = router