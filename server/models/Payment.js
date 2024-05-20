const mongoose=require("mongoose");

//6. create model
const PaymentSchema=new mongoose.Schema({
    razorpay_order_id:{
        type:String,
        required:true
    },
    razorpay_payment_id:{
        type:String,
        required:true,
    },
    razorpay_signature:{
        type:String,
        required:true,
    },
    date:{
        type: Date,
        default: Date.now
    },
});
const Payment=new mongoose.model("payments", PaymentSchema);
module.exports=Payment;