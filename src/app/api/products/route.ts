import sanityClient from "@/sanity/sanity.client";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
    const data = await sanityClient.fetch(`*[_type=="user"]`)

    return NextResponse.json(data, { status: 200 })
}

export async function DELETE(request: NextRequest) {
    const id = await request.json()
    const item = await sanityClient.delete(id);
    console.log(`Deleted with ID: ${item}`);
    console.log("deleted successfully.");

    return NextResponse.json(item, { status: 200 })
}