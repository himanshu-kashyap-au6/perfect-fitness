const Workout = require('../../models/Workout')
module.exports = {   
    async allWorkout(req,res){
        try{
            const wo =  await Workout.find({})
            const workout = []
            for(let i=0; i<wo.length; i++){
                const obj = {}
                obj.name = wo[i].workoutPlan
                obj.price = wo[i].price
                obj.image = wo[i].image
                obj.category = wo[i].category
                workout.push(obj)
            }
            return res.status(200).json({ statusCode: 200, workout})
        }catch(err){
            return res.status(500).json({statusCode: 500, message:"Server  Error"}) 
        }
    },
    async getbegginer(req,res){
        try{
                const wo = await Workout.find({category:"begineer"})
                const workout = []
                for(let i=0; i<wo.length; i++){
                    const obj = {}
                    obj.name = wo[i].workoutPlan
                    obj.price = wo[i].price
                    obj.image = wo[i].image
                    obj.category = wo[i].category
                    workout.push(obj)
                }    
                if(!workout) return res.status(400 ).json({ statusCode: 400, message:"No such workout" })
                return res.status(200).json({ statusCode: 200, workout })
        }catch(err){
            return res.status(500).json({statusCode: 500, message:"Server  Error"}) 
        }
    },
    async getintermediate(req,res){
        try{
                const wo = await Workout.find({category:"intermediate"})
                const workout = []
                for(let i=0; i<wo.length; i++){
                    const obj = {}
                    obj.name = wo[i].workoutPlan
                    obj.price = wo[i].price
                    obj.image = wo[i].image
                    obj.category = wo[i].category
                    workout.push(obj)
                }    
                if(!workout) return res.status(400).json({ statusCode: 400, message:"No such workout" })
                return res.status(200).json({ statusCode: 200, workout })
        }catch(err){
            return res.status(500).json({statusCode: 500, message:"Server  Error"}) 
        }
    },
    async getprofessional(req,res){
        try{
                const wo = await Workout.find({category:"professional"})
                const workout = []
                for(let i=0; i<wo.length; i++){
                    const obj = {}
                    obj.name = wo[i].workoutPlan
                    obj.price = wo[i].price
                    obj.image = wo[i].image
                    obj.category = wo[i].category
                    workout.push(obj)
                }    
                if(!workout) return res.status(400).json({ statusCode: 400, message:"No such workout" })
                return res.status(200).json({ statusCode: 200, workout})
        }catch(err){
            return res.status(500).json({statusCode: 500, message:"Server  Error"}) 
        }
    }

}
