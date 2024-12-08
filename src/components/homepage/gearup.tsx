import { BsChevronLeft, BsChevronRight } from "react-icons/bs"
import Card from "../card"

const womens = [
    {
        image: "/products/clothes/boxer.png",
        title: "Nike One Leak Protection: Period",
        category: "Women's Mid-Rise 18cm (approx.) Biker Shorts",
        colours: 2,
        price: "3,395",
        id: 5
    },
    {
        image: "/products/clothes/kalu.png",
        title: "Nike Sportswear",
        category: "Women's Ribbed Jersey Short-Sleeve Top",
        colours: 2,
        price: "3,295",
        id: 7
    },
    {
        image: "/products/shoes/shoe1.png",
        title: "Nike Air Max Pulse",
        category: "Women's Shoes",
        colours: 2,
        price: "13,995",
        id: 1
    },
]

const mens = [
    {
        image: "/products/shoes/shoe2.png",
        title: "Nike Air Max 97 SE",
        category: "Men's Shoes",
        colours: 2,
        price: "16,995",
        id: 2
    },
    {
        image: "/products/shoes/jordan.png",
        title: "Air Jordan XXXVII Low PF",
        category: "Men's Basketball Shoes",
        colours: 1,
        price: "16,295",
        id: 3
    },
    {
        image: "/products/clothes/neela.png",
        title: "Nike Dri-FIT Ready",
        category: "Men's Short-Sleeve Fitness Top",
        colours: 3,
        price: "2,495",
        id: 4
    },
]

const Gearup = () => {
    return (
        <div className="w-full md:flex items-start md:py-10 gap-8">
            <div className="lg:w-1/2 w-full">
                <div className="flex items-center gap-3 py-2 w-full justify-end px-6">
                    <span className="text-sm font-medium">Shop Men&apos;s</span>
                    <div className="w-12 h-12 rounded-full bg-zinc-100 text-zinc-400 flex justify-center items-center text-2xl p-1">
                        <BsChevronLeft />
                    </div>
                    <div className="w-12 h-12 rounded-full bg-zinc-100 text-zinc-400 flex justify-center items-center text-2xl p-1">
                        <BsChevronRight />
                    </div>
                </div>
                <div className="w-full h-full flex overflow-x-scroll gap-3">
                    <Card arr={womens} size="sm" />
                </div>
            </div>
            <div className="lg:w-1/2 w-full">
                <div className="flex items-center gap-3 py-2 w-full justify-end px-6">
                    <span className="text-sm font-medium">Shop Women&apos;s</span>
                    <div className="w-12 h-12 rounded-full bg-zinc-100 text-zinc-400 flex justify-center items-center text-2xl p-1">
                        <BsChevronLeft />
                    </div>
                    <div className="w-12 h-12 rounded-full bg-zinc-100 text-zinc-400 flex justify-center items-center text-2xl p-1">
                        <BsChevronRight />
                    </div>
                </div>
                <div className="w-full h-full flex overflow-x-scroll gap-3">
                    <Card arr={mens} size="sm" />
                </div>
            </div>
        </div>
    )
}

export default Gearup