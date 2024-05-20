require("dotenv").config();
const express=require("express");
const app=express();
const port=8000;
const connectDB=require("./utils/db");
const cors=require("cors");
const payment=require("./routes/payment");
//3. cors
app.use(express.json());
// const corsOptions={
//     origin:"http://localhost:5173",
//     method:"GET, POST, PUT, DELETE, PATCH, HEAD",
//     credentials:true,
// };
// app.use(cors(corsOptions));
app.use(cors());


//5. register router
app.use("/api/payment", payment);

// 2. start server 
connectDB().then(()=>{
    app.listen(port, ()=>{
        console.log(`Listening to port ${port}`);
    });
});
weravae