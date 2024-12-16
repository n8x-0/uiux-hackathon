"use client"

import { storage } from "@/context/context";
import { useContext, useEffect, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { FiHeart } from "react-icons/fi";


const Actionbtns = ({ id, storagename }: { id: number, storagename: string }) => {
    const data = useContext(storage)
    const [LikedItems, setLiked] = useState<boolean>()

    useEffect(() => {
        const favorites = data?.get("favitems")
        const liked = favorites?.includes(id) as boolean
        setLiked(liked)
    }, [data,id])

    return (

        <>
            {storagename === "bagitems" && <FiHeart className={`cursor-pointer ${LikedItems && "text-red-500"}`} onClick={() => {
                try {
                    data?.set(id, "favitems")
                    setLiked(true)
                } catch (err) {
                    if (err) {
                        data?.delete(id, "favitems")
                        setLiked(false)
                    }
                }
            }} />}
            <AiOutlineDelete onClick={() => data?.delete(id, storagename)} />
        </>
    )
}

export default Actionbtns