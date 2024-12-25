import React, { useState } from 'react'
import { useAuthStore } from '../store/useAuthStore'
import {CameraIcon, Mail, User} from 'lucide-react'

function ProfilePage() {
  const {authUser, isUpdatingProfile,updateProfile} = useAuthStore();
  const [selectedImage,setSelectedImage] = useState(null)

  const handleImageUpload = async(e) =>{
    const file = e.target.files[0];
    if(!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = async() =>{
      const image = reader.result;
      setSelectedImage(image);
      await updateProfile({profilePic:image});
    }
  }
  return (
    <div className=' pt-20'>
      <div className="max-w-2xl mx-auto p-4 py-8">

        <div className="bg-base-300 rounded-xl p-6 space-y-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold ">Profile</h1>
            <p className='mt-2 text-gray-400 text-md'>Your Profile Information</p>

            {/* Setting dp for the profile */}
            <div className="flex flex-col items-center gap-4">
              <div className="relative">
                <img src={selectedImage||authUser.profilePic ||"/images/profilePic.png"} alt="profilePic" className='my-3 size-32 rounded-full object-cover border-4'/>

                <label htmlFor="profilePic-upload" className={`absolute bottom-0 right-0 p-2 rounded-full cursor-pointer bg-gray-400 hover:scale-105 transition-all duration-200 ${isUpdatingProfile?'animate-pulse pointer-events-none':''}`}>
                    
                    <CameraIcon className='w-5 h-5 text-base-200'/>
                    <input type="file" id="profilePic-upload" className='hidden' accept='image/*' disabled={isUpdatingProfile} onChange={handleImageUpload}/>

                </label>
              </div>

              <p className="text-md text-base-300">
                {isUpdatingProfile?'Uploading':'Click the camera icon to update your profile photo'}
              </p>
            </div>

            <div className="my-6">

              <div className="my-4">
                <div className="flex items-center gap-2 text-gray-400">
                  <User/>
                  <span>Full Name</span>
                </div>
                <p className='p-3 bg-base-100 rounded-lg border flex'>{authUser?.fullName}</p>
              </div>

              <div className="my-4">
                <div className="flex items-center gap-2 text-gray-400">
                  <Mail/>
                  <span>Email</span>
                </div>
                <p className='p-3 bg-base-100 rounded-lg border flex'>{authUser?.email}</p>
              </div>

            </div>

            <div className="mt-6 bg-base-200 rounded-xl p-6">
              <h2 className="text-xl mb-4">Account Information</h2>
              <div className="my-3 text-md">

                <div className="flex items-center justify-between py-2 border-b ">
                  <span>Member Since</span>
                  <span>{authUser?.createdAt?.split("T")[0]}</span>
                </div>

                <div className="flex items-center justify-between py-2">
                  <span>Account Status</span>
                  <span className='text-green-500'>Active</span>
                </div>

              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  )
}

export default ProfilePage
