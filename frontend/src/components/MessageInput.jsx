import React, { useRef, useState } from 'react'
import { useChatStore } from '../store/useChatStore';
import {Image, Send, X} from 'lucide-react'
import toast from 'react-hot-toast';
import imageCompression from 'browser-image-compression'

function MessageInput() {
    const [text,setText] = useState("")
    const [imgPreview,setImagePreview] = useState(null)
    const fileInputRef = useRef(null);
    const {sendMessage} = useChatStore()

    const handleImageChange = async(e) =>{
      const file = e.target.files[0];
      if(!file.type.startsWith('image/')){
        toast.error('Please Select an Image File')
        return;
      }

      try {
        const options = {
          maxSizeMB: 0.1, 
          maxWidthOrHeight: 800, 
          useWebWorker: true, 
        };
    
        const compressedFile = await imageCompression(file, options);
        const compressedImageDataUrl = await imageCompression.getDataUrlFromFile(compressedFile);
    
        setImagePreview(compressedImageDataUrl);
        // console.log(`Compressed size: ${(compressedFile.size / 1024).toFixed(2)} KB`);
      } catch (error) {
        console.error("Image compression failed:", error);
        toast.error("Failed to compress the image. Please try again.");
      }
    }
    const removeImage = () =>{
      setImagePreview(null)
      if(fileInputRef.current) fileInputRef.current.value = "";
    };

    const handleSendMessage = async(e) => {
      e.preventDefault();
      if (!text.trim() && !imgPreview) return;
  
      try {
        await sendMessage({
          text: text.trim(),
          image: imgPreview,
        });
  
        // Clear form
        setText("");
        setImagePreview(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
      } catch (error) {
        console.error("Failed to send message:", error);
      }
    };
  return (
    <div className='p-4 w-full'>
      {imgPreview && (
        <div className="mb-3 flex flex-items gap-2">
            <div className="relative">
                <img src={imgPreview} alt="Preview" className="w-20 h-20 object-cover rounded-lg border border-base-200"/>
                <button className='absolute -top-1 -right-1 w-4 h-4 rounded-full bg-base-300 flex items-center justify-center' type="button" onClick={removeImage}>
                    <X className='size-3'/>
                </button>
            </div>
        </div>
      )}

      <form className="flex items-center gap-2" onSubmit={handleSendMessage}>
        <div className="flex flex-1 gap-2">
            <input type="text" className="w-full input input-bordered rounded-lg input-sm sm:input-md" 
            placeholder='Type a Message...' value={text} onChange={(e)=> setText(e.target.value)}/>

            <input type="file" className="hidden" accept='image/*' ref={fileInputRef} onChange={handleImageChange}/>
            <button type="button" onClick={() => fileInputRef.current?.click()} className={`${imgPreview?'text-emerald-500':'text-gray-500'} btn btn-circle`}>
                <Image size={20}/>
            </button>
        </div>

        <button type="submit" className='btn btn-sm btn-circle' disabled={!text.trim() && !imgPreview}>
          <Send size={22}/>
        </button>
      </form>
    </div>
  )
}

export default MessageInput
