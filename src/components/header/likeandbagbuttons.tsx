"use client"

import { storage } from '@/context/context'
import Link from 'next/link'
import { useContext } from 'react'
import { CiHeart } from 'react-icons/ci'
import { IoBagOutline } from 'react-icons/io5'


const Likeandbagbuttons = () => {
    const data = useContext(storage)
    
    return (
        <>
            <Link href={"/bag"} className='w-6 h-6 sm:w-8 sm:h-8 overflow-hidden text-3xl flex justify-center items-center relative'>
                <CiHeart className="" />
                <span className="absolute rounded-full bg-red-500 top-1 right-0 text-white text-[0.6rem] font-bold w-[0.8rem] h-[0.8rem] flex justify-center items-center">{data?.favitems?.length ?? 0}</span>
            </Link>
            <Link href="/bag" className='w-6 h-6 sm:w-8 sm:h-8 overflow-hidden text-2xl flex justify-center items-center relative'>
                <IoBagOutline className="" />
                <span className="absolute rounded-full bg-red-500 top-1 right-0 text-white text-[0.6rem] font-bold w-[0.8rem] h-[0.8rem] flex justify-center items-center">{data?.bagitems?.length ?? 0}</span>
            </Link>
        </>
    )
}

export default Likeandbagbuttons

