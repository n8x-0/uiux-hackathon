"use client"

import Image from "next/image"
import Actionbtns from "./actionbtns"
import { useEffect, useState } from "react"
import { GetCartProductData } from "@/sanity/sanity.query"
import { Product } from "@/utils/product"
import Cartquantitycontroller from "./quantityController"

const MapItems = ({ items, storagename, totalState }: { items: string[] | null, storagename: string, totalState?: (value: number | undefined) => void }) => {
    const [prodcutData, setProductData] = useState<Product[] | null>(null);
    const [priceQuantities, setPriceQuantities] = useState<{ [id: string]: number }>({});

    useEffect(() => {
        const initializeItems = async () => {
            if (!items || items.length === 0) {
                setProductData(null)
                console.log("No items to fetch.");
                return;
            }

            try {
                const fetchedData = await GetCartProductData({ ids: items });
                setProductData(fetchedData);
            } catch (error) {
                console.error("Error fetching product data:", error);
            }
        };

        initializeItems();
    }, [items]);

    useEffect(() => {
        if (prodcutData && totalState) {
            const totalAmount = Object.values(priceQuantities).reduce((acc, curr) => acc + curr, 0);
            totalState(totalAmount);
        }
    }, [priceQuantities, prodcutData, totalState, items]);

    const handlePriceQuantityUpdate = (id: string, total: number) => {
        setPriceQuantities((prev) => ({
            ...prev,
            [id]: total,
        }));
    };

    return (
        <div className="w-full">
            {prodcutData && prodcutData.length > 0 ? (
                prodcutData.map((data) => (
                    <div className="w-full flex justify-between items-start py-8 border-b" key={data._id}>
                        <div className="flex gap-3">
                            <div className="w-36 h-36">
                                <Image src={data.image.url} alt="" width={600} height={600} className="w-full h-full object-contain" />
                            </div>
                            <div className="text-[#757575] flex flex-col justify-between">
                                <div>
                                    <h3 className="sm:text-lg font-medium text-[#111]">{data.productName}</h3>
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
                        <div>
                            {storagename === "bagitems" && (
                                <Cartquantitycontroller
                                    price={data.price}
                                    priceIntoQuantity={(total) => handlePriceQuantityUpdate(data._id, total)}
                                />
                            )}
                        </div>
                    </div>
                ))
            ) : (
                <h1 className="text-2xl text-[#111] font-thin my-auto animate-bounce">There are no items saved.</h1>
            )}
        </div>
    );
};

export default MapItems;