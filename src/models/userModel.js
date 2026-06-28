import mongoose from "mongoose";
import { unique } from "next/dist/build/utils";
import { verify } from "node:crypto";

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:[true,"Please provide the username"],
        unique:true
    },
    email:{
        type:String,
        required:[true,"Please provide the email"],
        unique:true
    },
    password:{
        type:String,
        required:[true,"Please provide the password"],
    },
    isVerified:{
        type:Boolean,
        default:false
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    forgotPasswordToken:String,
    forgotPasswordTokenExpiry:Date,
    verifyToken:String,
    verifyTokenExpiry:String
})
const User= mongoose.model.users || mongoose.model("users".userSchema)
export default User