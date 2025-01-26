"use server"

import { CheckoutFormData, ShipToDetails } from "../types";
import { validateAddressLine, validateCityOrLocality, validateEmail, validatePhoneNumber, validateSingleName } from "./validators";
import { auth } from "@/auth"
import { shipment } from "@/shipengine/config";
import { Params } from "shipengine/esm/validate-addresses/types/public-params";

export const handleCheckoutSubmit = async (submitedData: CheckoutFormData, productQuantities: { id: string, total: number, quantity: number, image:string }[] | []) => {
    const session = await auth();
    const currUser = session?.user?.id

    if (!productQuantities || productQuantities.length == 0) {
        throw new Error("No products, please checkout again.")
    }

    const { firstname, lastname, addresslineone, addresslinetwo, addresslinethree, postalcode, locality, state, countrycode, email, phone } = submitedData;


    if (!firstname || !lastname || !addresslineone || !postalcode || !locality || !state || !countrycode || !email || !phone) {
        throw new Error("Please fill all the required fields.")
    }

    validateSingleName(firstname as string);
    validateSingleName(lastname as string);
    validateAddressLine(addresslineone as string);
    // validatePostalCode(postalcode as string);
    validateCityOrLocality(locality as string);
    validateEmail(email as string);
    validatePhoneNumber(phone as string);

    const shipTodetails: ShipToDetails = {
        name: `${firstname} ${lastname}`,
        phone: phone,
        email: email,
        addressLine1: addresslineone,
        addressLine2: addresslinetwo,
        addressLine3: addresslinethree,
        cityLocality: locality,
        stateProvince: state,
        postalCode: postalcode,
        countryCode: countrycode,
        addressResidentialIndicator: "yes"
    }

    if (!addresslinetwo) delete shipTodetails.addressLine2;
    if (!addresslinethree) delete shipTodetails.addressLine3;

    const res = await shipment.validateAddresses([shipTodetails] as Params)
    console.log("shipengine validator: ", res);

    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/checkout`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ shipTodetails, productQuantities, currUser })
        })
        if(!res.ok){
            const error = await res.json()
            throw new Error(error.error)
        }
        return "success"
    } catch (error) {
        if(error instanceof Error){
            throw new Error(error.message as string)    
        }
    }
}
