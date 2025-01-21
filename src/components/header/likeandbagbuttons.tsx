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
                {(data?.favitems) ? data.favitems.length > 0 && <span className="absolute rounded-full bg-red-500 sm:top-1 top-0 right-0 text-white xs:text-[0.6rem] text-[0.5rem] font-bold xs:w-[0.8rem] xs:h-[0.8rem] w-[0.7rem] h-[0.7rem] flex justify-center items-center">{data?.favitems?.length}</span> : ""}
            </Link>
            <Link href="/bag" className='p-[2px] w-6 h-6 sm:w-8 sm:h-8 overflow-hidden text-2xl flex justify-center items-center relative'>
                <IoBagOutline className="" />
                {(data?.bagitems) ? data.bagitems.length > 0 && <span className="absolute rounded-full bg-red-500 sm:top-1 top-0 right-0 text-white xs:text-[0.6rem] text-[0.5rem] font-bold xs:w-[0.8rem] xs:h-[0.8rem] w-[0.7rem] h-[0.7rem] flex justify-center items-center">{data?.bagitems?.length}</span> : ""}
            </Link>
        </>
    )
}

export default Likeandbagbuttons

