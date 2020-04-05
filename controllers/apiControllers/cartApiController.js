const Cart = require('../../models/Cart')
const Product = require('../../models/Product')
const Trainer = require('../../models/Trainer')
const Membership = require('../../models/Membership')
const Workout = require('../../models/Workout')
const Diet = require('../../models/Diet')
module.exports = {
    async addToCart(req, res){
        const userId = req.user.id
        const {productId} = req.params
        try{
            const pro = await Product.findOne({_id: productId})
            const tra = await Trainer.findOne({_id: productId})
            const mem = await Membership.findOne({_id: productId})
            const wo = await Workout.findOne({_id: productId})
            const dp = await Diet.findOne({_id: productId})
            let orderTotal = null
            if(pro){
                orderTotal = pro.price
            }
            if(tra){
                orderTotal = tra.price
            }
            if(mem){
                orderTotal = mem.price
            }
            if(wo){
                orderTotal = wo.price
            }
            if(dp){
                orderTotal = dp.price
            }
            const cart = await Cart.create({ userId, productId, orderTotal })
            return res.status(201).json({ statusCode: 201, cart })
        }catch(err){
            return res.status(400).json({ statusCode: 400, message: 'Bad request' })
        }
    },

    async quantityIncrement(req,res) {
        try{
            const { productId } = req.params;
            const userId = req.user.id;
            const pPrice = await Product.findOne({_id: productId})
            const proPrice = pPrice.price
            await Cart.updateOne({userId, productId}, {$inc: {quantity: 1, orderTotal: proPrice }})
            return res.status(200).json({ statusCode: 200, message: 'QuantityUpdatedSuccessfully' })
        }catch(err){
            return res.status(400).json({ statusCode: 400, message: 'Bad request' })
        }
    },
    async quantityDecrement(req,res) {
        try{
            const { productId } = req.params;
            const userId = req.user.id;
            const eCart = await Cart.findOne({ userId, productId })
            const pPrice = await Product.findOne({_id: productId})
            const proPrice = pPrice.price
            if(eCart.quantity>1){
                await Cart.updateOne({userId, productId}, {$inc: {quantity: -1, orderTotal: -proPrice }})
                return res.status(200).json({ statusCode: 200, message: 'QuantityUpdatedSuccessfully' })
            }else{
                return res.status(401).json({ statusCode: 401, message: 'Quantity Cannot be less then one' })
            }
        }catch(err){
            return res.status(400).json({ statusCode: 400, message: 'Bad request' })
        }
    }
}