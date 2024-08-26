import express from "express";
import authRoutes from "./routes/authRoutes.js";
import dotenv from "dotenv"
import connectMongoDB from "./db/connectMongoDB.js";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/userRoutes.js"
import {v2 as cloudinary} from "cloudinary"


const app = express();
dotenv.config()  // to use dotenv throughout the app
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})
app.use(express.json());        // to parse json in the app

app.use(cookieParser())         // to parse cookies in the app

app.use("/api/auth",authRoutes)

app.use("/api/users",userRoutes)            // in this path this passes to Routes handler 

app.use(express.urlencoded({extended:true}));  // to parse form data from postman(url Encoded)

app.listen(8000, ()=>{
    console.log("server is running on port 8000");
    connectMongoDB();           // connect to mongo 
})