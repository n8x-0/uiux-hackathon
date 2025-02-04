import sanityClient from "@/sanity/sanity.client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const id = await request.nextUrl.searchParams.get("userid")
    const query = `
        *[_type=="order" && customerID==$id]
        `
    const myorders = await sanityClient.fetch(query, { id })
    return NextResponse.json(myorders, { status: 200 })
}