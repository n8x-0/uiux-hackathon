"use client";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useState } from "react";
// import { usePathname } from "next/navigation";
import Listroutes from "./listroutes";

const routes = [
    {
        name: "New & Featured",
        route: "/"
    },
    {
        name: "Men",
        route: "/"
    },
    {
        name: "Women",
        route: "/"
    },
    {
        name: "Kids",
        route: "/"
    },
    {
        name: "Sale",
        route: "/"
    },
    {
        name: "SNKRS",
        route: "/"
    },
]

const Listtoggle = () => {
    const [activeNavList, setActiveNavList] = useState(false)

    return (
        <div className="flex gap-1">
            <div className='text-2xl text-slate-800 lg:hidden block m-auto' onClick={() => activeNavList ? setActiveNavList(false) : setActiveNavList(true)}>
                <BsThreeDotsVertical />
            </div>
            {activeNavList && <div className='gap-2 text-nowrap px-8 py-5 items-start lg:hidden flex flex-col absolute right-0 top-full glass text-zinc-100 bg-black/45 rounded-md'>
                <Listroutes routes={routes}/>
            </div>}
        </div>
    )
}

export default Listtoggle