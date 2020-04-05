const sendMailToUser = require('../../utils/mailer')
const Product = require('../../models/Product')
const Order = require('../../models/Order')
const Cart = require('../../models/Cart')
const Trainer = require('../../models/Trainer')
const Workout = require('../../models/Workout')
const Diet = require('../../models/Diet')
const Membership = require('../../models/Membership')
const User = require('../../models/Users')
const instance = require('../../utils/razorpay')
const { v4: uuid } = require("uuid")
const createSignature = require('../../utils/createSignature')
module.exports = {
    async createOrder(req, res){
        const { productId } = req.params
        const transactionId = uuid();
        const pro = await Product.findOne({ _id: productId })
        const tra = await Trainer.findOne({ _id: productId })
        const wo = await Workout.findOne({ _id: productId })
        const dp = await Diet.findOne({ _id: productId })
        const mem = await Membership.findOne({ _id: productId })
        let price = null
        if(pro){
          price = pro.price
        }
        if(tra){
          price = tra.price
        }
        if(wo){
          price = wo.price
        }
        if(dp){
          price = dp.price
        }
        if(mem){
          price = mem.price
        }
        const currency = 'INR'
        const amountInPaise = price * 100
        const orderOptions = {
          currency,
          amount: amountInPaise,
          receipt: transactionId,
          payment_capture: 0
        };
        try {
          const order = await instance.orders.create(orderOptions);
          const transaction = {
            txnId : transactionId,
            userId: req.user._id,
            productId: productId,
            order_value: `${amountInPaise / 100} INR`,
            razorpay_order_id: order.id,
            isPending: true
          };
          await Order.create(transaction)
          return res.status(201).json({
            statusCode: 201,
            orderId: order.id,
            amount: transaction.order_value
          });
        } catch (err) {
          res.status(500).send({ statusCode: 500, message: "Server Error" });
        }
    },
    async orderVerify(req, res) {
      const { amount, currency, razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
      try {
        if(req.user.role === 'Admin'){
          const createdSignature = createSignature( razorpay_order_id, razorpay_payment_id );
          if (createdSignature !== razorpay_signature) { return res.status(401).send({ statusCode: 401, message: "Invalid payment request" })}
          await instance.payments.capture( razorpay_payment_id, amount, currency );
          const o = await Order.find({razorpay_order_id });
          if (!o) { return res.status(401).send({ statusCode: 401, message: "Invalid payment request" });}
          const proArray = o[0].txnId
          let uemail = null
          for(let i=0; i<o.length; i++ ){
            await  o[i].updateOne({razorpay_payment_id, razorpay_signature, isPending: false})
            const t = o[i].productId
            const u = o[i].userId
            const train = await Trainer.findOne({_id: t})
            const mem = await Membership.findOne({_id: t})
            const wo = await Workout.findOne({_id: t})
            const dp = await Diet.findOne({_id: t})
            const user = await User.findOne({_id: u})
            const mail = user.email
            uemail = mail
            if(train){
              await User.updateOne({_id: u}, {$set: { personalTrainer: t }})
            }
            if(mem){
              await User.updateOne({_id: u}, {$set: { memberShip: t }})
            }
            if(wo){
              await sendMailToUser('Workout', mail, wo.eBook)
            }          
            if(dp){
              await sendMailToUser('dietplan', mail, dp.eBook)
            }
            await Cart.deleteMany({userId: u})
          }
          await sendMailToUser('order', uemail, proArray )       
          return res.status(200).json({statusCode: 200, message: 'Payment captured Successfully...!!!'});
        }
      } catch (err) {
        res.status(500).send({ statusCode: 500, message: "Server Error" });
      }
    },
    async createCartOrder(req, res){
        const userId = req.user.id
        const transactionId = uuid();
        const cart = await Cart.find({userId})
        let price = 0
        for(let i=0; i<cart.length; i++){
          price+=cart[i].orderTotal
        }
        const currency = 'INR'
        const amountInPaise = price * 100
        const orderOptions = {
          currency,
          amount: amountInPaise,
          receipt: transactionId,
          payment_capture: 0
        };
        try {
          const order = await instance.orders.create(orderOptions);
          let txn = null
          for(let j=0; j<cart.length; j++){
            const transaction = {
              txnId : transactionId,
              userId: req.user._id,
              productId:  cart[j]['productId'] ,
              order_value: `${amountInPaise / 100} INR`,
              razorpay_order_id: order.id,
              isPending: true
            };
            await Order.create(transaction)
            txn = transaction.order_value
          }
          return res.status(201).json({
            statusCode: 201,
            orderId: order.id,
            amount: txn
          });
        } catch (err) {
          return res.status(500).send({ statusCode: 500, message: "Server Error" });
        }
    }
}