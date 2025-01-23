"use client"
import { storage } from "@/context/context";
import { GetCartProductData } from "@/sanity/sanity.query";
import { Product } from "@/utils/product";
import Image from "next/image"
import { useContext, useEffect, useState } from "react";


const Ordersummary = () => {
    const contApi = useContext(storage);
    const { productQuantities, bagitems } = contApi!;

    const [productsList, setProductsList] = useState<Product[] | null>([]);
    const [totalAmount, setTotalAmount] = useState<number | null>(0);

    useEffect(() => {
        const initializeItems = async () => {
            if (!bagitems || bagitems.length === 0) {
                setProductsList(null)
                console.log("No items to fetch.");
                return;
            }

            if(!productQuantities){
                console.log("No product quantities found.");
                return
            }else{
                const totalAmount = productQuantities.reduce((acc, { total }) => acc + total, 0);                
                setTotalAmount(totalAmount)
            }

            try {
                const fetchedData = await GetCartProductData({ ids: bagitems as string[] });
                setProductsList(fetchedData);
            } catch (error) {
                console.error("Error fetching product data:", error);
            }
        };
        initializeItems();
    }, [])
    console.log(productQuantities, "Ordersummary");
    
    return (
        <div className="md:w-[420px] w-full md:px-6">
            <h1 className="text-2xl font-medium py-4">Order Summary</h1>
            <div className="space-y-4 py-4 text-zinc-500">
                <p className="flex justify-between items-center">
                    <span>Subtotal</span>
                    <span>$ {totalAmount?.toLocaleString()}.00</span>
                </p>
                <p className="flex justify-between items-center">
                    <span>Estimated Delivery & Handling</span>
                    <span>Free</span>
                </p>
                <p className="flex justify-between items-center py-4 text-base border-y text-[#111]">
                    <span>Total</span>
                    <span>$ {totalAmount?.toLocaleString()}.00</span>
                </p>
            </div>
            <p className="text-xs text-[#757575]">(The total reflects the price of your order, including all duties and taxes)</p>
            <div className="py-6 space-y-3">
                {!productsList ? <p>-</p> :
                    productsList.map((data, index) => {
                        return (
                            <div key={index} className="flex gap-2 items-start">
                                <div className="w-24 h-24">
                                    <Image src={data.image.url} alt="" width={600} height={600} className="w-full h-full object-contain" />
                                </div>
                                <div className="text-[#757575]">
                                    <p className="text-[#111]">{data.productName}</p>
                                    <p className="sm:text-sm xs:text-xs">Men&apos;s Short-Sleeve Running Top</p>
                                    <p className="sm:text-sm xs:text-xs">Ashen Slate/Cobalt Bliss</p>
                                    <span className="text-sm">${data.price} x{productQuantities.filter((prod)=> {return prod.id == data._id})[0].quantity}</span>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Ordersummary