const Trainer = require('../../models/Trainer')
module.exports = {
    async trainerConfirmEmail(req, res){
        const { confirmToken } = req.params;
        try {
          // Finding the user with the help of token
          const trainer = await Trainer.findOne({ confirmToken });
          if (!trainer) return res.status(401).send("Invalid Credentials")
          await trainer.updateOne({ isConfirm: true, confirmToken: "" })
          return res.status(200).json({ statusCode: 200, message: 'Email Confirmed successfully...!!! You can log in now' })
        } catch (err) {
            return res.state(500).json({ statusCode: 500, message: 'Server Error' })
        }
    },
    async getTrainer(req,res){
        try {
            const tra = await Trainer.find({});
            const trainer = []
            for(let i=0; i<tra.length; i++){
                const obj = {}
                obj.name = tra[i].name
                obj.price = tra[i].price
                trainer.push(obj)
            }
            
            return res.status(200).json({ statusCode: 200, trainer })
          } catch (err) {
              return res.status(500).json({ statusCode: 500, message: 'Server Error' })
          }
    }
}