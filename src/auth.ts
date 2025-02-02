import NextAuth, { CredentialsSignin } from "next-auth"
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import bcrypt from "bcryptjs"
import sanityClient from "./sanity/sanity.client"


class InvalidCredErr extends CredentialsSignin {
    code = "Invalid Credentials!"
}
class NoUserFound extends CredentialsSignin{
    code = "Invalid Credentials, Please creaete account first."
}
class EmailUseByGoogleSignIn extends CredentialsSignin{
    code = "This email is used with google sign in."
}

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Google({
            clientId: process.env.AUTH_GOOGLE_ID,
            clientSecret: process.env.AUTH_GOOGLE_SECRET
        }),
        Credentials({
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "password", type: "password" }
            },
            authorize: async (credentials) => {
                const { email, password } = credentials;

                const user = await sanityClient.fetch(`*[_type == "user" && email == $email][0]`, { email });
                if(user && user.provider === "google"){
                    throw new EmailUseByGoogleSignIn()
                }
                if(!user){
                    throw new NoUserFound()
                }
                const isMatch = bcrypt.compareSync(password as string, user.password);
                if (!isMatch) {
                    throw new InvalidCredErr()
                }
                return user;
            }
        })
    ],

    callbacks: {
        async signIn({ user, account }) {
            if (account?.provider === "google") {
                const existingUser = await sanityClient.fetch(`*[_type == "user" && email == $email][0]`, { email: user.email });

                if (!existingUser) {
                    await sanityClient.create({
                        _type: "user",
                        provider: "google",
                        name: user.name,
                        email: user.email,
                        image: user.image,
                        orderHistory: []
                    })
                }
            }
            return true
        },

        async session({ session, token, }) {
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
    },
    pages: {
        signIn: '/signin',
    },

    session: {
        strategy: "jwt"
    },
})