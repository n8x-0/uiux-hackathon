"use client"

import Image from "next/image"
import Actionbtns from "./actionbtns"
import { useContext, useEffect, useState } from "react"
import { GetCartProductData } from "@/sanity/sanity.query"
import { Product } from "@/utils/product"
import Cartquantitycontroller from "./quantityController"
import { storage } from "@/context/context"

const MapItems = ({ items, storagename, totalState }: { items: string[] | null, storagename: string, totalState?: (value: number | undefined) => void }) => {
    const [prodcutData, setProductData] = useState<Product[] | null>(null);
    const [priceQuantities, setPriceQuantities] = useState<{id: string, total: number, quantity: number}[] | []>([]);
    const contApi = useContext(storage);

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
            try {
                const totalAmount = priceQuantities.reduce((acc, { total }) => acc + total, 0);
                totalState(totalAmount);
                contApi?.setProductQuantitiesMethod(priceQuantities)
            } catch (error) {
                console.error("Error calculating total amount:", error);
            }
        }
    }, [priceQuantities, prodcutData, totalState, items]);

    const handlePriceQuantityUpdate = (id: string, total: number, quantity: number) => {
        setPriceQuantities((prev) => {
            const updated = prev.filter(item => item.id !== id);
            return [...updated, { id, total, quantity }];
        });
    };

    const handleDeleteItem = (id: string) => {
        setPriceQuantities((prev) => {
            const updated = prev.filter(item => item.id !== id);
            return updated;
        });
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
                                    <Actionbtns id={data._id} storagename={storagename} onDelete={handleDeleteItem} />
                                </div>
                            </div>
                        </div>
                        <div>
                            {storagename === "bagitems" && (
                                <Cartquantitycontroller
                                    price={data.price}
                                    priceIntoQuantity={(total, quantity) => handlePriceQuantityUpdate(data._id, total, quantity)}
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