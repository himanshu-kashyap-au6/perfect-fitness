const Cart = require('../../models/Cart')

module.exports = {
    async getUserCart(req, res){
        try{
            const userId = req.user.id
            const cart = await Cart.find({userId})
            return res.status(200).json({ statusCode: 200, message: cart })
        }catch(err){
            return res.status(500).json({statusCode: 500, message:"Server  Error"}) 
        }
    }
}