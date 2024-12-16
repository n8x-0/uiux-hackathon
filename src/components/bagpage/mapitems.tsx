"use client"

import { productData } from "@/utils/product"
import Image from "next/image"
import Actionbtns from "./actionbtns"
import { useEffect } from "react"

const MapItems = ({ items, storagename, totalState }: { items: number[] | null, storagename: string, totalState?: (value: number | undefined) => void }) => {

    const itemsData = items ? productData.filter((data) => items.includes(data.id)) : null
    const total = itemsData?.reduce((acc, data) => acc += data.price, 0)

    useEffect(() => {
        if (totalState) {
            totalState(total)
        }
    }, [itemsData])

    return (
        <div className="w-full">
            {itemsData && itemsData.length >= 0 ? itemsData.map((data, index) => {
                return (
                    <div className="w-full flex justify-between items-start py-8 border-b" key={index}>
                        <div className="flex gap-3">
                            <div className="w-36 h-36">
                                <Image src={data.image} alt="" width={600} height={600} className="w-full h-full object-contain" />
                            </div>
                            <div className="text-[#757575] flex flex-col justify-between">
                                <div>
                                    <h3 className="sm:text-lg font-medium text-[#111]">{data.title}</h3>
                                    <p className="sm:text-sm xs:text-xs">Men&apos;s Short-Sleeve Running Top</p>
                                    <p className="sm:text-sm xs:text-xs">Ashen Slate/Cobalt Bliss</p>
                                    <p className="flex gap-10 sm:text-sm xs:text-xs py-1">
                                        <span>Size L</span>
                                        <span>Quantity 1</span>
                                    </p>
                                </div>
                                <div className="flex items-center gap-3 text-[#111] text-xl">
                                    <Actionbtns id={data.id} storagename={storagename} />
                                </div>
                            </div>
                        </div>
                        <div className="md:text-lg sm:text-sm xs:text-xs">
                            MRP: ${data.price}.00
                        </div>
                    </div>
                )
            })
                : <h1 className='text-2xl text-[#111] font-thin my-auto animate-bounce'>There are no items saved.</h1>}
        </div>
    )
}

export default MapItems
