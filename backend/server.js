import express from "express";
import authRoutes from "./routes/authRoutes.js";
import dotenv from "dotenv"
import connectMongoDB from "./db/connectMongoDB.js";
import cookieParser from "cookie-parser";


const app = express();
dotenv.config()  // to use dotenv throughout the app
app.use(express.json());        // to parse json in the app

app.use(cookieParser())         // to parse cookies in the app
app.use("/api/auth",authRoutes)     // in this path this passes to Routes handler 
app.use(express.urlencoded({extended:true}));  // to parse form data from postman(url Encoded)

app.listen(8000, ()=>{
    console.log("server is running on port 8000");
    connectMongoDB();           // connect to mongo 
})