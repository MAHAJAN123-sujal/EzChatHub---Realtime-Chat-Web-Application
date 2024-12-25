import cloudinary from "../lib/cloudinary.js";
import { generateToken } from "../lib/utils.js";
import User from "../models/userModel.js";
import bcrypt from 'bcryptjs'

export const signUpController = async(req,res) =>{
    const {fullName,email,password} = req.body;
    try{
        if(!fullName || !email || !password){
            return res.status(400).json({
                message:"Fill all the required fields"
            })
        }

        if(password.length<6){
            return res.status(400).json({
                message: "Password must be atleast of 6 characters"
            })
        }

        const existingUser = await User.findOne({email});

        if(existingUser){
            return res.status(400).json({
                message: "Email already exists"
            })
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt)

        const newUser = new User({
            fullName,
            email,
            password:hashedPassword
        })

        if(newUser){
            // Json Web token while saving user => for authentication while message sending
            generateToken(newUser._id,res);
            await newUser.save();

            res.status(201).json({
                _id:newUser._id,
                fullName:newUser.fullName,
                email:newUser.email,
                profilePic:newUser.profilePic,
            })
        }
        else{
            res.status(400).json({
                message:"Invalid User Data"
            })
        }
    }
    catch(err){
        console.log('Error while signUp ',err);
        res.status(500).json({
            message:'Error while SignUp'
        })
    }
};

export const loginController = async(req,res) =>{
    const {email,password} = req.body;
    try{
        const user = await User.findOne({email})

        if(!user){
            return res.status(400).json({
                message:'Invalid credentials'
            })
        }
        
        const isPasswordCorrect = await bcrypt.compare(password,user.password)
        
        if(!isPasswordCorrect){
            return res.status(400).json({
                message:'Invalid credentials'
            })
        }

        generateToken(user._id,res);

        res.status(201).json({
            message:'Login Successfully',
            fullName:user.fullName,
            email:user.email,
            profilePic:user.profilePic
        })

    }
    catch(err){
        console.log("Failed to Login");

        res.status(500).json({
            message:'Failed to Login'
        })
    }
};

export const logoutController = async(req,res) =>{
    try{
        res.cookie('jwt',"",{
            maxAge:0,
        })

        res.status(200).json({
            message:'Logout Successfully'
        })
    }
    catch(err){
        console.log("Failed to Logout");

        res.status(500).json({
            message:'Failed to Logout'
        })
    }
};

export const updateProfileController = async(req,res)=>{
    try{
        const {profilePic} = req.body;

        const userId = req.user._id;

        if(!profilePic){
            return res.status(400).json({
                message:'Profile Pic required'
            })
        }

        const uploadResponse = await cloudinary.uploader.upload(profilePic)
        const updatedUser = await User.findByIdAndUpdate(userId,{profilePic:uploadResponse.secure_url},{new:true});

        res.status(200).json(updatedUser)
    }
    catch(err){
        console.log('Error in profilePic Updated controller');
        res.status(401).json({
            message:'Failed to Update the profile pic'
        })
    }
};

export const checkAuthController = async(req,res)=>{
    try{
        res.status(200).json(req.user);
    }
    catch(err){
        console.log('Error in checkAuth controller ',err)
        res.status(500).json({
            messgae:'Failed to get user'
        })
    }
};