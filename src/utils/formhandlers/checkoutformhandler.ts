"use server"

import { Cart } from "@/context/context";
import { CheckoutFormData, ShipToDetails } from "../types";
import { validateAddressLine, validateCityOrLocality, validateEmail, validatePhoneNumber, validatePostalCode, validateSingleName } from "./validators";
import { auth } from "@/auth"

export const handleCheckoutSubmit = (data: CheckoutFormData, productQuantities: {id: string, total: number, quantity: number}[] | [], bagitems: string[] | null) => {
    if (!productQuantities) {
        throw new Error("No products, please checkout again.")
    }

    const { firstname, lastname, addresslineone, addresslinetwo, addresslinethree, postalcode, locality, state, countrycode, email, phone, pan } = data;


    if (!firstname || !lastname || !addresslineone || !postalcode || !locality || !state || !countrycode || !email || !phone) {
        throw new Error("Please fill all the required fields.")
    }

    validateSingleName(firstname as string);
    validateSingleName(lastname as string);
    validateAddressLine(addresslineone as string);
    validatePostalCode(postalcode as string);
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

    checkOutNow(shipTodetails, productQuantities);
}

const checkOutNow = async (shipTodetails: ShipToDetails, products: {id: string, total: number, quantity: number}[] | []) => {

    const session = await auth();
    const currUser = session?.user?.id

    try {
        await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/checkout`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ shipTodetails, products, currUser })
        })
    } catch (error) {
        console.error("Error submitting the form:", error);
    }
}