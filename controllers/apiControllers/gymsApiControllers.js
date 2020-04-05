const Gyms = require('../../models/Gyms')
module.exports = {
    async addPFGym(req, res){
        try{
            if(req.user.role==='Admin'){
                const adminId = req.user._id
                const { city, state, address, contactNumber } = req.body
                const search = city+state+address+contactNumber
                if(!city || !state || !address || !contactNumber) return res.status(400).json({ statusCode: 400, message: "Bad request" })
                const gym = await Gyms.create({ city, state, address, contactNumber, adminId, search })
                return res.status(201).json({ statusCode: 201, gym })
            }else{
                return res.status(401).json({ statusCode: 401, message: 'Invalid Credentials' })
            }
        }catch(err){
            return res.status(500).json({ statusCode: 500, message: 'Server Error' })
        }
    },
    async updatePFgym(req, res){
        try{
            if(req.user.role === 'Admin'){
                const { gymId } = req.params
                const { city, state, address, contactNumber } = req.body;
                const gym = await Gyms.findOne({_id: gymId})
                if(!gym) return res.status(400).json({ statusCode: 400, message: 'No Such Product Exists'})
                if( city || state || address || contactNumber ){
                    if(city) await Gyms.updateOne({ city })
                    if(state) await Gyms.updateOne({ state })
                    if(address) await Gyms.updateOne({ address })
                    if(contactNumber) await Gyms.updateOne({ contactNumber })
            }
                return res.status(200).json({ statusCode: 200, message: 'Updated Sucseesfully' });
            }
        }catch(err){
            return res.status(500).json({ statusCode: 500, message: 'Server Error' })
        }
    }
}