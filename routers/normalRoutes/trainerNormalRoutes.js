const passport = require('passport')
const { Router } = require('express')
const router = Router()
const { trainerConfirmEmail,
        getTrainer } = require('../../controllers/normalControllers/trainerNormalController')

router.get("/trainer/confirm/:confirmToken", trainerConfirmEmail)
router.get('/allTrainer', getTrainer)
module.exports = router