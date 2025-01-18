import { BsChevronLeft, BsChevronRight } from "react-icons/bs"
import Card from "../card"
import { GetProductByCategory } from "@/sanity/sanity.query"


const Gearup = async () => {
    const womens = await GetProductByCategory("Women's")
    const mens = await GetProductByCategory("Men's")
    return (
        <div className="w-full md:flex items-start md:py-10 gap-8">
            <div className="lg:w-1/2 w-full">
                <div className="flex items-center gap-3 py-2 w-full justify-end px-6">
                    <span className="text-sm font-medium">Shop Men&apos;s</span>
                    <div className="md:w-12 md:h-12 w-8 h-8 rounded-full bg-zinc-100 text-zinc-400 flex justify-center items-center md:text-2xl text-lg p-1">
                        <BsChevronLeft />
                    </div>
                    <div className="md:w-12 md:h-12 w-8 h-8 rounded-full bg-zinc-100 text-zinc-400 flex justify-center items-center md:text-2xl text-lg p-1">
                        <BsChevronRight />
                    </div>
                </div>
                <div className="w-full h-full flex overflow-x-scroll gap-3">
                    <Card arr={mens} size="sm" />
                </div>
            </div>
            <div className="lg:w-1/2 w-full">
                <div className="flex items-center gap-3 py-2 w-full justify-end px-6">
                    <span className="text-sm font-medium">Shop Women&apos;s</span>
                    <div className="md:w-12 md:h-12 w-8 h-8 rounded-full bg-zinc-100 text-zinc-400 flex justify-center items-center md:text-2xl text-lg p-1">
                        <BsChevronLeft />
                    </div>
                    <div className="md:w-12 md:h-12 w-8 h-8 rounded-full bg-zinc-100 text-zinc-400 flex justify-center items-center md:text-2xl text-lg p-1">
                        <BsChevronRight />
                    </div>
                </div>
                <div className="w-full h-full flex overflow-x-scroll gap-3">
                    <Card arr={womens} size="sm" />
                </div>
            </div>
        </div>
    )
}

export default Gearup