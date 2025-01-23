export type ShipToDetails = {
    name: string;
    phone: string;
    email?: string;
    addressLine1: string;
    addressLine2?: string;
    addressLine3?: string;
    cityLocality: string;
    stateProvince: string;
    postalCode: string;
    countryCode: string;
    addressResidentialIndicator: string;
};

export type PackageTemplate = {
    weight: {
        value: number;
        unit: string;
    };
    dimensions: {
        height: number;
        width: number;
        length: number;
        unit: string;
    };
};

export type User = {
    email: string,
    password: string,
    name?: string,
    firstname?: string,
    lastname?: string,
    dob: string,
    country: string,
    gender: string
}

export type CheckoutFormData = {
    firstname: string;
    lastname: string;
    addresslineone: string;
    addresslinetwo: string;
    addresslinethree: string;
    postalcode: string;
    locality: string;
    state: string;
    countrycode: string;
    email: string;
    phone: string;
    pan: string;
};
