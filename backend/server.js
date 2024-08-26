import express from "express";
import authRoutes from "./routes/authRoutes.js";
import dotenv from "dotenv"
import connectMongoDB from "./db/connectMongoDB.js";

const app = express();
dotenv.config() 

app.use("/api/auth",authRoutes)
app.listen(8000, ()=>{
    console.log("server is running on port 8000");
    connectMongoDB();
})