const Admin = require('../../models/Admin')
const { validationResult } = require('express-validator')
module.exports = {
    async registerAdmin(req, res){
        try{
            const error = validationResult(req)
            if(!error.isEmpty()){
                return res.status(400).json({statusCode: 400, message: error.array()})
            }
            const { email, perEmail, name, password } = req.body;
            if (!email || !perEmail|| !name || !password) {
                return res.status(400).json({ statusCode: 400, message: "Bad request" });
            }
            const admin = await Admin.create({ email, name, password, perEmail });
            return res.status(201).json({statusCode: 201, admin});
        }catch(err){
            return res.status(500).json({ statusCode: 500, message: 'Server Error' })
        }
    }
}