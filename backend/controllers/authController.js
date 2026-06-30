import User from "../models/UserModel.js"; 
import bcrypt from "bcryptjs"
import { Response } from "../utils/responseHandler.js";
import { validationResult } from "express-validator";
import jwt from "jsonwebtoken"
import { UserMapper } from "../mappers/userMapper.js";

// Signup user 
export const SignUp = async(req,res)=>{
    try {
        const {fullname,workemail,password} = req.body 
        //check validation errors 
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return Response(res,400,"Validation errors",errors.array())
        }
        // check user already exists or not 
        const userexists = await User.findOne({workemail})
        if(!userexists){
              const hashpassword = await bcrypt.hash(password,10) 
              const user = await User.create({
                 fullname,
                 workemail,
                 password:hashpassword
              })
              return Response(res,201,"Signup Successfully")
        }else{
            return Response(res,409,"User already exists")
        }
        
    } catch (error) {
        console.error("Failed to sign up user",error)
        return Response(res,500,"Internal server error")
    }
}

// login user 
export const Login = async(req,res)=>{
    try {
        const {workemail, password} = req.body 
        //check validation errors 
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return Response(res,400,"Validation errors",errors.array())
        }
        // check user exists 
        const user = await User.findOne({workemail})
        if(user){
             const isMatch = await bcrypt.compare(password,user.password)
             if(!isMatch){
                return Response(res,401,"Invalid email or password")
             }
            user.isActive = true 
            await user.save()
            // send jwt 
            const token = await jwt.sign({id:user?._id},process.env.JWT_SECRET_KEY,{expiresIn:"1d"})
            res.cookie("token",token,{httpOnly:true,secure:true,sameSite:"none"})
            return Response(res,200,"Login successfully",{user:UserMapper(user),token})
        }else{
            return Response(res,409,"User not found! Please Register ")
        }
    } catch (error) {
        console.error("Failed to Login ",error)
        return Response(res,500,"Internal server error")
    }
}

export const Logout = async(req,res)=>{
    try {
         res.clearCookie("token",{httpOnly:true,secure:true,sameSite:"none"})
         return Response(res,200,"Logout successfully")
    } catch (error) {
        console.error("Failed to sign up user",error)
        return Response(res,500,"Internal server error")
    }
}