import React, { useEffect, useState } from 'react'
import { useChatStore } from '../store/useChatStore'
import SidebarSkeleton from './SidebarSkeleton'
import { Users } from 'lucide-react'
import { useAuthStore } from '../store/useAuthStore'

function Sidebar() {
  const {users,getUsers,selectedUser, setSelectedUser, isUsersLoading} = useChatStore()

  const {onlineUsers} = useAuthStore()
  const [showOnlineUsers,setShowOnlineUsers] = useState(false)

  useEffect(()=>{
    getUsers()
  },[getUsers])

  const currOnlineUsers = showOnlineUsers? ( users.filter((user)=>onlineUsers.includes(user._id)) ) : users;
  if(isUsersLoading) return <SidebarSkeleton/>
  return (
    <aside className='flex flex-col h-full w-20 md:w-56 lg:w-72 border-r border-base-300 transition-all duration-200'>
        <div className="border-b border-base-300 w-full p-5">
            <div className="flex items-center gap-2">
                <Users className='w-6 h-6 '/>
                <span className='hidden md:block'>Contacts</span>
            </div>

            {/* for online toggle */}
            <div className="mt-3 hidden md:flex items-center gap-2">
              <label className='cursor-pointer flex items-center gap-2'>
                <input type="checkbox" className="checkbox checkbox-sm"
                checked={showOnlineUsers} onChange={(e) => setShowOnlineUsers(e.target.checked)} />
                <span className='text-sm text-base-content/70'>Show Online Users Only</span>
              </label>
              {showOnlineUsers && (
                <span className="text-xs text-base-content/40">({onlineUsers.length-1} Online)</span>
              )}
            </div>

        </div>

        <div className="overflow-y-auto w-full py-3">
            {currOnlineUsers.map((user)=>(
                <button
                  key={user._id}
                  onClick={()=> setSelectedUser(user)}
                  className={`w-full p-3 flex items-center gap-3 hover:bg-base-300 transition-colors ${selectedUser?._id === user._id ? 'bg-base-300 ring-1 ring-base-300':''}`}
                >
                  <div className="relative left-0">
                    <img src={user.profilePic || '/images/profilePic.png'} alt={user.fullName} className="rounded-full object-cover size-10 " />
                    {onlineUsers.includes(user._id) && (
                        <span className="absolute bg-green-500 size-3 rounded-full ring-2 ring-gray-900 bottom-0 right-0"></span>
                      )}
                  </div>

                  <div className="hidden md:block text-left min-w-0">
                      <div className="truncate text-base-content">{user.fullName}</div>
                      <div className="text-sm text-gray-500">
                        {onlineUsers.includes(user._id)?'Online':'Offline'}
                      </div>
                  </div>
                </button>
            ))}

            {(currOnlineUsers.length === 0) &&(
              <div className="text-center text-base-content py-4">No Online Users</div>  
            )}
        </div>
      </aside>
  )
}

export default Sidebar
