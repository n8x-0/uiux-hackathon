"use client"
import Link from "next/link";
import Image from "next/image";
import { handleJoinUsForm } from "@/utils/formhandlers/joinUsForm";
import { useRef, useState } from "react";
import { validateDOB, validateEmail, validatePassword, validateSingleName } from "@/utils/formhandlers/validators";

const JoinUs = () => {
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false)
    const maleRef = useRef<HTMLInputElement>(null);
    const femaleRef = useRef<HTMLInputElement>(null);
    const [formdata, setFormData] = useState({
        email: "",
        password: "",
        firstname: "",
        lastname: "",
        dob: "",
        country: "",
        gender: ""
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target

        try {
            if (name === "firstname" || name === "lastname") {
                validateSingleName(value)
            } else if (name === "email") {
                validateEmail(value)
            } else if (name === "password") {
                validatePassword(value)
            } else if (name === "dob") {
                validateDOB(value)
            }
            setError(null)
        } catch (error) {
            setError(error instanceof Error ? error.message : String(error))
        }

        setFormData({
            ...formdata,
            [name]: value
        });
    }

    const handleJoinUsFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        try {
            await handleJoinUsForm(formdata)
            setError(null)
        } catch (error) {
            setLoading(false)
            setError(error instanceof Error ? error.message : String(error));
        }
    }

    return (
        <div className="w-full flex justify-center items-center min-h-[80vh] p-3 text-[#8D8D8D]">
            <div className="sm:w-[400px] w-full flex justify-center items-center flex-col sm:gap-6 gap-4">
                <div className="w-14 h-10">
                    <Image src={"/logo.webp"} alt="" width={600} height={600} className="w-full h-full object-contain" />
                </div>
                <h1 className="sm:text-4xl text-3xl font-medium text-center px-2 text-[#111]">BECOME A NIKE MEMBER</h1>
                <p className="text-center sm:text-sm text-xs">
                    Create your Nike Member profile and get first access to the very best of Nike products, inspiration, and community.
                </p>
                <form className="mt-6 space-y-4" onSubmit={handleJoinUsFormSubmit}>
                    <input
                        onChange={handleChange}
                        value={formdata.email}
                        name="email"
                        type="email"
                        placeholder="Email address"
                        className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm focus:ring-2 focus:ring-black focus:outline-none"
                    />
                    <input
                        onChange={handleChange}
                        value={formdata.password}
                        name="password"
                        type="password"
                        placeholder="Password"
                        className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm focus:ring-2 focus:ring-black focus:outline-none"
                    />
                    <input
                        onChange={handleChange}
                        value={formdata.firstname}
                        name="firstname"
                        type="text"
                        placeholder="First Name"
                        className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
                    />
                    <input
                        onChange={handleChange}
                        value={formdata.lastname}
                        name="lastname"
                        type="text"
                        placeholder="Last Name"
                        className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm focus:ring-2 focus:ring-black focus:outline-none"
                    />
                    <div>
                        <input
                            onChange={handleChange}
                            value={formdata.dob}
                            name="dob"
                            type="date"
                            className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm focus:ring-2 focus:ring-black focus:outline-none"
                        />
                        <p className="text-xs text-gray-500 mt-1">
                            Get a Nike Member Reward every year on your Birthday.
                        </p>
                    </div>
                    <select
                        onChange={handleChange}
                        name="country"
                        className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm text-gray-700 focus:ring-2 focus:ring-black focus:outline-none"
                    >
                        <option value="PK">Pakistan</option>
                        <option value={"IN"}>India</option>
                        <option value={"US"}>USA</option>
                        <option value={"UK"}>UK</option>
                    </select>
                    <div className="flex gap-4">
                        <input
                            onChange={handleChange} type="radio" name="gender" id="abcd" value={"male"} ref={maleRef} className="hidden" />
                        <input
                            onChange={handleChange} type="radio" name="gender" id="efgh" value={"female"} ref={femaleRef} className="hidden" />
                        <button onClick={() => { maleRef.current?.click() }}
                            type="button"
                            className="flex-1 border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:bg-gray-200"
                        >
                            Male
                        </button>
                        <button onClick={() => { femaleRef.current?.click() }}
                            type="button"
                            className="flex-1 border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:bg-gray-200"
                        >
                            Female
                        </button>
                    </div>
                    <div className="flex items-start space-x-2">
                        <input
                            type="checkbox"
                            className="mt-1 border border-gray-300 rounded-sm text-black focus:ring-black"
                        />
                        <p className="text-xs text-gray-600">
                            Sign up for emails to get updates from Nike on products, offers and your Member benefits.
                        </p>
                    </div>
                    <p className="text-xs text-gray-500 px-3 text-center">
                        By creating an account, you agree to Nike&apos;s<br />
                        <Link href="#" className="underline">
                            Privacy Policy
                        </Link>{" "}
                        and{" "}
                        <Link href="#" className="underline">
                            Terms of Use
                        </Link>.
                    </p>
                    <button
                        disabled={error ? true : false}
                        type="submit"
                        className={`w-full ${error ? "bg-zinc-200 text-zinc-400" : "bg-black text-white"} rounded-md px-4 py-2 text-sm font-semibold focus:outline-none ${!error && "hover:bg-gray-800"}`}
                    >
                        {loading ? <div className="w-6 h-6 rounded-full border-2 border-t-zinc-500 border-white animate-spin m-auto"></div> : "JOIN US"}
                    </button>
                    {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                </form>
                <p className="text-sm text-center text-gray-600 mt-6">
                    Already a Member?&nbsp;
                    <Link href="/signin" className="underline">
                        Sign In
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default JoinUs;
