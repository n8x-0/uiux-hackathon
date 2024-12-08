import Image from "next/image"

const Sidebar = () => {
    return (
        <div className="md:w-96 w-full md:border-l-2 px-16 flex justify-start items-center flex-col min-h-screen gap-3 mdpt-0 pt-10">
            <h1 className="font-medium text-2xl">CONTACT US</h1>
            <div className="flex justify-center flex-col items-center">
                <div className="w-20 h-20 py-2 my-4">
                    <Image src={"/contact/phone.png"} alt="" width={600} height={600} className="w-full h-full object-contain" />
                </div>
                <p className="font-medium mb-2">000 800 919 0566</p>
                <span className="text-center">
                    Products & Orders: 24 hours a day, 7 days a week
                    Company Info & Enquiries: 07:30 - 16:30, Monday - Friday
                </span>
            </div>
            <div className="flex justify-center flex-col items-center">
                <div className="w-20 h-20 py-2 my-4">
                    <Image src={"/contact/message.png"} alt="" width={600} height={600} className="w-full h-full object-contain" />
                </div>
                <p className="font-medium">24 hours a day</p>
                <span className="text-center">7 days a week</span>
            </div>
            <div className="flex justify-center flex-col items-center">
                <div className="w-20 h-20 py-2 my-4">
                    <Image src={"/contact/envelope.png"} alt="" width={600} height={600} className="w-full h-full object-contain" />
                </div>
                <p className="font-medium">We&apos;ll reply within</p>
                <span className="text-center">five business days</span>
            </div>
            <div className="flex justify-center flex-col items-center">
                <div className="w-20 h-20 py-2 my-4">
                    <Image src={"/contact/location.png"} alt="" width={600} height={600} className="w-full h-full object-contain" />
                </div>
                <p className="font-medium">STORE LOCATION</p>
                <span className="text-center">Find Nike retail stores near you</span>
            </div>
        </div>
    )
}

export default Sidebar