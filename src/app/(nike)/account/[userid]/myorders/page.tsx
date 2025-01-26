import { auth } from "@/auth";
import sanityClient from "@/sanity/sanity.client";
import { OrderT } from "@/utils/types";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

const MyOrders = async () => {
    const session = await auth()
    if (!session) redirect("/joinus")        

    const query = `
    *[_type=="order" && customerID==$id]
    `
    const myorders = await sanityClient.fetch(query, { id: session.user?.id })
    console.log("order:  ", myorders);

    return (
        <div className="w-full lg:p-12 p-3 h-full">
            <h1 className="text-2xl font-medium w-full border-b py-2">My Orders.</h1>
            <div className="h-full">
                {
                    myorders.map((data: OrderT, index: number) => {
                        const { packages, orderData, _createdAt, _updatedAt } = data
                        return (
                            <div className="grid grid-cols-3 p-2 border-b border-zinc-300 h-full" key={index}>
                                <div className="col-span-1">
                                    {
                                        packages.map((pkg, index) => {
                                            return (
                                                <div className="text-sm mt-2 flex items-center gap-2" key={index}>
                                                    <div className="w-12 h-12 overflow-hidden">
                                                        <Image src={pkg.image} alt={pkg.image} width={600} height={600} className="w-full h-full object-cover" />
                                                    </div>
                                                    <div>
                                                        <div className="flex">
                                                            <h3 className="font-medium">Package:&nbsp;</h3>
                                                            <Link href={`/products/all/${pkg.id}`} className="text-blue-600 underline">details</Link>
                                                        </div>
                                                        <div className="flex">
                                                            <h3 className="font-medium">Quantity:&nbsp;</h3>
                                                            <span>x{pkg.quantity}</span>
                                                        </div>
                                                        <div className="flex">
                                                            <h3 className="font-medium">Amount:&nbsp;</h3>
                                                            <span>${pkg.total.toLocaleString()}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>

                                <div className="text-sm flex flex-col gap-4 h-full col-span-1">
                                    <div>
                                        <div className="flex">
                                            <h3 className="font-medium">Status:&nbsp;</h3>
                                            <span>{orderData.trackingStatus}</span>
                                        </div>
                                        <div className="flex">
                                            <h3 className="font-medium">Tracking Number:&nbsp;</h3>
                                            <span>{orderData.trackingNumber}</span>
                                        </div>
                                        <div className="flex">
                                            <h3 className="font-medium">Shipment Cost:&nbsp;</h3>
                                            <span>{orderData.shipmentCost.amount} {orderData.shipmentCost.currency}</span>
                                        </div>
                                    </div>
                                    <div>
                                    <div className="flex">
                                            <h3 className="font-medium">Created At:&nbsp;</h3>
                                            <span>{_createdAt}</span>
                                        </div>
                                        <div className="flex">
                                            <h3 className="font-medium">Last Updated:&nbsp;</h3>
                                            <span>{_updatedAt}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="text-sm mt-3 col-span-1 flex justify-end">
                                    <Link href={`/account/${session.user?.id}/myorders/${orderData.labelID}`} className="px-8 py-2 h-fit w-fit bg-blue-950 text-white rounded font-medium">Track order</Link>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}
export default MyOrders;