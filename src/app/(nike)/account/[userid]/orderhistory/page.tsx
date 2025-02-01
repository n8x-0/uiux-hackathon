import sanityClient from "@/sanity/sanity.client";
import Image from "next/image";

const OrderHistory = async ({ params }: { params: { userid: string } }) => {
  const user = await sanityClient.fetch(
    `*[_type == "user" && _id == $userid][0]{
      name,
      email,
      orderHistory
    }`,
    { userid: params.userid }
  );

  if (!user) {
    return (
      <div className="flex items-center justify-center h-[80vh]">
        <p className="text-gray-500 text-lg animate-bounce duration-1000">User not found</p>
      </div>
    );
  }

  const { name, email, orderHistory } = user;

  return (
    <div className="min-h-[80vh] bg-gray-100 md:p-6 p-3">
      <div className="max-w-4xl mx-auto bg-white md:p-6 p-4 shadow-lg rounded-xl">
        <h1 className="text-2xl font-semibold mb-4">Order History</h1>

        <div className="mb-6">
          <h2 className="text-lg font-medium">Customer Details</h2>
          <p className="text-gray-600">Name: {name}</p>
          <p className="text-gray-600">Email: {email}</p>
        </div>

        <div>
          <h2 className="text-lg font-medium mb-3">Orders</h2>
          {orderHistory && orderHistory.length > 0 ? (
            <div className="space-y-4">
              {orderHistory.map((order: {id: string, image: string, quantity: number, total: number}, index: number) => (
                <div
                  key={order.id}
                  className="flex items-center justify-between bg-gray-50 p-4 rounded-lg shadow"
                >
                  <div className="flex items-center">
                    <Image
                      src={order.image}
                      alt={`Order ${index + 1}`}
                      width={600}
                      height={600}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div className="ml-4">
                      <p className="text-sm font-medium">Product ID: {order.id}</p>
                      <p className="text-sm text-gray-600">Quantity: {order.quantity}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-lg font-semibold text-gray-800">${order.total.toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 animate-bounce duration-1000">No orders found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderHistory;
