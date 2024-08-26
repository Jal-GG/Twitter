import User from "../models/user.model.js";
import jwt from "jsonwebtoken"

export const protectRoute = async(req,res,next)=>{
    try {
        const token = req.cookies.jwt;
        if(!token){
            return res.status(401).json({error: "unauthorised and no token provided"})  // if token is not found return error
        }
        const decoded = jwt.verify(token , process.env.JWT_SECRET)
        if(!decoded){           // if token is not same invalid
            return res.status(401).json({error : "unauthorised: invalid token"})
        }
        const user = await User.findById(decoded.userId).select("-password")  // - password means password is not returned 
        if(!user){
            return res.status(404).json({error: "user not found"})
        }
        req.user = user;                // user is mounted to the req.user
        next();
    } catch (error) {
        console.log("error in portected route : " + error)
        return res.status(500).json({error : "Internal server error"})
    }
}