const Diet = require('../../models/Diet')

module.exports = { 
    async allDiet(req,res){
        try{
            const di =  await Diet.find({})
            const diet = []
            for(let i=0; i<di.length; i++){
                const obj = {}
                obj.name = di[i].dietPlan
                obj.price = di[i].price
                obj.image = di[i].image
                obj.category = di[i].category
                diet.push(obj)
            }       
            return res.status(200).json({ statusCode: 200, diet})
        }catch(err){
            return res.status(500).json({statusCode: 500, message:"Server  Error"}) 
        }
    },
    async getVeg(req,res){
        try{
                const di = await Diet.find({category:"begineer"})
                const diet = []
                for(let i=0; i<di.length; i++){
                    const obj = {}
                    obj.name = di[i].dietPlan
                    obj.price = di[i].price
                    obj.image = di[i].image
                    obj.category = di[i].category
                    diet.push(obj)
                }
                if(!diet) return res.status(400 ).json({ statusCode: 400, message:"No such diet" })
                return res.status(200).json({ statusCode: 200, di})
        }catch(err){
            return res.status(500).json({statusCode: 500, message:"Server  Error"}) 
        }
    },
    async getNonveg(req,res){
        try{
                const di = await Diet.find({category:"intermediate"})
                const diet = []
                for(let i=0; i<di.length; i++){
                    const obj = {}
                    obj.name = di[i].dietPlan
                    obj.price = di[i].price
                    obj.image = di[i].image
                    obj.category = di[i].category
                    diet.push(obj)
                }
                if(!diet) return res.status(400).json({ statusCode: 400, message:"No such diet" })
                return res.status(200).json({ statusCode: 200, diet })
        }catch(err){
            return res.status(500).json({statusCode: 500, message:"Server  Error"}) 
        }
    },
    async getkitto(req,res){
        try{
                const di = await Diet.find({category:"professional"})
                const diet = []
                for(let i=0; i<di.length; i++){
                    const obj = {}
                    obj.name = di[i].dietPlan
                    obj.price = di[i].price
                    obj.image = di[i].image
                    obj.category = di[i].category
                    diet.push(obj)
                }
                if(!diet) return res.status(400).json({ statusCode: 400, message:"No such diet" })
                return res.status(200).json({ statusCode: 200, diet })
        }catch(err){
            return res.status(500).json({statusCode: 500, message:"Server  Error"}) 
        }
    }

}