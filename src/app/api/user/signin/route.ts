import { signIn } from "@/auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const formdata = await request.json()

    const {email, password} = formdata
    try {
        const res = await signIn("credentials", {
            redirect: false,
            redirectTo: "/account",
            email,
            password
        })

        console.log("signin route: ", res);
        return NextResponse.json(res, { status: 200 })
    } catch (error) {
        console.log("signin route: ",error);
        return NextResponse.json({message: "invalid credentials!"}, { status: 500 })
    }
}