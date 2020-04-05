const Product = require('../../models/Product')
const cloudinary = require('../../utils/coludinary')
const convertBufferToString = require('../../utils/convertBufferToString')

module.exports = {
    async addPFProduct(req, res){
        try{
            if(req.user.role === 'Admin'){
                const imageContent =await  convertBufferToString(req.file.originalname,req.file.buffer);
                const imageResponse = await cloudinary.uploader.upload(imageContent)
                const image = imageResponse.secure_url || req.body.image
                const adminId = req.user._id
                const { productName, brand, price, category } = req.body
                if (!productName || !brand || !price || !category || !adminId) {
                    return res.status(400).json({ statusCode: 400, message: "Bad request" });
                }
                const product = await Product.create({ productName, brand, price, category, adminId, image});
                return res.status(201).json({stausCode: 201, product})
            }
        }catch(err){
            return res.status(500).json({ statusCode: 500, message: 'Server Error' })
        }
    },
    async updatePFProduct(req,res){
        try{
            if(req.user.role === 'Admin'){
                const imageContent =await  convertBufferToString(req.file.originalname,req.file.buffer);
                const imageResponse = await cloudinary.uploader.upload(imageContent)
                const image = imageResponse.secure_url
                const { productId } = req.params
                const { price, category, productName, brand } = req.body;
                const product = await Product.findOne({_id:productId})
                if(!product) return res.status(400).json({ statusCode: 400, message: 'No Such Product Exists'})
                if( productName || price || category || image || brand ){
                    if(productName) await product.updateOne({ productName })
                    if(price) await product.updateOne({ price })
                    if(category) await product.updateOne({ category })
                    if(image) await product.updateOne({ image })
                    if(brand) await product.updateOne({ brand })
                }
                return res.status(200).json({ statusCode: 200, message: 'Updated Sucseesfully' });
            }
        }catch(err){
            return res.status(500).json({ statusCode: 500, message: 'Server Error' })
        }
    }
}

