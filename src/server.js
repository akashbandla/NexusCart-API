import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const app = express();
app.use(express.json());

async function start() {
    try {
       await mongoose.connect(process.env.MONGO_URI)
       console.log("MongoDB connected successfully")
       app.listen(process.env.PORT, () =>{
        console.log("server is running on port " + process.env.PORT)
       })

    }catch (error){
        console.log(error)

    }
    
}

start();
