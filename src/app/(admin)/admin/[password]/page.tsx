import ActionBtns from "@/components/admin/actionbtns"
import sanityClient from "@/sanity/sanity.client"
import { GetProductById } from "@/sanity/sanity.query"
import { OrderT } from "@/utils/types"
import { redirect } from "next/navigation"
const AdminPage = async ({ params }: { params: { password: string } }) => {
    if (params.password != process.env.MY_PASSW) redirect("/")
    const orders = await sanityClient.fetch(`*[_type=="order"]`)

    return (
        <div className="w-full min-h-screen">
            <div className="lg:p-12 p-3">
                <h1 className="text-2xl font-bold py-4">Admin Page</h1>
                <div className="w-full md:flex">
                    <div className="md:w-60 w-full h-full bg-gray-200 p-2">
                        <h4 className="font-medium p-2 border-b border-zinc-300">Tools</h4>
                        <div>fsdf</div>
                    </div>
                    <div className="flex-1 h-full bg-zinc-100 p-2">
                        <h4 className="font-medium p-2 border-b border-zinc-300">Orders</h4>
                        <div className="">
                            {orders.map((data: OrderT, index: number) => {
                                return (
                                    <div key={index} className="w-full flex justify-between items-center p-2 border-b border-zinc-400">
                                        <div className="w-full">
                                            <p className="font-medium">{data.email}</p>
                                            <p className="font-medium">{data.phone}</p>
                                            <p className="text-sm"><span className="font-medium text-zinc-800">Label-id: </span>{data.orderData.labelID}</p>
                                            <div className="xl:w-1/2 md:w-[70%] w-[90%] overflow-scroll flex gap-3 mt-4">
                                                {
                                                    data.packages.map(async (data: {id:string, quantity: number, total: number}, index: number) => {
                                                        const prod = await GetProductById(data.id)
                                                        const { productName, image } = prod[0]

                                                        return (
                                                            <div className="flex flex-col" key={index}>
                                                                <div className="w-16 h-16 shadow-sm shadow-zinc-500">
                                                                    <img src={image.url} alt="prod image" className="w-full h-full object-cover" />
                                                                </div>
                                                                <span className="text-xs w-18 mt-1">
                                                                    {productName.substring(0, 15)} <span className="font-medium">x{data.quantity}</span>
                                                                </span>
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <ActionBtns data={data.orderData.label.pdf}/>
                                            <div className="w-20 h-24 overflow-hidden">
                                                <img src={data.orderData.label.png} alt="labelimage"/>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>


        // <div>
        //     {
        //         orders.map((data: any)=> {
        //             return <div>{data._id}</div>
        //         })
        //     }
        // </div>
    )
}

export default AdminPage