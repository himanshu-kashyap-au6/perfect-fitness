const { Router } = require('express')
const router = Router()
const { findPFgym,
        findGymByCountry,
        findGymbyState,
        findGymByCity } = require('../../controllers/normalControllers/gymNormalControllers')

router.get('/findgym/:place', findPFgym)
router.get('/findgym/country/:country' ,findGymByCountry)
router.get('/findgym/state/:state' , findGymbyState)
router.get('/findgym/city/:city' , findGymByCity)

module.exports = router