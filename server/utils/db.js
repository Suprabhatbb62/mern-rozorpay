const mongoose=require("mongoose");
const dburl=process.env.DB_URL;
// 1. connect db to mongo 
const connectDB=async()=>{
    try{
        await mongoose.connect(dburl);
        console.log("Connection success..");
    }catch(error){
        console.log("Failed to establish connection");
    }
}
module.exports=connectDB;