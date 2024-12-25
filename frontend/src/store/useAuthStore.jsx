import { create } from "zustand";
import {axiosInstance} from '../lib/axios.js'
import toast from "react-hot-toast";
import {io} from 'socket.io-client'

const baseURL = import.meta.env.MODE==='development'?'http://localhost:5001':'/'

export const useAuthStore = create((set,get)=>({
    authUser:null,

    isSigningUp:false,
    isLoggingIn:false,
    isUpdatingProfile:false,
    isCheckingAuth:true,
    onlineUsers:[],
    socket:null,

    checkAuth : async() =>{
        try{
            const res = await axiosInstance.get('/api/auth/check');
            set({authUser:res.data})
            get().connectSocket()
        }
        catch(err){
            console.log('Error while checking auth ',err)
            set({authUser:null})
        }
        finally{
            set({isCheckingAuth:false})
        }
    },

    signUp : async(data) => {
        set({isSigningUp:true})
        try{
            const res = await axiosInstance.post('/api/auth/signup',data);
            set({authUser:res.data})
            toast.success('Account created successfully');
            get().connectSocket()
        }
        catch(err){
            toast.error(err.response.data.message)
        }
        finally{
            set({isSigningUp:false})
        }
    },

    logout : async() => {
        try{
            await axiosInstance.post('/api/auth/logout');
            set({authUser:null})
            toast.success('Logout Successfully');
            get().disconnectSocket();
        }
        catch(err){
            toast.error(err.response.data.message);
        }
    },

    login : async(data) =>{
        set({isLoggingIn:true})
        try{
            const user = await axiosInstance.post('/api/auth/login',data);
            set({authUser:user});
            toast.success('Login Successfully');
            // to get the connectSocket function from outside functions
            get().connectSocket();
        }
        catch(err){
            toast.error(err.response.data.message)
        }
        finally{
            set({isLoggingIn:false})
        }
    },

    updateProfile : async(data) =>{
        set({isUpdatingProfile:true});
        try{
            const res = await axiosInstance.put('api/auth/update-profile',data);
            set({authUser:res.data});
            toast.success('Profile Updated Successfully')
        }
        catch(err){
            toast.error(err.response.data.message)
        }
        finally{
            set({isUpdatingProfile:false})
        }
    },

    connectSocket: () =>{
        const {authUser} = get();
        // if (not authenticated) or (already connection is made) , so no need for connection establishment
        if(!authUser || get().socket?.connected) return;
        const socket = io(baseURL, {
            query:{
                userId:authUser._id,
            }
        });
        socket.connect();

        set({socket:socket})

        socket.on('getOnlineUsers',(userIds)=>{
            set({onlineUsers:userIds});
        })
    },
    disconnectSocket: () =>{
        if(get().socket?.connected){
            get().socket.disconnect();
        }
    },

}))