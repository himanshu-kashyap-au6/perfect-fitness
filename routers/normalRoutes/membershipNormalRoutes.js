const { Router } = require('express')
const router = Router()
const { findPF_Ms,
        findMSByCountry,
        findMSbyState,
        findMSByCity } = require('../../controllers/normalControllers/membershipNormalController')

router.get('/findMS/:place', findPF_Ms)
router.get('/findMS/country/:country' ,findMSByCountry)
router.get('/findMS/state/:state' , findMSbyState)
router.get('/findMS/city/:city' , findMSByCity)

module.exports = router