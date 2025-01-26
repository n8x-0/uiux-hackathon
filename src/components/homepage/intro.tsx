import Image from 'next/image'
import React from 'react'


const Intro = ({children, introData}: {children?: React.ReactNode, introData: {image?: string, span?: string, title: string, para: string}}) => {
    return (
        <>
            <div className='w-full'>
                {introData.image ? <Image src={introData.image} alt="" width={1300} height={700} className="w-full h-full object-cover" /> : 
                <div className='w-full h-[500px] bg-[#F5F5F5]'></div>
                }
            </div>
            <div className='text-[#111] w-full flex justify-center items-center flex-col md:py-20 py-10'>
                <span className='font-medium'>{introData.span}</span>
                <h1 className='md:text-6xl text-5xl text-center font-medium tracking-tight'>{introData.title}</h1>
                <p className='text-sm py-5 sm:w-[550px] w-full px-2 text-center'>{introData.para}</p>
                <div className='flex items-center gap-3'>
                    {children}
                    
                </div>
            </div>
        </>
    )
}

export default Intro