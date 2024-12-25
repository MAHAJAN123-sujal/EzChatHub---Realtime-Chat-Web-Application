import React from 'react'
import { useAuthStore } from '../store/useAuthStore'
import {  LogOut, MessageSquare, Settings, User } from 'lucide-react';
import { Link } from 'react-router-dom';
function Navbar() {
  const {logout,authUser} =useAuthStore();
  return (
    <header className='bg-gray-900 border-b border-gray-950 fixed w-full top-0 z-40 backdrop-blur-lg p-1'>
      <div className="container mx-auto h-16 px-4 ">
        <div className="flex items-center h-full justify-between">

            <div className="flex items-center left-0">
                <Link to='/' className='flex items-center gap-3 transition-all'>
                  <div className="w-10 h-10 rounded-lg items-center justify-center bg-primary/20 hover:opacity-70">
                    <MessageSquare className='w-6 h-6 text-primary '/>
                  </div>
                  <h1 className="text-xl text-white">EzChatHub</h1>
                </Link>
            </div>

            <div className="flex items-center gap-3 right-0">
              <Link to='/settings' className='btn btn-sm gap-2 transition-colors'>
                <Settings className='w-5 h-5'/>
                <span className='hidden sm:inline'>settings</span>
              </Link>

              {authUser &&(
                <>
                  
                  <Link to='/profile' className='btn btn-sm gap-2 transition-colors'>
                    <User className='w-5 h-5'/>
                    <span className='hidden sm:inline'>profile</span>
                  </Link>

                  <button className='btn btn-sm gap-2 transition-colors' onClick={logout}>
                    <LogOut className='w-5 h-5'/>
                    <span className='hidden sm:inline'>logout</span>
                  </button>
                </>
              )}

            </div>

        </div>
      </div>
    </header>
  )
}

export default Navbar
