import { groq } from "next-sanity";
import sanityClient from "./sanity.client";

export async function GetProductData() {
    try {
        return sanityClient.fetch(
            groq`
            *[_type=="product"]{
                _id,
                title,
                category,
                description,
                price,
                size,
                inventory,
            productName,
            colors,
            status,
            "image": image.asset->
            }`
        )
    } catch (error) {
        console.log("Error fetching product data:", error);
    }
}

export async function GetProductByCategory(para: string) {
    try {
        return sanityClient.fetch(
            groq`
        *[_type=="product" && lower(category) match lower("${para}*")]{
            _id,
            category,
            description,
            price,
            size,
            inventory,
            productName,
            colors,
            status,
            "image": image.asset->
            }
        `
        )
    } catch (error) {
        console.log("Error fetching product data:", error);
    }
}

export async function GetProductById(id: string) {
    try {
        return sanityClient.fetch(
            groq`
        *[_type=="product" && _id=="${id}"]{
            _id,
            category,
            description,
            price,
            size,
            inventory,
            productName,
            colors,
            status,
            "image": image.asset->
            }
        `
        )
    } catch (error) {
        console.log("Error fetching product data:", error);
    }
}

export async function GetCartProductData(params: { ids: string[] }) {
    try {
        return sanityClient.fetch(
            groq`
            *[_type=="product" && _id in $ids]{
            _id,
            category,
            price,
            size,
            inventory,
            productName,
            colors,
            status,
            "image": image.asset->
            }
        `,
            params
        )
    } catch (error) {
        console.log("Error fetching product data:", error);
    }
}