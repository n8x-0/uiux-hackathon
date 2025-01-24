"use client"
import { storage } from "@/context/context";
import { useContext, useState } from "react";
import { HiOutlineInboxArrowDown } from "react-icons/hi2"
import { handleCheckoutSubmit } from "@/utils/formhandlers/checkoutformhandler";
import { CountryCode, countryStates } from "@/utils/countrycodes";
import Link from "next/link";

const Formsection = () => {
    const contApi = useContext(storage);
    const { productQuantities } = contApi!;

    const [provinces, setProvinces] = useState<{ code: string, name: string }[]>([]);
    const [allowSubmit, setAllowSubmit] = useState<boolean>(false);
    const [error, setError] = useState<Error | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const handleCountryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedCountry = event.target.value;
        // setSelectedCountry(selectedCountry);
        if (selectedCountry in countryStates) {
            setProvinces(countryStates[selectedCountry as CountryCode] || []);
        } else {
            setProvinces([]);
        }
    };

    return (
        <div className="flex-1 md:p-2 lg:px-20">
            <h1 className="text-2xl font-medium py-4">How would you like to get your order?</h1>
            <p className="text-zinc-500 text-lg">
                Customs regulation for India require a copy of the recipient&apos;s KYC. The address on the KYC needs to match the shipping address. Our courier will contact you via SMS/email to obtain a copy of your KYC. The KYC will be stored securely and used solely for the purpose of clearing customs (including sharing it with customs officials) for all orders and returns. If your KYC does not match your shipping address, please click the link for more information. Learn More
            </p>
            <div className="w-full border-2 border-[#111] rounded-lg py-5 px-6 flex items-center gap-4 text-lg my-8">
                <HiOutlineInboxArrowDown className="text-2xl" />
                <span className="font-medium">Deliver it</span>
            </div>
            <h1 className="text-2xl font-medium py-4">Enter your name and address:</h1>

            <form onSubmit={async (e) => {
                e.preventDefault()
                const formData = new FormData(e.target as HTMLFormElement);
                const data = {
                    firstname: formData.get("firstname") as string,
                    lastname: formData.get("lastname") as string,
                    addresslineone: formData.get("addresslineone") as string,
                    addresslinetwo: formData.get("addresslinetwo") as string,
                    addresslinethree: formData.get("addresslinethree") as string,
                    postalcode: formData.get("postalcode") as string,
                    locality: formData.get("locality") as string,
                    state: formData.get("state") as string,
                    countrycode: formData.get("countrycode") as string,
                    email: formData.get("email") as string,
                    phone: formData.get("phone") as string,
                    pan: formData.get("pan") as string,
                }
                try {
                    await handleCheckoutSubmit(data, productQuantities)
                    setAllowSubmit(true)
                    setError(null)
                    setLoading(true)
                } catch (error) {
                    console.log(error);
                    setError(error as Error)
                }
            }}
                className="space-y-5 border-b pb-12">
                <input type="text" placeholder="First Name*" name="firstname" className="w-full p-4 rounded-lg border-2 placeholder:text-zinc-900" />
                <input type="text" placeholder="Last Name*" name="lastname" className="w-full p-4 rounded-lg border-2 placeholder:text-zinc-900" />
                <input type="text" placeholder="Address Line 1*" name="addresslineone" className="w-full p-4 rounded-lg border-2 placeholder:text-zinc-900" />
                <input type="text" placeholder="Address Line 2" name="addresslinetwo" className="w-full p-4 rounded-lg border-2 placeholder:text-zinc-900" />
                <input type="text" placeholder="Address Line 3" name="addresslinethree" className="w-full p-4 rounded-lg border-2 placeholder:text-zinc-900" />
                <div className="grid grid-cols-2 gap-5">
                    <input type="text" placeholder="Postal Code" name="postalcode" className="grid-span-1 w-full p-4 rounded-lg border-2 placeholder:text-zinc-900" />
                    <input type="text" placeholder="Locality" name="locality" className="grid-span-1 w-full p-4 rounded-lg border-2 placeholder:text-zinc-900" />
                    <select name="countrycode" className="grid-span-1 w-full p-4 rounded-lg border-2 placeholder:text-zinc-500" onChange={handleCountryChange}
                    >
                        <option value="">Country Code</option>
                        <option value="PK">Pakistan</option>
                        <option value="US">United States</option>
                        <option value="CA">Canada</option>
                        <option value="IN">India</option>
                    </select>
                    <select name="state" className="grid-span-1 w-full p-4 rounded-lg border-2 placeholder:text-zinc-500">
                        <option value="">Select Province/Territory</option>
                        {provinces.map((province) => (
                            <option key={province.code} value={province.code}>
                                {province.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="space-y-5 py-6">
                    <div className="flex items-center gap-4">
                        <input type="checkbox" className="w-4 h-4" />
                        <span>Save this address to my profile</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <input type="checkbox" className="w-4 h-4" />
                        <span>Make this my preferred address</span>
                    </div>
                </div>

                <h1 className="text-2xl font-medium py-4">What&apos;s your contact information?</h1>

                <div className="space-y-5">
                    <input type="email" placeholder="Email" name="email" className="w-full p-4 rounded-lg border-2 placeholder:text-zinc-900" />
                    <input type="phone" placeholder="Phone Number" name="phone" className="w-full p-4 rounded-lg border-2 placeholder:text-zinc-900" />
                </div>

                <h1 className="text-2xl font-medium py-4">What&apos;s your PAN?</h1>

                <div className="space-y-5 text-[#757575]">
                    <input type="text" placeholder="PAN" className="w-full p-4 rounded-lg border-2 placeholder:text-zinc-900" />
                    <p className="px-4">
                        Enter your PAN to enable payment with UPI, Net Banking or local card methods
                    </p>

                    <div className="space-y-12 py-6">
                        <div className="flex items-center gap-4">
                            <input type="checkbox" className="w-4 h-4" />
                            <span className="text-xs">Save PAN details to Nike Profile</span>
                        </div>
                        <div className="flex items-center gap-4">
                            <input type="checkbox" className="w-4 h-4" />
                            <span className="text-xs">I have read and consent to eShopWorld processing my information in accordance with the Privacy Statement and Cookie Policy. eShopWorld is a trusted Nike partner.</span>
                        </div>
                    </div>
                </div>
                <button type='submit' className={`w-full text-center rounded-full py-4 ${allowSubmit ? "bg-[#111] text-white" : "bg-[#F5F5F5] text-zinc-500"} font-medium`}>
                    {loading ? <div className="w-6 h-6 rounded-full border-2 border-t-zinc-500 border-white animate-spin m-auto"></div> : "Submit"}
                </button>
                {error && <p className="text-red-500">{error.message}</p>}
            </form>

            <div className="py-5">
                <div className="py-5 border-b hover:text-[#111] text-zinc-500 font-medium text-2xl">Delivery</div>
                <Link href={"/account/myorders"} className="py-5 border-b hover:text-[#111] text-zinc-500 font-medium text-2xl">Shipping</Link>
                <div className="py-5 border-b hover:text-[#111] text-zinc-500 font-medium text-2xl">Billing</div>
                <div className="py-5 border-b hover:text-[#111] text-zinc-500 font-medium text-2xl">Payment</div>
            </div>
        </div>
    )
}

export default Formsection