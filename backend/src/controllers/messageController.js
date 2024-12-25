import User from "../models/userModel.js"
import Message from "../models/messageModel.js"
import cloudinary from '../lib/cloudinary.js'
import { getUserSocketId, io } from "../lib/socket.js";

export const getUserController = async(req,res)=>{
    try{
        const myId = req.user._id
        const otherUsers = await User.find({_id:{$ne:myId}}).select("-password"); // get all other others except myId
        // console.log(otherUsers)
        res.status(200).json(otherUsers);
    }
    catch(err){
        console.log('Error in getting users ',err);
        res.json(401).json({
            error:'Failed to get other Users'
        })
    }
};

export const getMessagesController = async(req,res)=>{
    try{
        const {id} = req.params
        const myId = req.user._id

        const messages = await Message.find({
            $or:[
                {senderId:myId,receiverId:id},
                {senderId:id, receiverId:myId}
            ]
        })

        res.status(200).json(messages)
    }
    catch(err){
        console.log('Failed to get messages ',err);
        res.status(401).json({
            message:'Error while getting messages'
        })
    }
};

export const sendMessagesController = async(req,res)=>{
    try{
        const {text,image}=req.body;
        const {id:receiverId} = req.params;
        const senderId = req.user._id;

        let imageUrl;

        if(image){
            const uploadResponse = await cloudinary.uploader.upload(image);
            imageUrl = uploadResponse.secure_url;
        }

        const newMessage= new Message({
            senderId,
            receiverId,
            text,
            image:imageUrl
        });

        await newMessage.save();
        
        // realtime chat functionality using socket.io
        const receiverSocketId = getUserSocketId(receiverId);
        if(receiverSocketId){
            io.to(receiverSocketId).emit('sendNewMessage',newMessage);
        }

        res.status(200).json(newMessage)
    }
    catch(err){
        console.log('Error in sendMessage controller', err);
        res.status(400).json({
            message:'Failed to send Message'
        })
    }
};