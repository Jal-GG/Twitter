import mongoose from "mongoose";

const connectMongoDB = async ()=>{
    try {
        const conn = mongoose.connect(process.env.MONGO_URI)
        console.log("Mongo DB connected")
        
    } catch (e) {
        console.error(`Error connecting to mongo :${e.message}`)
        process.exit(1);
    }
}

export default connectMongoDB;