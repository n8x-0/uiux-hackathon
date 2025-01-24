import { auth } from "@/auth";
import sanityClient from "@/sanity/sanity.client";
import { OrderT } from "@/utils/types";
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
        <div className="w-full lg:p-12 p-3">
            <h1 className="text-2xl font-medium w-full border-b py-2">My Orders.</h1>
            <div>
                {
                    myorders.map((data: OrderT, index: number) => {
                        const { packages, orderData } = data
                        return (
                            <div className="flex justify-between items-start p-2 border-b" key={index}>
                                <div>
                                    {
                                        packages.map((pkg, index) => {
                                            return (
                                                <div className="text-sm mt-2" key={index}>
                                                    <div className="flex">
                                                        <h3 className="font-medium">Package:&nbsp;</h3>
                                                        <Link href={`products/${pkg.id}`} className="text-blue-600 underline">details</Link>
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
                                            )
                                        })
                                    }
                                </div>

                                <div className="text-sm"> 
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

                                <div className="text-sm mt-3">
                                    <Link href={`/account/myorders/${orderData.labelID}`} className="px-8 py-2 bg-blue-950 text-white rounded font-medium">Track order</Link>
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