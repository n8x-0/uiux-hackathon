"use client"

import { signInHandler } from "@/utils/formhandlers/joinUsForm"
import { useSession } from "next-auth/react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"

const SignInComp = () => {
    const router = useRouter()
    const { data } = useSession()
    if (data?.user) router.back()

    const [error, setError] = useState<Error | null>(null)
    const [loading, setLoading] = useState<boolean>(false)

    const handleSignIn = async (e: React.FormEvent) => {
        e.preventDefault()
        const formData = new FormData(e.target as HTMLFormElement)
        try {
            await signInHandler(formData)
            setError(null)
            setLoading(true)
        } catch (error) {
            console.error("Error signing in:", error)
            setError(error as Error)
        }
    }
    return (
        <div className="w-full flex justify-center items-center min-h-[80vh] p-3">
            <div className="sm:w-[400px] w-full flex justify-center items-center flex-col sm:gap-6 gap-4">
                <div className="w-14 h-10">
                    <Image src={"/logo.webp"} alt="" width={600} height={600} className="w-full h-full object-contain" />
                </div>
                <h1 className="sm:text-4xl text-3xl font-medium text-center px-2">YOUR ACCOUNT FOR EVERYTHIN NIKE</h1>
                <form onSubmit={handleSignIn} className="space-y-5 text-[#8D8D8D]">
                    <input type="email" name="email" placeholder="Email Address" className="w-full focus:outline-none border rounded-md px-4 py-2" />
                    <input type="password" name="password" placeholder="Password" className="w-full focus:outline-none border rounded-md px-4 py-2" />
                    <div className="w-full flex justify-between items-center">
                        <div className="flex items-center gap-2">
                            <input type="checkbox" className="w-4 h-4" />
                            <p>keep me sign in</p>
                        </div>
                        <span className="text-[#BCBCBC] text-sm">forgotten password?</span>
                    </div>
                    <p className="px-5 text-center sm:text-sm text-xs">
                        By logging in, you agree to Nike&apos;s Privacy Policy and Terms of Use.
                    </p>
                    <button type="submit" className="w-full bg-black text-white py-3">
                        {
                            loading ? <div className="w-6 h-6 rounded-full border-2 border-t-zinc-500 border-white animate-spin m-auto"></div> : "SIGN IN"
                        }
                    </button>
                    {error && <p className="text-red-500">{error.message}</p>}
                </form>
                <p className="text-[#8D8D8D]">Not a memeber? <Link href="/joinus" className="underline text-[#111]">Join Us</Link></p>
            </div>
        </div>
    )
}

export default SignInComp;