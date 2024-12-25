import React from 'react'
import { useThemeStore } from '../store/useThemeStore'
import {THEMES} from '../constants'
import { Send } from 'lucide-react'

const Preview_Message = [
  {
    id:1,
    content:"Hey! How it's going" ,
    isSent:false
  },

  {
    id:2,
    content:"It's all great. Just Working on some New Projects",
    isSent:true
  },
]
function SettingsPage() {
  const {theme,setTheme} = useThemeStore()
  return (
    <div className='min-h-screen container mx-auto px-4 pt-20 max-w-5xl'>
        <div className="my-6">

          <div className="flex flex-col gap-1 items-center justify-center">
            <h1 className="text-3xl">Themes</h1>
            <p className="text-xl text-gray-500">Choose a theme for your Chat UI</p>
          </div>

          <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2 my-8">
            {THEMES.map((t)=>(
                <button key={t} className={`flex flex-col items-center gap-1.5 p-2 rounded-xl transition-colors ${theme===t?'bg-gray-600':'hover:bg-gray-400'} `}  onClick={()=> setTheme(t)}>
                  
                  <div className="relative h-8 w-full rounded-lg overflow-hidden" data-theme={t}>
                    <div className="absolute inset-0 grid grid-cols-4 gap-px p-1">
                      <div className="bg-primary rounded"></div>
                      <div className="bg-secondary rounded"></div>
                      <div className="bg-accent rounded"></div>
                      <div className="bg-neutral rounded"></div>
                    </div>
                  </div>

                  <span className='text-sm truncate w-full text-center'>
                    {t.charAt(0).toUpperCase() + t.slice(1)}
                  </span>

                </button>
            ))}
          </div>
          
          <h1 className="text-xl mb-3 font-semibold">Preview</h1>
          <div className="bg-base-100 rounded-xl border border-base-200 overflow-hidden shadow-xl my-3">
            <div className="p-4 bg-base-300">
              <div className="max-w-lg mx-auto">
                
                <div className="bg-base-100 rounded-xl shadow-ms overflow-hidden">

                  <div className="p-4 border-b border-base-300 bg-base-200">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-content ">
                        M
                      </div>
                      <div className="">
                        <p className="text-md">Mahajan</p>
                        <p className="text-xs text-green-500">Online</p>
                      </div>
                    </div>
                  </div>
             
                  <div className="my-4 p-4 min-h-52 max-h-52 overflow-y-auto bg-base-100">
                      {
                        Preview_Message.map((message)=>(
                          <div className={`flex my-4 ${message.isSent?'justify-end':'justify-start'}`} key={message.id}>
                            <div className={`max-w-[80%] rounded-xl p-3 shadow-sm ${message.isSent?'bg-primary text-primary-content':'bg-base-200'}`}>
                              <p className="text-md">{message.content}</p>
                              <p className={`text-sm mt-1.5 ${message.isSent?'text-primary-content/70':'text-base-content/70'}`}>03:45 PM</p>
                            </div>
                          </div>
                        ))
                      }
                  </div>
                  
                  <div className="p-4 border-t border-base-300 bg-base-100">
                    <div className="flex gap-2">
                      <input type="text" 
                        className='input input-bordered flex-1 text-sm h-10'
                        placeholder='Type a message...'
                        readOnly
                      />
                      <button className='btn btn-primary h-10 min-h-0'>
                        <Send size={18}/>
                      </button>
                    </div>
                  </div>

                </div>
              </div>
            </div>

          </div>

      </div>
    </div>
  )
}

export default SettingsPage
