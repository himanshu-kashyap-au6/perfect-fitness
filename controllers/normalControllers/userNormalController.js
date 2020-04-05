const User = require('../../models/Users')
module.exports = {
    async getUserProfile(req, res){
        try{
            return res.json( { user: req.user })
        }catch(err){
            return res.status(500).json({ statusCode: 500, message: 'Server Error' })
        }
    },
    async fetchGooglePofile(req, res){
        try{
            const user = req.user
            const accessToken = await user.generateToken('login')
            return res.json( {statusCode: 200 , user, accessToken: `JWT ${accessToken}` , expiresIn: '12h'} )    
        }catch(err){
            return res.status(500).json({ statusCode: 500, message: 'Server Error' })
        }
    },
    async fetchfacebookPofile(req, res){
        try{
            const user = req.user
            const accessToken = await user.generateToken('login')
            return res.json( {statusCode: 200 , user, accessToken: `JWT ${accessToken}` , expiresIn: '12h'} )    
        }catch(err){
            return res.status(500).json({ statusCode: 500, message: 'Server Error' })
        }
    },
    async renderConfirmEmail(req, res) {
        const { confirmToken } = req.params;
        try {
          // Finding the user with the help of token
          const user = await User.findOne({ confirmToken });
          if (!user) return res.status(401).send("Invalid Credentials")
          await user.updateOne({ isConfirm: true, confirmToken: "" })
          return res.status(200).json({ statusCode: 200, message: 'Email Confirmed successfully...!!! You can log in now' })
        } catch (err) {
            return res.status(500).json({ statusCode: 500, message: 'Server Error' })
        }
    }
}