import { shipment } from "@/shipengine/config";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest){
    const params = await request.nextUrl.searchParams.get("labid") as string
    console.log(params);
    
    try {
        const details = await shipment.trackUsingLabelId(params)
        console.log(details);
        
        return NextResponse.json(details, {status: 200})
    } catch (error) {
        console.log("api/track GET: ", error);
        return NextResponse.json("Something went wrong", {status: 500})
    }
}