import sanityClient from "@/sanity/sanity.client";
import { NextResponse } from "next/server";

export async function GET() {
    const data = await sanityClient.fetch(`*[_type=="product"]`)

    return NextResponse.json(data, { status: 200 })
}

export async function DELETE() {
    const productsToDelete = await sanityClient.fetch(`*[_type=="product"]`)

    if (productsToDelete.length === 0) {
        console.log("No products found.");
        return;
    }

    for (const productId of productsToDelete) {
        console.log(productId._id);
        await sanityClient.delete(productId._id);
        console.log(`Deleted product with ID: ${productId}`);
    }
    console.log("All products deleted successfully.");

    return NextResponse.json("success", {status: 200})
}