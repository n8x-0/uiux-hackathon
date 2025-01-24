"use server"

import bcrypt from "bcryptjs";
import { validateDOB, validateEmail, validatePassword, validateSingleName } from "./validators";
import { User } from "../types";
import { signIn } from "@/auth";
import sanityClient from "@/sanity/sanity.client";
import { redirect } from "next/navigation";

export const handleJoinUsForm = async (data: User) => {
    const { email, password, firstname, lastname, dob, country } = data;

    if (!email || !password || !firstname || !lastname || !dob || !country) {
        throw new Error("All fields are required!")
    }

    validateSingleName(firstname);
    validateSingleName(lastname);
    validateEmail(email);
    validatePassword(password);
    validateDOB(dob);

    data.name = `${firstname} ${lastname}`;
    delete data.firstname;
    delete data.lastname;

    const passwordHash = bcrypt.hashSync(password, 10);
    data.password = passwordHash;

    try {
        const user = await sanityClient.fetch(`*[_type == "user" && email == $email][0]`, { email });

        if (user) {
            throw new Error("Email already exists!")
        }
        await sanityClient.create({
            _type: "user",
            ...data,
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

export const signInHandler = async (formData: FormData) => {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!email || !password) {
        throw new Error("All fields are required !")
    }
    validateEmail(email)

    try {
        await signIn("credentials", {
            redirect: false,
            callbackUrl: "/",
            email,
            password
        })
    } catch (error) {
        console.log(error);
        throw new Error(`Something went wrong!`)
    }

    redirect("/bag")
}