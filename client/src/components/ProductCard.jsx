import { useState } from "react";

function ProductCard() {
    const [amount, setamount] = useState(150);
    const handlePayment = async () => {
        console.log(amount);
        try {
            const response = await fetch(`http://localhost:8000/api/payment/order`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ amount })
            });
            const resdata = await response.json();
            console.log("response data", resdata);
            verifyPayment(resdata);
        } catch (error) {
            console.log(error);
        }
    }
    //verify payment
    const verifyPayment = async (resdata) => {
        const options = {
            key: import.meta.env.RZ_KEY_ID,
            amount: resdata.amount,
            currency: resdata.currency,
            name: "Suprabhat Sahoo",
            description: "Test Mode",
            order_id: resdata.id,
            handler: async (response) => {
                console.log("handler response", response);
                try {
                    const res = await fetch(`http://localhost:8000/api/payment/verify`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            razorpay_order_id:response.razorpay_order_id,
                            razorpay_payment_id:response.razorpay_payment_id,
                            razorpay_signature:response.razorpay_signature,
                        })
                    })
                    const verifiedData=await res.json();
                    console.log("verified data", verifiedData);
                    if(verifiedData.message){
                        alert("transaction done");
                    }else{
                        alert("Transaction failed");
                    }
                }catch(error){
                    console.log(error);
                }
            },
            theme:{
                color: "red"
            }
        };
        const rzp1=new window.Razorpay(options);
        rzp1.open();
    }
    return (
        <div className="card" style={{
            display: "flex",
            flexDirection: "column", width: "200px", alignItems: "center", margin: "auto"
        }}>

            <h4>Iphone 14 Pro</h4>
            <img src="/images/apple.png" width="200px" />
            <p>Price: 150</p>
            <button onClick={handlePayment}>Buy Now</button>
        </div>
    )
}
export default ProductCard;