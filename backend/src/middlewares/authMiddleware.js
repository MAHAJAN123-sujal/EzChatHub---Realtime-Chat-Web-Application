import jwt from 'jsonwebtoken'
import User from '../models/userModel.js'


export const protectRoute = async(req,res,next) =>{
    try{
        // check if token exists as of now
        const token = req.cookies.jwt

        if(!token){
            return res.status(401).json({
                messgae:'Unauthorized - No token available'
            })
        }

        const decoded = jwt.verify(token,process.env.JWT_SECRET)

        if(!decoded){
            return res.status(401).json({
                message:"Unauthorized - Invalid token"
            })
        }

        // iftoken is verified, then select all info of that user exceot the password field
        const user = await User.findById(decoded.userId).select("-password")

        if(!user){
            return res.status(404).json({
                message:'User Not found'
            })
        }

        req.user = user;

        next()
    }
    catch(err){
        console.log('Error in protectRoute middleware ',err);
        res.status(401).json({
            message:'Failed to authorise user'
        })
    }
}
