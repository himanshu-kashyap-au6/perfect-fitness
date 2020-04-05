const Admin = require('../../models/Admin')
module.exports = {
    async getAdminProfile(req, res){
        try{
            return res.json( { statusCode: 200, user: req.user })
        }catch(err){
            return res.state(500).json({ statusCode: 500, message: 'Server Error' })
        }
    }
}