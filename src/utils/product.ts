export interface Product {
    image: string;
    title: string;
    category: string;
    colours: number;
    price: string;
    id: number
}

export const productData: Product[] = [
    {
        image: "/products/shoes/shoe1.png",
        title: "Nike Air Max Pulse",
        category: "Women's Shoes",
        colours: 2,
        price: "13,995",
        id: 1
    },
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
    {
        image: "/products/clothes/boxer.png",
        title: "Nike One Leak Protection: Period",
        category: "Women's Mid-Rise 18cm (approx.) Biker Shorts",
        colours: 2,
        price: "3,395",
        id: 5
    },
    {
        image: "/products/shoes/wildhorse.png",
        title: "Nike Wildhorse 8",
        category: "Women's Trail Running Shoes",
        colours: 2,
        price: "11,895",
        id: 6
    },
    {
        image: "/products/clothes/kalu.png",
        title: "Nike Sportswear",
        category: "Women's Ribbed Jersey Short-Sleeve Top",
        colours: 2,
        price: "3,295",
        id: 7
    },
]