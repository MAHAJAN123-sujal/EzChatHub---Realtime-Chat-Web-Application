import React from 'react'
import { Users } from 'lucide-react'

const SidebarSkeleton = () => {
    const skeletonContacts = Array(8).fill(null)
  return (
    <div>
      <aside className='flex flex-col h-full w-20 md:w-56 lg:w-72 border-r border-base-300 transition-all duration-200'>
        <div className="border-b border-base-300 w-full p-5">
            <div className="flex items-center gap-2">
                <Users className='w-6 h-6 '/>
                <span className='hidden md:block'>Contacts</span>
            </div>
        </div>

        <div className="overflow-y-auto w-full py-3">
            {skeletonContacts.map((_,idx)=>(
                <div className="w-full p-3 flex items-center gap-3" key={idx}>
                    <div className="relative mx-auto lg:mx-0">
                        <div className='skeleton size-12 rounded-full'/>
                    </div>

                    <div className="hidden lg:block text-left min-w-0 flex-1">
                        <div className="skeleton h-4 mb-2 w-32"/>
                        <div className="skeleton h-3 2-16"/>
                    </div>

                </div>
            ))}
        </div>
      </aside>
    </div>
  )
}

export default SidebarSkeleton
