"use server"

import bcrypt from "bcryptjs";
import { User } from "../types";
import { signIn } from "@/auth";
import sanityClient from "@/sanity/sanity.client";
import { redirect } from "next/navigation";

export const handleJoinUsForm = async (submitedData: User) => {
    const { email, password, firstname, lastname, dob, country } = submitedData;

    if (!email || !password || !firstname || !lastname || !dob || !country) {
        throw new Error("All fields are required!")
    }

    submitedData.name = `${firstname} ${lastname}`;
    delete submitedData.firstname;
    delete submitedData.lastname;

    const passwordHash = bcrypt.hashSync(password, 10);
    submitedData.password = passwordHash;

    try {
        const user = await sanityClient.fetch(`*[_type == "user" && email == $email][0]`, { email });

        if (user) {
            throw new Error("Email already exists!")
        }
        await sanityClient.create({
            _type: "user",
            ...submitedData,
            orderHistory: []
        })

        try {
            await signIn("credentials", {
                redirect: false,
                callbackUrl: "/",
                email,
                password
            })
        } catch (error) {
            console.error("Error creating user:", error)
            throw new Error("Error signing in")
        }

    } catch (error) {
        console.error("Error creating user:", error)
        throw new Error("Error signing up")
    }

    redirect("/bag")
}

export const signInHandler = async (formData: { email: string, password: string }) => {
    const { email, password } = formData

    if (!email || !password) {
        throw new Error("All fields are required !")
    }

    try {
        await signIn("credentials", {
            redirect: false,
            email,
            password
        })
    } catch (error) {
        if (error) {
            throw new Error("Invalid credentials!")
        }
    }

    redirect("/bag")
}