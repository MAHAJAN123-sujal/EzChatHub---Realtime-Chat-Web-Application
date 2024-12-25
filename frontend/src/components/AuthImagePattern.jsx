import React from 'react'

const AuthImagePattern = ({title,subtitle}) => {
  return (
    <>
    <div className="hidden lg:flex justify-center items-center p-12 bg-base-300">
        <div className="max-w-md text-center">
            <h2 className='text-2xl font-bold mb-4 font-serif'>{title}</h2>
            <div className="grid grid-cols-3 gap-3 mb-8">
                {
                    [...Array(9)].map((_,i)=>(
                        <div key={i}
                        className={`aspect-square rounded-2xl bg-primary/80 ${i%2===0 ? 'animate-pulse': ''}`}
                        />
                    ))
                }
            </div>
            <p className='text-base-content/80'>{subtitle}</p>
        </div>
    </div>
    </>
  )
}

export default AuthImagePattern
