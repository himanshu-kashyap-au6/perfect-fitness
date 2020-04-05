const Trainer = require('../../models/Trainer')
const { validationResult } = require('express-validator')

module.exports = { 
    async registerTrainer(req, res){
        try{
            const error = validationResult(req)
            if(!error.isEmpty()){
                return res.status(400).json({statusCode: 400, message: error.array()})
            }
            if(req.user.role === 'Admin'){
                const adminId  = req.user._id
                const { email, perEmail, name, password, price, isConfirm} = req.body;
                if (!email || !perEmail || !name || !password || !adminId || !price) {
                    return res.status(400).json({ statusCode: 400, message: "Bad request" });
                }
                const trainer = await Trainer.create({ email, name, password, perEmail, adminId, price, isConfirm });
                await trainer.generateToken({mode:'trainerConfirm', email: email, password: password });
                return res.status(201).json({statusCode: 201, confirmation: 'Confrmation Email has been sent successfully please check your mail to confrim the Account.'});
            }
        }catch(err){
            return res.status(500).json({ statusCode: 500, message: 'Server Error' })
        }
    },
    async deletePFTrainer (req, res){
      const { trainerId } = req.params
        try{
            if(req.user.role === 'Admin'){
                const trainer = await Trainer.deleteOne({ _id: trainerId })
                if(!trainer) { return res.status(400).json({ statusCode: 400, message: 'No Such trainer exist' }) }
                  return res.status(200).json({ statusCode: 200, message: 'Trainer fired successfully' })
            }
        }catch(err){
          return res.status(500).json({ statusCode: 500, message: 'Server Error' })
        }
    }
}