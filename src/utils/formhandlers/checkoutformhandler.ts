"use server"
import { CheckoutFormData, ShipToDetails } from "../types";
import { validateAddressLine, validateCityOrLocality, validateEmail, validatePhoneNumber, validateSingleName } from "./validators";
import { shipment } from "@/shipengine/config";
import { Params } from "shipengine/esm/validate-addresses/types/public-params";

export const handleCheckoutSubmit = async (
    submitedData: CheckoutFormData,
    productQuantities: { id: string, total: number, quantity: number, image: string }[] | [],
    currUser: string | undefined
) => {

    if (!productQuantities || productQuantities.length == 0) {
        throw new Error("No products, please checkout again.")
    }

    const { firstname, lastname, addresslineone, addresslinetwo, addresslinethree, postalcode, locality, state, countrycode, email, phone } = submitedData;


    if (!firstname || !lastname || !addresslineone || !postalcode || !locality || !state || !countrycode || !email || !phone) {
        return {
            error: "error",
            message: "Please fill all the required fields."
        }
    }

    validateSingleName(firstname as string);
    validateSingleName(lastname as string);
    validateAddressLine(addresslineone as string);
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

    const validateAdd = await shipment.validateAddresses([shipTodetails])


    if (validateAdd[0].messages[0].type === "error") {
        return {
            error: "error",
            message: validateAdd[0].messages[0].message
        }
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
        if (!res.ok) {
            const error = await res.json()
            return {
                error: "error",
                message: error.error
            }
        }
        
    } catch (error) {
        if (error instanceof Error) {
            return {
                error: "error",
                message: error.message
            }
        }
    }
}
