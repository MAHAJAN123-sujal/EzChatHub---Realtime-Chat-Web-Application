import {create} from 'zustand'
import {toast} from 'react-hot-toast'
import {axiosInstance} from  '../lib/axios'
import {useAuthStore} from './useAuthStore'

export const useChatStore = create((set,get) =>(
{
    messages:[],
    users:[],
    selectedUser:null,
    isUsersLoading:false,
    isMessagesLoading:false,

    getUsers : async()=>{
        set({isUsersLoading:true})
        try{
            const res = await axiosInstance.get('/api/message/users');
            set({users:res.data})
        }
        catch(err){
            toast.error(err.response.data.message)
        }
        finally{
            set({isUsersLoading:false});
        }
    },

    getMessages: async(userId) =>{
        set({isMessagesLoading:true})
        try{
            const res = await axiosInstance.get(`/api/message/${userId}`);
            set({messages:res.data});
        }
        catch(err){
            toast.error(err.response.data.message)
        }
        finally{
            set({isMessagesLoading:false})
        }
    },
    sendMessage: async (messageData) => {
        const { selectedUser, messages } = get();
        try {
            // console.log(messageData);
          const res = await axiosInstance.post(`/api/message/send/${selectedUser._id}`, messageData);
          set({ messages: [...messages, res.data] });
        } catch (error) {
          toast.error(error.response.data.message);
        }
    },
    subscribeToMessage: () =>{
        const {selectedUser} = get();
        if(!selectedUser) return;

        const socket = useAuthStore.getState().socket;

        socket.on('sendNewMessage',(newMessage)=>{
            if(newMessage.senderId !== selectedUser._id) return;
            set({messages:[...get().messages,newMessage]})
        })
    },
    unsubscribeToMessage:()=>{
        const socket = useAuthStore.getState().socket;
        socket.off('sendNewMessage')
    },
    setSelectedUser : (selectedUser) => set({selectedUser})
}
))