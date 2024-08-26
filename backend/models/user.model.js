import mongoose from "mongoose"
// model schema is created
const userSchema = new mongoose.Schema({
    username: {
        type:String,
        required: true,
        unique: true
    },
    fullname:{
        type:String,
        requied: true,
    },
    password:{
        type: String,
        required: true,
        minLength:6,
    },
    email:{
        type:String,
        required: true,
        unique:true
    },
    followers:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        default:[]
    }],
    following: [
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            default:[]
        }
    ],
    profileImg:{
        type:String,
        default:"",
    },
    coverImg:{
        type:String,
        default:"",
    },
    link:{
        type:String,
        default:"",
    },
    bio:{
        type:String,
        default:""
    }
},{timestamps:true})
    // exported for futher use
const User = mongoose.model("User",userSchema);
export default User;