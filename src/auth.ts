import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs"
import sanityClient from "./sanity/sanity.client"
import GoogleProvider from "next-auth/providers/google"

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        }),
        Credentials({
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "password", type: "password" }
            },
            authorize: async (credentials) => {
                const { email, password } = credentials;

                const user = await sanityClient.fetch(`*[_type == "user" && email == $email][0]`, { email });
                const isMatch = bcrypt.compareSync(password as string, user.password)

                if (!user || !isMatch) {
                    throw new Error("Invalid cerdentials!")
                }
                return user;
            },
        }),
    ],

    callbacks: {
        // async signIn({ user, account, profile }) {
        //     if (account?.provider === "google") {
        //         const existingUser = await sanityClient.fetch(`*[_type == "user" && email == $email][0]`, { email: user.email });
        //         if (!existingUser) {
        //             try {
        //                 const createdUser = await sanityClient.create({
        //                     _type: "user",
        //                     name: user.name,
        //                     email: user.email,
        //                     dob: user.dob,
        //                     country: user.country,
        //                     gender: user.gender,
        //                     orderHistory: []
        //                 })
        //             } catch (error) {
        //                 console.error("Error creating user:", error)
        //                 throw new Error("Error signing in")
        //             }
        //         }
        //     }
        //     return true
        // },
        async session({token, session, user }) {
            if (token) {
                session.user.id = token.id as string;
            }
            return session;
        },
        
        async jwt({ token, user, account, profile }) {
            if (user) {
                const existingUser = await sanityClient.fetch(`*[_type == "user" && email == $email][0]`, { email: user.email });
                if (existingUser) {
                  token.id = existingUser._id.toString();
                }
              }
              return token;
        }
    }
})