const { Router } = require('express')
const router = Router()

const { allWorkout ,
        getbegginer,
        getintermediate,
        getprofessional } = require('../../controllers/normalControllers/workoutNormalController')

router.get('/allworkout', allWorkout)
router.get('/workout/begineer', getbegginer)
router.get('/workout/intermediate', getintermediate)
router.get('/workout/professional', getprofessional)


module.exports = router