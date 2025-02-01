import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs"
import sanityClient from "@/sanity/sanity.client";
import { signIn } from "@/auth";

export async function POST(request: NextRequest) {

    const formdata = await request.json();
    const { firstname, lastname, email, password } = formdata

    formdata.name = `${firstname} ${lastname}`;
    delete formdata.firstname;
    delete formdata.lastname;

    const passwordHash = bcrypt.hashSync(password, 10);
    formdata.password = passwordHash;

    try {
        const user = await sanityClient.fetch(`*[_type == "user" && email == $email][0]`, { email });

        if (user) {
            return NextResponse.json({ message: "This email is already in use." }, { status: 409 })
        }

        const newUser = await sanityClient.create({
            _type: "user",
            ...formdata,
            orderHistory: []
        })

        const res = await signIn("credentials", {
            redirect: false,
            redirectTo: "/account",
            email,
            password
        })

        return NextResponse.json({newUser, res}, { status: 200 })
    } catch (error) {
        console.error("Error creating user:", error)
        return NextResponse.json({message: error}, { status: 500 })
    }
}