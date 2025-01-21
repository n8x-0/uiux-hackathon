"use client"
import { useEffect, useState } from "react";
import { FaAngleUp, FaAngleDown } from "react-icons/fa6";

const Cartquantitycontroller = ({ price, priceIntoQuantity }: { price: number, priceIntoQuantity: (value: number) => void }) => {
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        priceIntoQuantity(price * quantity);
    }, [price, quantity]);

    return (
        <>
            <div className="col-span-1 m-auto border-2 xs:px-4 px-2 py-2 border-zinc-300 rounded-md flex xs:gap-4 gap-3 items-center justify-between mb-1">
                <span className="xs:text-base text-xs">{quantity.toString().length > 1 ? quantity : "0" + quantity}</span>
                <div className="flex flex-col xs:text-[0.6rem] text-[0.5rem]">
                    <span onClick={() => setQuantity((prev) => prev + 1)}>
                        <FaAngleUp />
                    </span>
                    <span onClick={() => setQuantity((prev) => (prev > 1 ? prev - 1 : 1))}>
                        <FaAngleDown />
                    </span>
                </div>
            </div>
            <div className="md:text-lg sm:text-sm xs:text-xs">
                MRP: ${(price * quantity).toLocaleString()}.00
            </div>
        </>
    );
};

export default Cartquantitycontroller;
