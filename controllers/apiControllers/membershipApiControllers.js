const Gyms = require('../../models/Gyms')
const Membership = require('../../models/Membership')
module.exports = {
    async addMembership(req, res){
        try{
            if(req.user.role==='Admin'){
                const adminId = req.user._id
                const { gymId } = req.params
                const { price, duration } = req.body
                const GYM = await Gyms.findOne({ _id: gymId })
                const { country, city, state, address, contactNumber } = GYM
                const search = city+state+address+contactNumber+duration+country
                if(!city || !state || !address || !contactNumber || !price || !duration || !country) return res.status(400).json({ statusCode: 400, message: "Bad request" })
                const MS = await Membership.create({ country, city, state, address, contactNumber, adminId, search, price, duration, gymId })
                return res.status(201).json({ statusCode: 201, MS })
            }else{
                return res.status(401).json({ statusCode: 401, message: 'Invalid Credentials' })
            }
        }catch(err){
            return res.status(500).json({ statusCode: 500, message: 'Server Error' })    
        }
    },
    async updatePFmembership(req, res){
        try{
            if(req.user.role === 'Admin'){
                const { MSId } = req.params
                const { city, state, address, contactNumber, price, duration } = req.body;
                const membership = await Membership.findOne({_id: MSId})
                if(!membership) return res.status(400).json({ statusCode: 400, message: 'No Such Membership present'})
                if( city || state || address || contactNumber || price || duration ){
                    if(city) await Membership.updateOne({ city })
                    if(state) await Membership.updateOne({ state })
                    if(address) await Membership.updateOne({ address })
                    if(contactNumber) await Membership.updateOne({ contactNumber })
                    if(price) await Membership.updateOne({ price })
                    if(duration) await Membership.updateOne({ duration })
            }
                return res.status(200).json({ statusCode: 200, message: 'Membership Updated Sucseesfully' });
            }
        }catch(err){
            return res.status(500).json({ statusCode: 500, message: 'Server Error' })
        }
    }
}