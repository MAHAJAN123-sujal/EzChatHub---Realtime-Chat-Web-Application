import express from 'express';
import dotenv from 'dotenv'
import cors from 'cors'
import path from 'path'
import cookieParser from 'cookie-parser'
import {app,server,io} from './lib/socket.js'
dotenv.config();

const __dirname = path.resolve()

import authRoutes from './routes/authRoute.js'
import messageRoutes from './routes/messageRoute.js'
import { connectDB } from './lib/db.js';


app.use(express.json())
app.use(cookieParser())
app.use(cors({
        origin:[
                'http://localhost:5173',
                'https://realtime-chat-app-mahajan.netlify.app'
        ],
        credentials:true,
    }))


app.use('/api/auth',authRoutes)
app.use('/api/message',messageRoutes)

if(process.env.NODE_MODE==='production'){
    app.use(express.static(path.join(__dirname,"../frontend/dist")))

    app.get('*',(req,res)=>{
        res.sendFile(path.join(__dirname,"../frontend","dist","index.html"));
    })
}

const port = process.env.PORT;
server.listen(port, ()=>{
    console.log(`server is running successfully on port ${port}`);
    connectDB()
});
