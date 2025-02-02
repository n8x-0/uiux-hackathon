"use client";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useState } from "react";
import Listroutes from "./listroutes";
import Image from "next/image";
import { useSession } from "next-auth/react";

const Listtoggle = ({ icon }: { icon: "window" | "dots"}) => {
    const [activeNavList, setActiveNavList] = useState(false)
    const {data: session} = useSession()
    const userid = session?.user?.id
    const routes = [
        {
            name: "Account",
            route: "/account"
        },
        {
            name: "My Orders",
            route: `/account/${userid}/myorders`
        },
        {
            name: "Order History",
            route: `/account/${userid}/orderhistory`
        },
        {
            name: "Products",
            route: "/products"
        },
        {
            name: "Internship",
            route: "/internship"
        },
        {
            name: "Membership",
            route: "/membership"
        },
        {
            name: "SNKRS",
            route: "/feed"
        },
    ]
    return (
        <div className="flex gap-1">
            {icon === "dots" ?
                <div className='text-2xl text-slate-800 m-auto' onClick={() => activeNavList ? setActiveNavList(false) : setActiveNavList(true)}>
                    <BsThreeDotsVertical />
                </div>
                :
                <div className="w-6 h-6" onClick={() => activeNavList ? setActiveNavList(false) : setActiveNavList(true)}>
                    <Image src={"/icons/snkrlisticon.png"} alt="" width={600} height={600} className="w-full h-full object-contain" />
                </div>
            }
            {activeNavList && <div className='gap-2 text-nowrap px-8 py-5 items-start flex flex-col absolute right-0 top-full glass text-zinc-100 bg-black/45 rounded-md z-50'>
                <Listroutes routes={routes} />
            </div>}
        </div>
    )
}

export default Listtoggle