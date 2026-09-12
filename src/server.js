import express from "express";
import mongoose from "mongoose";
import 'dotenv/config';

import authRoutes from './routes/auth.routes.js';
import productRoutes from './routes/products.routes.js';
import authenticate from "./middlewares/auth.middleware.js";

const app = express();

app.use(express.json());

app.use('/api/auth',authRoutes);

app.use(authenticate);

app.use('/api/products', productRoutes);

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
