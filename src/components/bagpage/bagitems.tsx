"use client"

import { useContext, useState } from "react"
import MapItems from "./mapitems"
import { storage } from "@/context/context"
import Proceedcheckout from "./proceedcheckout"

const Bagitems = () => {

    const [total , setTotal] = useState<number | undefined>(0)
    const data = useContext(storage);
    
    return (
        <>
        <div className="flex-1 md:p-2">
            <div className="w-full rounded-lg bg-[#F5F5F5] py-3 px-5">
                <span className="text-lg font-medium">Free Delivery</span>
                <p className="text-sm">Applies to orders of ₹ 14 000.00 or more. <span className="underline ml-2">View details</span></p>
            </div>

            <h1 className="text-2xl font-medium py-4">Bag</h1>
            <MapItems items={data ? data.bagitems : null} storagename="bagitems" totalState={setTotal}/>
            <h1 className="text-2xl font-medium py-4">Favorites</h1>
            <MapItems items={data ? data.favitems : null} storagename="favitems"/>
        </div>
        <Proceedcheckout total={total}/>
        </>
    )
}

export default Bagitems