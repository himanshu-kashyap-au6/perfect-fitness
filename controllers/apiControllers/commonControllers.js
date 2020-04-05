const { hash } = require('bcryptjs')
const Admin = require('../../models/Admin')
const Trainer = require('../../models/Trainer')
const User = require('../../models/Users')
const Gyms = require('../../models/Gyms')
const Product = require('../../models/Product')
const Workout = require('../../models/Workout')
const Diet = require('../../models/Diet')
const cloudinary = require('../../utils/coludinary')
const convertBufferToString = require('../../utils/convertBufferToString')
const Membership = require('../../models/Membership')

module.exports = {

  async commonLogin(req, res){
    try{
      const commenUser = req.user
      const accessToken = await commenUser.generateToken('login')
      return res.status(200).json({statusCode: 200, commenUser, accessToken: `JWT ${accessToken}`, expiresIn: '12h'})  
    }catch(err){
      return res.status(500).json({ statusCode: 500, message: 'Server Error' })
    }
  },
  async renderChangePassword(req, res) {
    const role = req.user.role
    const { email, oldPassword, newPassword } = {...req.body}
    if (!email || !oldPassword || !newPassword) return res.status(400).json({ statusCode: 400, message: "Bad request"})
    try{
      const hp = await hash(newPassword, 10)
      if (role === 'User'){
        const user = await User.findByEmailAndPassword(email, oldPassword)    
        await user.updateOne({ password: hp })
        return res.status(200).json({ statusCode: 200, message: 'Password Changed successfully'})
      }
      if(role === 'Trainer'){
        const trainer = await Trainer.findByEmailAndPassword(email, oldPassword)    
        await trainer.updateOne({ password: hp })
        return res.status(200).json({ statusCode: 200, message: 'Password Changed successfully'})
      }
      if(role === 'Admin'){
        const admin = await Admin.findByEmailAndPassword(email, oldPassword)    
        await admin.updateOne({ password: hp })
        return res.status(200).json({ statusCode: 200, message: 'Password Changed successfully'})
      }
    }catch(err){
      return res.status(500).json({ statusCode: 500, message: 'Server Error' })
    }
  },
  async renderForgotPasswordEmail(req, res){
    const { perEmail, email } = req.body;
    try {
      // Ask for user details
      // No user. There is no user present in our database .. Kindly register first
      // 1. generateToken()
      // 2. Email sent successfully
      const admin = await Admin.findOne({ perEmail })
      const trainer = await Trainer.findOne({ perEmail })
      const user = await User.findOne({ email });
      if(perEmail){
        if(admin){
          await admin.generateToken("trainerReset")
          return res.status(200).json({ statusCode:200, message: 'Email sent successfully. Please Check your inbox' })
        }
        if(trainer){
          const trainer = await Trainer.findOne({ perEmail });
          await trainer.generateToken("trainerReset");
          return res.status(200).json({ statusCode: 200, message: 'Email sent successfully. Please Check your inbox' })
        }
      }
      else if(email){
        await user.generateToken("reset");
        return res.status(200).json({ statusCode: 200, message: "Email sent successfully. Please Check your inbox" });
      }
      else{
        return res.status(400).json({ statusCode: 400, message: 'A valid Email is required'});
      }
    } catch (err) {
      return res.status(500).json({ statusCode: 500, message: 'Server Error' });
    }
  },
  async renderAllResetPassword(req, res){
    const { resetToken } = req.params
    const {newPassword, confirmPassword} = {...req.body}
    const hp = await hash(newPassword, 10)
    try {
      // Finding the user with the help of token
      const admin = await Admin.findOne( { resetToken } );
      const trainer = await Trainer.findOne( { resetToken } );
      const user = await User.findOne( { resetToken } );
      if( newPassword !== confirmPassword )return res.status(400).json({ statusCode: 400, message: 'Password Do not match' })
      if(admin){
        await admin.updateOne({password: hp, resetToken: ""})
        admin.save()
        return res.status(200).json({ statusCode: 200, message: 'newPassword set successfully' })
      }
      else if(trainer){
        await trainer.updateOne({password: hp, resetToken: ""})
        trainer.save()
        return res.status(200).json({ statusCode: 200, message: 'newPassword set successfully' })  
      } 
      else if(user){
        await user.updateOne({password: hp, resetToken: ""})
        user.save()
        return res.status(200).json({ statusCode: 200, message: 'newPassword set successfully' })
      }
    } catch (err) {
      return res.status(500).json({ statusCode: 500, message: 'Server Error' });
    }
  },
  async renderConfirmEmail(req, res){
    const { confirmToken } = req.params;
    try {
      // Finding the user with the help of token
      const user = await User.findOne({ confirmToken });
      const trainer = await Trainer.findOne({ confirmToken });
      if(user){
        await user.updateOne({ isConfirm: true, confirmToken: "" })
        return res.status(200).json({ statusCode: 200, message: 'Email Confirmed successfully...!!! You can log in now' })
      }
      if(trainer){
        await trainer.updateOne({ isConfirm: true, confirmToken: "" })
        return res.status(200).json({ statusCode: 200, message: 'Email Confirmed successfully...!!! You can log in now' })
      }
    } catch (err) {
      return res.status(500).json({ statusCode: 500, message: 'Server Error' })
    }
  },
  async deletePFGym_Product_WO_DietP(req, res){
    const { commonId } = req.params
    try{
      if(req.user.role === 'Admin'){
        const gyms = await Gyms.findOne({ _id: commonId})
          const products = await Product.findOne({ _id: commonId})
          const MS = await Membership.findOne({ _id: commonId})
          if(gyms){
            const gym = await Gyms.deleteOne({ _id: commonId })
            if(!gym) { return res.status(400).json({ statusCode: 400, message: 'No Such Gym exist' }) }
            return res.status(200).json({ statusCode: 200, message: 'Gym deleted successfully' })
          }
          if(products){
            const product = await Product.deleteOne({_id: commonId})
            if(!product) { return res.status(400).json({ statusCode: 400, message: 'No Such product exist' }) }
            return res.status(200).json({ statusCode: 200, message: 'Product deleted successfully' })
          }
          if(MS){
            const memShip = await Membership.deleteOne({_id: commonId})
            if(!memShip) { return res.status(400).json({ statusCode: 400, message: 'No Such Membership exist' }) }
            return res.status(200).json({ statusCode: 200, message: 'Membership deleted successfully' })
          }
        }
        else if(req.user.role === 'Trainer'){
          const workout = await Workout.findOne({ _id: commonId})
          const diet = await Diet.findOne({ _id: commonId})
          if(workout){
            const workO = await Workout.deleteOne({ _id: commonId })
            if(!workO) { return res.status(400).json({ statusCode: 400, message: 'No Such workout plan exist' }) }
            return res.status(200).json({ statusCode: 200, message: 'Workout plan deleted successfully' })
          }
          if(diet){
            const dietP = await Diet.deleteOne({_id: commonId})
            if(!dietP) { return res.status(400).json({ statusCode: 400, message: 'No Such diet Plan exist' }) }
            return res.status(200).json({ statusCode: 200, message: 'Diet plan deleted successfully' })
          }
        }
        else{
          return res.status(400).json({ statusCode: 400, message: 'Bad request' })
        }
    }catch(err){
        return res.status(500).json({ statusCode: 500, message: 'Server Error' })
    }
  },
  async addWorkoutDiet(req, res){
    try{
      if(req.user.role === 'Trainer'){
        let imageContent1 = null
        let imageContent2 = null
        if(req.files[0].mimetype === 'image/jpeg'){
          imageContent1 =await  convertBufferToString(req.files[0].originalname,req.files[0].buffer);
        }
        if(req.files[1].mimetype === 'application/pdf'){
          imageContent2 =await  convertBufferToString(req.files[1].originalname,req.files[1].buffer);
        }
          const imageResponse1 = await cloudinary.uploader.upload(imageContent1)
          const imageResponse2 = await cloudinary.uploader.upload(imageContent2)
          let image = imageResponse1.secure_url
          let eBook = imageResponse2.secure_url
          const trainerId = req.user._id
          const { workoutPlan, dietPlan, price, category} = req.body
          if ( !price || !trainerId ||!image || !eBook || !category) {
            return res.status(400).json({ statusCode: 400, message: "Bad request" });
          }
          if(workoutPlan){
            const w = await Workout.create({ workoutPlan, price, trainerId, eBook, image, category});
            return res.status(201).json({stausCode: 201, w})
          }
          if(dietPlan){
            const diet = await Diet.create({ dietPlan, price, trainerId, eBook, image, category})
            return res.status(201).json({stausCode: 201, diet})            
          }
          else{
            return res.status(400).json({ statusCode: 400, message: "Bad request" });
          }
      }
    }catch(err){
      return res.status(500).json({ statusCode: 500, message: 'Server Error' })
    }
  },
  async updateWODietPlan(req,res){
    try{
      if(req.user.role === 'Trainer'){
        const { commonId } = req.params
        const WO = await Workout.findOne({_id: commonId})
        const DP = await Diet.findOne({_id: commonId})
        let imageContent1 = null
        let imageContent2 = null
        if(req.files[0].mimetype === 'image/jpeg'){
          imageContent1 =await  convertBufferToString(req.files[0].originalname,req.files[0].buffer);
        }
        if(req.files[1].mimetype === 'application/pdf'){
          imageContent2 =await  convertBufferToString(req.files[1].originalname,req.files[1].buffer);
        }
            const imageResponse1 = await cloudinary.uploader.upload(imageContent1)
            const imageResponse2 = await cloudinary.uploader.upload(imageContent2)
            const image = imageResponse1.secure_url
            const eBook = imageResponse2.secure_url
            const { workoutPlan, dietPlan, price, category} = req.body
            if(WO){
              if( workoutPlan || price || image || eBook || category){
                  if(workoutPlan) await WO.updateOne({ workoutPlan })
                  if(price) await WO.updateOne({ price })
                  if(image) await WO.updateOne({ image })
                  if(eBook) await WO.updateOne({ eBook })
                  if(category) await WO.updateOne({ category })
                  return res.status(200).json({ statusCode: 200, message: 'WorkoutPlan Updated Sucseesfully' });
              }
            }
            if(DP){
              if( dietPlan || price || image || eBook || category){
                  if(dietPlan) await DP.updateOne({ dietPlan })
                  if(price) await DP.updateOne({ price })
                  if(image) await DP.updateOne({ image })
                  if(eBook) await DP.updateOne({ eBook })
                  if(category) await DP.updateOne({ category })
                  return res.status(200).json({ statusCode: 200, message: 'DietPlan Updated Sucseesfully' });
              }
            }else{
                return res.status(400).json({ statusCode: 400, message: 'Bad Request' });
            }
        }
    }catch(err){
        return res.status(500).json({ statusCode: 500, message: 'Server Error' })
    }
  },
  async commonLogOut(req, res){
    try{
      const commenUser = req.user
      await commenUser.updateOne({accessToken: ""})
      commenUser.save()
      return res.status(200).json({statusCode: 200, message: 'LogOut Successfully'})  
    }catch(err){
      return res.status(500).json({ statusCode: 500, message: 'Server Error' })
    }
  }
}