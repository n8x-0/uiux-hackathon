import sanityClient from "@/sanity/sanity.client";
import Link from "next/link";
import { auth } from "@/auth";
import { BsArrowRight, BsCart2, BsHeart } from "react-icons/bs";
import SignOutBtn from "@/components/auth/signoutbtn";

const Account = async () => {
    const session = await auth()
    
    async function fetchUserData() {
        try {
            const userData = await sanityClient.fetch(
                `*[_type=="user" && _id=="${session?.user?.id}"][0]`
            );
            return userData
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    }
    const user = await fetchUserData();

    return (
        <div className="max-w-5xl mx-auto p-6 min-h-[80vh]">
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b">
                <div className="flex items-center space-x-4">
                    {user?.profileImage ? (
                        <img
                            src={user.profileImage}
                            alt="User Avatar"
                            className="w-14 h-14 rounded-full object-cover"
                        />
                    ) : (
                        <div className="w-14 h-14 bg-gray-300 rounded-full flex items-center justify-center">
                            <span className="text-xl font-semibold text-gray-600">
                                {user?.name?.charAt(0)}
                            </span>
                        </div>
                    )}
                    <div>
                        <h2 className="text-xl font-semibold">{user?.name || "User"}</h2>
                        <p className="text-gray-500">{user?.email}</p>
                    </div>
                </div>

                {/* Cart & Favorites */}
                <div className="flex flex-col items-center gap-2">
                    <div className="flex space-x-4">
                        <Link href="/bag">
                            <button className="p-3 shadow bg-gray-100 rounded-lg hover:bg-gray-200 transition">
                                <BsCart2 className="" />
                            </button>
                        </Link>
                        <Link href="/bag?favorites=true">
                            <button className="p-3 shadow bg-gray-100 rounded-lg hover:bg-gray-200 transition">
                                <BsHeart />
                            </button>
                        </Link>
                    </div>
                    <div className="px-4 py-2 bg-yellow-400 font-medium rounded">
                        <SignOutBtn />
                    </div>
                </div>
            </div>

            {/* Navigation Links */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                <Link
                    href={`/account/${session?.user?.id}/myorders`}
                    className="bg-blue-500 text-white p-4 rounded-lg flex items-center justify-between hover:bg-blue-600 transition"
                >
                    <span>My Orders</span> <BsArrowRight />
                </Link>

                <Link
                    href={`/account/${session?.user?.id}/orderhistory`}
                    className="bg-green-500 text-white p-4 rounded-lg flex items-center justify-between hover:bg-green-600 transition"
                >
                    <span>Order History</span> <BsArrowRight />
                </Link>
            </div>
        </div>
    );
}

export default Account