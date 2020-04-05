const passport = require('passport')
const { Router } = require('express')
const router = Router()
const upload = require('../../utils/multer')
const { addPFProduct,
        updatePFProduct } = require('../../controllers/apiControllers/productApiControler')

router.post('/add/product', passport.authenticate('jwt', {session: false}), upload.single("image"), addPFProduct)
router.patch('/update/product/:productId', passport.authenticate('jwt', {session: false}), upload.single("image"), updatePFProduct)

module.exports = router