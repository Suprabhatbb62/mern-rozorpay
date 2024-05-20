require("dotenv").config();
const express = require("express");
const Razorpay = require("razorpay");
const router = express.Router();
const crypto = require("crypto");
const Payment=require("../models/Payment");
//7. razorpay instance
const razorpayInstance = new Razorpay({
    key_id: process.env.RZ_KEY_ID,
    key_secret: process.env.RZ_KEY_SECRET,
});

//4. route1
router.get("/getpayment", (req, res) => {
    res.json("Payment Details");
});

// 8. create oredr api POST method
router.post("/order", (req, res) => {
    const { amount } = req.body;
    // console.log(req.body);
    try {
        const options = {
            amount: Number(amount * 100),
            currency: "INR",
            receipt: crypto.randomBytes(10).toString("hex"),
        }
        razorpayInstance.orders.create(options, (err, order) => {
            if (err) {
                console.log(err);
                return res.status(500).json({ message: "Something went wrong" });
            }
            console.log("backend order" , order);
            res.status(200).json(order);
        })
    } catch (error) {
        console.log(error);
    }
});
// 9. create verify api 
router.post("/verify", async (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
    console.log("rebody", req.body);
    try {
        //create sign
        const sign = razorpay_order_id + "|" + razorpay_payment_id;
        //create expected sign
        const expectedSign = crypto.createHmac("sha256", process.env.RZ_KEY_SECRET)
            .update(sign.toString()).digest("hex");
        const isAuthentic = expectedSign === razorpay_signature;
        console.log(isAuthentic);

        //if true create payment
        if(isAuthentic){
            const payment = new Payment({
                razorpay_order_id,
                razorpay_payment_id,
                razorpay_signature,
            });
            //save payment
            await payment.save();
        }
    } catch (error) {
        console.log(error);
    }
})
module.exports = router;