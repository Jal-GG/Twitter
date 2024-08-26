import User from "../models/user.model.js"
import bcrypt from "bcryptjs"
import { generateTokenAndSetCookies } from "../lib/utils/generateToken.js"

//here all the controllers are defined 

export const signup = async(req,res)=>{ 
    try {
        const {fullname, username, email,password} = req.body;          // first get the data
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailRegex.test(email)){                                            // data validation
            return res.status(400).json({error : "invalid email"})
        }
        const existingUser = await User.findOne({username})
        if(existingUser){
            return res.status(400).json({error:"user already exists"})
        }

        const existingEmail = await User.findOne({email})
        if(existingEmail){
            return res.status(400).json({error: "email already exists"})
        }
        if(password.length <6){
            return res.status(400).json({error : "password must be atleast 6 char long"})
        }
        const salt = await bcrypt.genSalt(10);                              //password encryption
        const hashedPassword = await bcrypt.hash(password,salt);

        const newUser = new User({
            username,
            fullname,                                      //new user object is created as per the User model
            email,
            password:hashedPassword
        })

        if(newUser){                                            
            generateTokenAndSetCookies(newUser._id,res)             // a JWT token is generated from id
            await newUser.save();                               // the object is saved to the DB
            res.status(201).json({
                _id: newUser._id,
                username:newUser.username,
                fullname: newUser.fullname,
                email: newUser.email,
                follower:newUser.followers,
                following:newUser.following,
                profileImg:newUser.profileImg,
                coverImg:newUser.coverImg,
            })
        }
        else{
            res.status(400).json({error : "invalid user data"})
        }

    } catch (error) {
        console.log("Error in signup controller")
        console.log(error)
        res.status(500).json({error : "Internal server error"})
    }
   
}
export const login = async(req,res)=>{
    try {
        const {username , password } = req.body;                                     //check if already exists
        const user = await User.findOne({ username })
        const validPass = await bcrypt.compare(password,user?.password || "")//comparing the given pass & hashed
        if(!validPass || !user){                                                            
            return res.status(400).json({error:"username or password is incorrect"})
        }
        generateTokenAndSetCookies(user._id,res);                       // generating JWT 

        res.status(200).json({
                 _id: user._id,
                username:user.username,
                fullname: user.fullname,
                email: user.email,
                follower:user.followers,
                following:user.following,
                profileImg:user.profileImg,
                coverImg:user.coverImg,              
        })
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({error : "Internal server error"})
    }
}
export const logout = async(req,res)=>{
    try {
        res.cookie("jwt","",{maxAge:0})                                     //emptying the cookie
        res.status(200).json({messgage : "logout successfully"})
    } catch (error) {
        console.log(error)
        return res.status(500).json({error: "Internal server error"})
    }
}

export const getMe = async (req,res)=>{
    try {
        const user = await User.findById(req.user._id).select("-password")
        res.status(200).json(user)
    } catch (error) {
        console.log(error)
        return res.status(500).json({error : "Internal Server error"})
    }
}