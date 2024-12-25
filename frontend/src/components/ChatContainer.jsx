import React, { useEffect, useRef } from 'react'
import { useChatStore } from '../store/useChatStore'
import ChatHeader from './ChatHeader'
import MessageInput from './MessageInput'
import MessageSkeleton from './MessageSkeleton'
import { useAuthStore } from '../store/useAuthStore'
import { formatTime } from '../lib/utils'

function ChatContainer() {
  const {selectedUser, messages,isMessagesLoading,getMessages,subscribeToMessage,unsubscribeToMessage}= useChatStore()
  const {authUser} = useAuthStore()
  const messageEndRef = useRef(null);

  useEffect(()=>{
    getMessages(selectedUser._id)
    subscribeToMessage();

    return () => unsubscribeToMessage()
  },[selectedUser._id,getMessages,subscribeToMessage,unsubscribeToMessage])

  useEffect(()=>{
    if(messageEndRef?.current && messages){
      messageEndRef.current.scrollIntoView({behavoir:'smooth'})
    }
  },[messages])

  if(isMessagesLoading){
    return(
      <div className="flex flex-1 flex-col overflow-auto">
          <ChatHeader/>
          <MessageSkeleton/>
          <MessageInput/>
      </div> 
    )
  }

  return (
    <div className='flex flex-1 flex-col overflow-auto'>
      <ChatHeader/>

      {/* Messages / conversation */}
      <div className="flex-1 overflow-y-auto p-3 space-y-4">
        {
          messages.map((message)=>(
            <div className={`chat ${message.senderId === authUser._id ? 'chat-end':'chat-start'}`} key={message._id}
            ref={messageEndRef}>
                <div className="avatar chat-image">
                  <div className="size-10 rounded-full border">
                    <img src={message.senderId===authUser._id?authUser.profilePic || 'images/profilePic.png':selectedUser.profilePic || 'images/profilePic.png'} alt="profilePic" className="" />
                  </div>
                </div>

                <div className="chat-header mb-1">
                    <time className='text-xs opacity-60 ml-1'>
                      {formatTime(message.createdAt)}
                    </time>
                </div>

                <div className="chat-bubble flex flex-col">
                  {message.image && (
                    <img src={message.image} alt="image" className="sm:max-w-[200px] rounded-md mb-2"/>
                  )}

                  {message.text && (
                    <p>{message.text}</p>
                  )}
                </div>
            </div>
          ))
        }
      </div>
      
      <MessageInput/>
      
    </div>
  )
}

export default ChatContainer
