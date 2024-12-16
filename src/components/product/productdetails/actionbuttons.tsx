"use client"
import { storage } from "@/context/context";
import { useContext, useState } from "react"
import { FaCheck } from "react-icons/fa6";

const Actionbuttons = ({ id }: { id: number }) => {
    const [alredyExistBag, setAlredyExistBag] = useState<string | null>(null);
    const [alredyExistFav, setAlredyExistFav] = useState<string | null>(null);

    const data = useContext(storage)

    return (
        <div className='text-sm space-y-2'>
            <button className='w-full bg-[#111] py-4 text-white rounded-full' onClick={() => {
                try {
                    data?.set(id, "bagitems")
                    setAlredyExistBag("Added")
                    setTimeout(() => {
                        setAlredyExistBag(null)
                    }, 2000)
                } catch (err) {
                    setAlredyExistBag((err as Error).message)
                    setTimeout(() => {
                        setAlredyExistBag(null)
                    }, 2000)
                }
            }}>
                {alredyExistBag && <p className="anim flex items-center justify-center gap-1">{alredyExistBag} <FaCheck /></p>}
                {!alredyExistBag && <p className="animLinear">Add to bag</p>}
            </button>
            <button className='w-full border py-4 rounded-full hover:bg-red-500 hover:text-white transition-all' onClick={() => {
                try {
                    data?.set(id, "favitems")
                    setAlredyExistFav("Added")
                    setTimeout(() => {
                        setAlredyExistFav(null)
                    }, 2000)
                } catch (err) {
                    setAlredyExistFav((err as Error).message)
                    setTimeout(() => {
                        setAlredyExistFav(null)
                    }, 2000)
                }
            }}>
                {alredyExistFav && <p className="anim flex items-center justify-center gap-1">{alredyExistFav} <FaCheck /> </p>}
                {!alredyExistFav && <p className="animLinear">Favorites</p>}
            </button>
        </div>
    )
}

export default Actionbuttons