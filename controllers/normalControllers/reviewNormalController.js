const Review = require('../../models/Review')


module.exports = {
    async getReview(req,res){
        try{
            const { productId } = req.params;
            if(!productId) return res.status(400).json("Bad Request")
            const review = await Review.find({productId});
            res.status(200).json({statusCode: 200 , review})
        }catch(err){
            return res.status(500).json("Server Error")
        }
    }
}