export interface Product {
    image: string;
    title: string;
    category: string;
    colours: number;
    categorySearch: string,
    price: number;
    id: number
}

export const productData: Product[] = [
    {
        image: "/products/shoes/shoe1.webp",
        title: "Nike Air Max Pulse",
        category: "Women's Shoes",
        categorySearch: "kids",
        colours: 2,
        price: 13995,
        id: 1
    },
    {
        image: "/products/shoes/shoe2.webp",
        title: "Nike Air Max 97 SE",
        category: "Men's Shoes",
        categorySearch: "women",
        colours: 2,
        price: 16995,
        id: 2
    },
    {
        image: "/products/shoes/jordan.webp",
        title: "Air Jordan XXXVII Low PF",
        category: "Men's Basketball Shoes",
        categorySearch: "men",
        colours: 1,
        price: 16295,
        id: 3
    },
    {
        image: "/products/clothes/neela.webp",
        title: "Nike Dri-FIT Ready",
        category: "Men's Short-Sleeve Fitness Top",
        categorySearch: "men",
        colours: 3,
        price: 2495,
        id: 4
    },
    {
        image: "/products/clothes/boxer.webp",
        title: "Nike One Leak Protection: Period",
        category: "Women's Mid-Rise 18cm (approx.) Biker Shorts",
        categorySearch: "women",
        colours: 2,
        price: 3395,
        id: 5
    },
    {
        image: "/products/shoes/wildhorse.webp",
        title: "Nike Wildhorse 8",
        category: "Women's Trail Running Shoes",
        categorySearch: "men",
        colours: 2,
        price: 11895,
        id: 6
    },
    {
        image: "/products/clothes/kalu.webp",
        title: "Nike Sportswear",
        category: "Women's Ribbed Jersey Short-Sleeve Top",
        categorySearch: "women",
        colours: 2,
        price: 3295,
        id: 7
    },
    {
        image: "/products/kids/image.png",
        title: "Nike Outdoor Play",
        category: "Older Kids' Oversized Woven Jacket",
        categorySearch: "kids",
        colours: 1,
        price: 3295,
        id: 8
    },
]