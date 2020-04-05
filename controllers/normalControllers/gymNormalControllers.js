const Gyms = require('../../models/Gyms')
const domainName = process.env.DOMAIN_NAME || `http://localhost:1234`;
module.exports = {
    async findPFgym(req, res){
        function escapeRegex(text) {
            return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
        }
        try{
            const { place } = req.params
            if(place){
                const regex =  new RegExp(escapeRegex(place));
                const gym = await Gyms.find({search:regex})
                if(gym.length === 0) return res.status(401).json({ statusCode:401, message: 'No gym present at this place' })
                return res.status(200).json({ statusCode: 200, gym})
            }
        }catch(err){
            return res.status(500).json({ statusCode:500, message: 'Server Error' })
        }
    },
    async findGymByCountry(req,res){
        try{
            const { country } = req.params
            const countryGym = await Gyms.find({country:country}) 
            const arr = []
            for(let i=0 ;i<countryGym.length;i++){ 
                arr.push(countryGym[i].state)
            }
            function removeDuplicates(array) {
                return array.filter((a, b) => array.indexOf(a) === b)
            };
            const farr = removeDuplicates(arr)
            const arr1 = []
            for(let k=0;k<farr.length;k++){
                const obj = {}
                obj.state = farr[k]
                obj.city = `${domainName}/findgym/state/${farr[k]}`
                arr1.push(obj)
            }
            return res.status(200).json({ statusCode: 200, arr1})
        }catch(err){
            return res.status(500).json({ statusCode:500, message: 'Server Error' })
        }
    },
    async findGymbyState(req,res){
        try{
            const { state } = req.params
            const stateGym = await Gyms.find({state:state}) 
            const arr = []
            for(let i=0 ;i<stateGym.length;i++){ 
                arr.push(stateGym[i].city)
            }
            function removeDuplicates(array) {
                return array.filter((a, b) => array.indexOf(a) === b)
            };
            const farr = removeDuplicates(arr)
            const arr1 = []
            for(let k=0;k<farr.length;k++){
                const obj = {}
                obj.city = farr[k]
                obj.detaills = `${domainName}/findgym/city/${farr[k]}`
                arr1.push(obj)
            }
            return res.status(200).json({ statusCode:200, arr1})
        }catch(err){
            return res.status(500).json({ statusCode:500, message: 'Server Error' })
        }
    },async findGymByCity(req,res){
        try{
            const { city } = req.params
            const cityGym = await Gyms.find({city:city})
            return res.json({ statusCode: 200, cityGym})
        }catch(err){
            return res.status(500).json({ statusCode:500, message: 'Server Error' })
        }
    }
}