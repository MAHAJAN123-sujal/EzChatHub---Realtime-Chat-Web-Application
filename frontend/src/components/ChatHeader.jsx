import React from 'react'
import { useChatStore } from '../store/useChatStore'
import { useAuthStore } from '../store/useAuthStore'
import {  X } from 'lucide-react'

function ChatHeader() {
const {selectedUser,setSelectedUser} = useChatStore()
const {onlineUsers} = useAuthStore()
  return (
    <div className='border-b p-3 border-base-300'>
        <div className="flex items-center justify-between">

            <div className="flex items-center gap-3">
                <div className="avatar">
                    <div className="size-12 rounded-full relative">
                        <img src={selectedUser.profilePic || '/images/profilePic.png'} />
                    </div>
                </div>

                <div>
                    <h3 className="text-base-content">{selectedUser.fullName}</h3>
                    <p className="text-base-content/60 text-sm">
                        {onlineUsers.includes(selectedUser._id)?'Online':'Offline'}
                    </p>
                </div>
            </div>

            <button onClick={() => setSelectedUser(null)}>
                <X/>
            </button>
        </div>
    </div>
  )
}

export default ChatHeader
