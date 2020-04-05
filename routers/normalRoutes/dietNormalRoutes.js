const { Router } = require('express')
const router = Router()

const { allDiet,
        getVeg,
        getNonveg,
        getkitto} = require('../../controllers/normalControllers/dietNormalController')

router.get('/alldiet', allDiet)
router.get('/diet/veg', getVeg)
router.get('/diet/non-veg', getNonveg)
router.get('/diet/kitto', getkitto)


module.exports = router