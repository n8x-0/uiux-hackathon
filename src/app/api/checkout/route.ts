import { shipment } from "@/shipengine/config";
import { NextRequest, NextResponse } from "next/server";
import client from "@/sanity/sanity.client";

const generateDate = (): string => {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

export async function POST(request: NextRequest) {
    const { shipTodetails, products, currUser } = await request.json();
    const currDate = generateDate();

    try {
        const shipmentDetails = await shipment.createLabelFromShipmentDetails({
            shipment: {
                carrierId: "se-1631324",
                serviceCode: "usps_priority_mail",
                shipTo: shipTodetails,
                shipFrom: {
                    name: "Syed Shayan",
                    companyName: "Nike n8x",
                    phone: "+1 555-555-5555",
                    addressLine1: "4301 Bull Creek Rd",
                    cityLocality: "Austin",
                    stateProvince: "TX",
                    postalCode: "78731",
                    countryCode: "US",
                    addressResidentialIndicator: "no"
                },
                packages: [
                    {
                        weight: { value: 24, unit: "ounce" },
                        dimensions: { height: 5, width: 4, length: 10, unit: "inch" },
                    }
                ],
                shipDate: currDate,
            }
        })

        try {
            const existingCustomer = await client.fetch(`*[_type=="customer" && email=="${shipTodetails.email}"][0]`)
            const existingUser = await client.fetch(`*[_type=="user" && _id=="${currUser}"][0]`)
            const previousUserHistory = existingUser.orderHistory || {}

            if (!existingCustomer || existingCustomer.length === 0) {
                const storeCustomer = await client.create({
                    _type: "customer",
                    name: shipTodetails.name,
                    phone: shipTodetails.phone,
                    email: shipTodetails.email,
                    referecneID: currUser,
                    orderHistory: products
                })

                const updateUserHistory = await client.patch(currUser).set({ orderHistory: [...previousUserHistory, ...products] }).commit()
                console.log("user history updated", updateUserHistory); // checkkkkk
                console.log("custoemr created and stored", storeCustomer); // checkkkkk
            } else {

                const customerID = existingCustomer[0]._id
                const previousHistory = existingCustomer.orderHistory || {}
                const updateCustomerHistory = await client.patch(customerID).set({ orderHistory: [...previousHistory, ...products] }).commit()
                const updateUserHistory = await client.patch(currUser).set({ orderHistory: [...previousUserHistory, ...products] }).commit()
                console.log("user history updated", updateUserHistory); // checkkkkk
                console.log("customer history updated", updateCustomerHistory); // checkkkkk
            }

            // store order in sanity

            try {
                const storedOrder = await client.create({
                    _type: "order",
                    customerID: currUser._id,
                    phone: shipTodetails.phone,
                    email: shipTodetails.email,
                    orderData: {
                        labelID: shipmentDetails.labelId,
                        label: shipmentDetails.labelDownload,
                        status: shipmentDetails.status,
                        trackingNumber: shipmentDetails.trackingNumber,
                        trackingStatus: shipmentDetails.trackingStatus,
                        shipmentCost: shipmentDetails.shipmentCost,
                    },
                    packages: products
                })

                console.log("order created and stored", storedOrder); // checkkkkk

                return NextResponse.json("shipmentDetails", { status: 200 })

            } catch (error) {
                console.log("order creation fail: ", error);
                return NextResponse.json({ message: `Failed to store customer in sanity` }, { status: 500 })
            }

        } catch (error) {
            console.log("customer creation fail: ", error);
            return NextResponse.json({ message: `Failed to store customer in sanity` }, { status: 500 })
        }
    } catch (error) {
        console.log("shipmetn label fail: ", error);
        return NextResponse.json({ message: `Failed to generate label` }, { status: 500 })
    }
}