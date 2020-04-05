const { Router } = require('express')
const router = Router()

const { getSearchedProduct,
        getAllProduct,
        getSingleProduct,
        getSuppliments,
        getGymWeras,
        getGymGears } = require('../../controllers/normalControllers/productNormalController')

router.get('/searchproduct',getSearchedProduct)
router.get('/all/product' , getAllProduct)
router.get('/single/product', getSingleProduct)
router.get('/product/suppliments' , getSuppliments)
router.get('/product/gymwears' ,getGymWeras)
router.get('/product/gymgears', getGymGears)

module.exports = router