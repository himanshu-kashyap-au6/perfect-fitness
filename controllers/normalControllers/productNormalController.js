const Product = require('../../models/Product')

module.exports = {
    async getSearchedProduct(req,res){
        function escapeRegex(text) {
            return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
        };
        try{
            
        const { product , page , size} =req.query
        if(product){
            const regex =  new RegExp(escapeRegex(product));
            const searchProduct = await Product.find({search:regex}).limit(parseInt(size)).skip(parseInt(page)-1)
            if(false === isNaN(product)){
                const priceSearched  = await Product.find({price:product}).limit(parseInt(size)).skip(parseInt(page)-1)
                return res.json({ statusCode: 200, priceSearched})
              }
            if(searchProduct){
                return res.json({ statusCode: 200, searchProduct})
              }
           }      
        }catch(err){
            return res.status(500).json({ statusCode: 500, message: 'Server Error' })
        }
    },
    async getAllProduct (req,res){
        try{
            const { page ,size } =req.query
            const product = await Product.find({}).limit(parseInt(size)).skip(parseInt(page)-1)
            if(!product) return res.status(400).json({ statusCode: 400, message: 'Bad Request'})
            return res.status(200).json({ statusCode: 200, product})

        }catch(err){
            return res.status(500).json({ statusCode: 500, message: 'Server Error' })
        }
    },
    async getSingleProduct(req,res){
        try{
            const { id } =req.query
            const product = await Product.findOne({_id:id})
            if(!product) return res.status(400).json({ statusCode: 400, message: 'Bad Request'})
            return res.status(200).json({ statusCode: 200, product})

    }catch(err){
        return res.status(500).json({ statusCode: 500, message: 'Server Error' })
    }
    },
    async getSuppliments(req,res){
        try{
            const suppliments = await Product.find({category:"suppliments"})
            if(!suppliments) return res.status(400).json({ statusCode: 400, message: 'No Such Category Exists'})
            return res.status(200).json({ statusCode: 200, suppliments})
        }catch(err){
            return res.status(500).json({ statusCode: 500, message: 'Server Error' })
        }
    },
    async getGymWeras(req,res){
        try{
            const gymWears = await Product.find({category:"gymwears"})
            if(!gymWears) return res.status(400).json({ statusCode: 400, message: 'No Such Category Exists'})
            return res.status(200).json({ statusCode: 200, gymWears})
        }catch(err){
            return res.status(500).json({ statusCode: 500, message: 'Server Error' })
        }
    },
    async getGymGears(req,res){
        try{
            const gymGears = await Product.find({category:"gymgears"})
            if(!gymGears) return res.status(400).json({ statusCode: 400, message: 'No Such Category Exists'})
            return res.status(200).json({ statusCode: 200, gymGears})
        }catch(err){
            return res.status(500).json({ statusCode: 500, message: 'Server Error' })
        }
    }
}