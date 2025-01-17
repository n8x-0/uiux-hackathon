import sanityClient from "@/sanity/sanity.client";
import { NextResponse } from "next/server";

export async function GET() {
    const data = await sanityClient.fetch(`*[_type=="product"]`)

    return NextResponse.json(data, { status: 200 })
}

export async function DELETE() {
    const productsToDelete = await sanityClient.fetch(`*[_type == "product" && defined(ratingCount)]._id`)

    if (productsToDelete.length === 0) {
        console.log("No products with 'ratingCount' field found.");
        return;
    }

    for (const productId of productsToDelete) {
        await sanityClient.delete(productId);
        console.log(`Deleted product with ID: ${productId}`);
    }
    console.log("All products with 'ratingCount' field deleted successfully.");

    return NextResponse.json("success", {status: 200})
}