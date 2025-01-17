import { groq } from "next-sanity";
import sanityClient from "./sanity.client";

export async function GetProductData() {
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
}

export async function GetProductByCategory(para: string) {
    return sanityClient.fetch(
        groq`
        *[_type=="product" && lower(category) match lower("${para}*")]{
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
            }
        `
    )
}

export async function GetProductById(id: string) {
    return sanityClient.fetch(
        groq`
        *[_type=="product" && _id=="${id}"]{
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
            }
        `
    )
}
