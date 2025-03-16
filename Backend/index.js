import express from 'express';
import dotenv from 'dotenv';
import { connectDb } from './database/db.js';
import userRoutes from './routes/userRoutes.js';
import atmRoutes from './routes/atmRoutes.js';
import cookieParser from 'cookie-parser'
import cloudinary from 'cloudinary'
import compression from 'compression';
import cors from 'cors';
import path from 'path';

const app = express();
const PORT = 5000;

dotenv.config();

cloudinary.v2.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.CLOUD_API,
    api_secret:process.env.CLOUD_SECRET
})

// app.get('/',(req,res)=>{
//     res.send("Hello")
// })

// middleware
app.use(cors({
    origin: 'http://localhost:5173',  
    credentials: true,              
  }));
app.use(express.json());
app.use(cookieParser());
app.use(compression());

// routes
app.use('/api/user',userRoutes);
app.use('/api/atm',atmRoutes);

const __dirname = path.resolve();
app.use(express.static(path.join(__dirname,"/Frontend/dist")))
app.get("*",(req,res)=>{
    res.sendFile(path.join(__dirname,"Frontend","dist","index.html"))
})

// server
app.listen(PORT,()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
    connectDb();
})