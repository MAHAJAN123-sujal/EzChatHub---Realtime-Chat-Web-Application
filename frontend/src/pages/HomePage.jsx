import React from 'react'
import { useChatStore } from '../store/useChatStore'
import Sidebar from '../components/Sidebar'
import NoChatSelected from '../components/NoChatSelected'
import ChatContainer from '../components/ChatContainer'

function HomePage() {
  const {selectedUser} = useChatStore()
  return (
    <div className='h-screen bg-base-200'>
      <div className="flex pt-20 px-5 items-center justify-center">
        <div className="bg-base-100 rounded-xl shadow-xl w-full max-w-6xl  h-[calc(100vh-8rem)]">
            <div className="flex h-full rounded-xl overflow-hidden">
              <Sidebar/>

              {!selectedUser ? <NoChatSelected/>:<ChatContainer/>}
            </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage
