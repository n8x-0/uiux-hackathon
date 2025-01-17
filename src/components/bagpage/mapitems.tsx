"use client"

// import { productData } from "@/utils/product"
import Image from "next/image"
import Actionbtns from "./actionbtns"
import { useEffect, useState } from "react"
import { GetProductData } from "@/sanity/sanity.query"
import { Product } from "@/utils/product"

const MapItems = ({ items, storagename, totalState }: { items: string[] | null, storagename: string, totalState?: (value: number | undefined) => void }) => {
    const [productData, setProductData] = useState<Product[]>([]);
    const [itemsData, setItemsData] = useState<Product[] | null>(null);
    useEffect(() => {
        const initalizeItems = async () => {
            const fetchedData = await GetProductData();
            setProductData(fetchedData);
        };
        initalizeItems();
    }, []);

    useEffect(() => {
        if (productData.length > 0 && items) {
            const filteredItems = productData.filter((data) => items.includes(data._id));
            setItemsData(filteredItems);
            const total = filteredItems.reduce((acc, data) => acc + data.price, 0);
            if (totalState) {
                totalState(total);
            }
        }
    }, [productData, items]);

    return (
        <div className="w-full">
            {itemsData && itemsData.length >= 0 ? itemsData.map((data, index) => {
                return (
                    <div className="w-full flex justify-between items-start py-8 border-b" key={index}>
                        <div className="flex gap-3">
                            <div className="w-36 h-36">
                                <Image src={data.image.url} alt="" width={600} height={600} className="w-full h-full object-contain" />
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
                                    <Actionbtns id={data._id} storagename={storagename} />
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