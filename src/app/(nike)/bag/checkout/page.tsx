import Ordersummary from "@/components/bagpage/checkoutpage/ordersummary"
import Formsection from "@/components/bagpage/checkoutpage/formsection";
import { auth } from "@/auth";

const CheckoutPage = async () => {
    const session = await auth()
    return (
        <div className="max-w-[1280px] m-auto p-3">
            <div className="w-full md:flex items-start">
                <div className="md:hidden block">
                    <Ordersummary />
                </div>
                <Formsection currUserId={session?.user?.id}/>
                <div className="hidden md:block">
                    <Ordersummary />
                </div>
            </div>
        </div>
    )
}

export default CheckoutPage