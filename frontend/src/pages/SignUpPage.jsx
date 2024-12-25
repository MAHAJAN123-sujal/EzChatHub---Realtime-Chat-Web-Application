import React, { useState } from 'react'
import { useAuthStore } from '../store/useAuthStore'
import { Eye, EyeOff, Loader2, Lock, Mail, MessageSquare, User} from 'lucide-react';
import { Link } from 'react-router-dom';
import AuthImagePattern from '../components/AuthImagePattern';
import toast from 'react-hot-toast';

function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [formData,setFormData] = useState({
    fullName:"",
    email:"",
    password:""
  })

  const {signUp,isSigningUp} = useAuthStore();

  const validateForm = () =>{
    if(!formData.fullName.trim()) return toast.error('Full Name is required')
    if(!formData.email.trim()) return toast.error('Email is required')
    if(!/\S+@\S+\.\S+/.test(formData.email)) return toast.error('Invalid email Provided')
    if(!formData.password) return toast.error('Password is required')
    if(formData.password.length<6) return toast.error('Password must be at least 6 characters')

    return true
  }

  const handleSubmit = (e) =>{
    e.preventDefault();

    const success = validateForm();
    
    if(success===true){
      signUp(formData);
    }
  }
  return (
    <>
     <div className="min-h-screen grid lg:grid-cols-2 mt-10">
      {/* left side for user details */}
      <div className="flex justify-center items-center flex-col p-6 sm:p-12 bg-base-100">
        <div className="w-full max-w-md space-y-8">

          <div className="text-center mb-8">
            <div className="flex flex-col items-center gap-2 group">
              <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors cursor-pointer">
                <MessageSquare className='size-6 text-primary'/>
              </div>
              <h1 className='text-2xl font-bold mt-2'>Create Account</h1>
              <p className='text-base-content/70'>Get Started with free Account</p>
            </div>
          </div>

        <form onSubmit={handleSubmit} className='space-y-6'>
          <div className="flex flex-col">
            <label className='label'>
              <span className="label-text text-xl text-gray-400">Full Name</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className='size-5 text-base-content/40'/>
              </div>
              <input type="text" 
                className='input input-bordered w-full pl-10 text-base-content'
                placeholder='Sujal Mahajan'
                value={formData.fullName}
                onChange={(e)=> setFormData({...formData,fullName:e.target.value})}
              />
            </div>


            <label className='label'>
              <span className="label-text text-xl text-gray-400">Email</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className='size-5 text-base-content/40'/>
              </div>
              <input type="email" 
                className='input input-bordered w-full pl-10 text-base-content'
                placeholder='mahajan123@gmail.com'
                value={formData.email}
                onChange={(e)=> setFormData({...formData,email:e.target.value})}
              />
            </div>

            <label className='label'>
              <span className="label-text text-xl text-gray-400">Password</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className='size-5 text-base-content/40'/>
              </div>
              <input type={showPassword?'text':'password'}
                className='input input-bordered w-full pl-10 text-base-content font-serif'
                placeholder='******'
                value={formData.password}
                onChange={(e)=> setFormData({...formData,password:e.target.value})}
              />

              <button type="button"
                className='absolute inset-y-0 right-0 pr-3 flex items-center'
                onClick={()=>setShowPassword(!showPassword)}
              >
                {
                  showPassword?(
                    <Eye className='size-5 text-base-content/40'/>
                  ):(
                    <EyeOff className='size-5 text-base-content/40'/>
                      )
                }
              </button>
            </div>
          </div>

          <button type='submit' className='btn btn-accent w-full text-white text-lg font-serif' disabled={isSigningUp}>
            {
            isSigningUp?(
              <>
                <Loader2 className='size-5 animate-spin'/>
                Loading...
              </>
            ):(
                "Create Account"
            )
          }
          </button>
        </form>

        <div className="text-center">
            <p className="text-base-content/70">
              Already have an account?{" "}
              <Link to='/login' className='link link-primary'>
                Sign In
              </Link>
            </p>
        </div>

        </div>
      </div>

      {/* right side for decoration */}
      <AuthImagePattern 
        title="Join Fast & Secure way of Messaging"
        subtitle="Connect with friends, share moments and stay in touch with you loved ones"
      />

      </div> 
    </>
  )
}

export default SignUpPage
