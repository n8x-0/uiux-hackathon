import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs"
import sanityClient from "./sanity/sanity.client"

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
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
                    throw new Error("Invalid Credentials!")
                }
                return user;
            }
        })
    ],

    callbacks: {
        async session({token, session}) {
            if (token) {
                session.user.id = token.id as string;
            }
            return session;
        },
        
        async jwt({ token, user }) {
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