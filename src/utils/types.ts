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


export type OrderT = {
    phone: string;
    _createdAt: string; // ISO date string
    _type: 'order';
    orderData: {
      labelID: string,
      status: string,
      trackingNumber: string,
      trackingStatus: string,
      label: {
        zpl: string,
        pdf: string,
        href: string,
        png: string,
      },
      shipmentCost: {amount: number, currency: string}, 
    };
    trackingNumber: string;
    status: 'completed' | 'in_progress' | 'pending'; // Add additional statuses if needed
    labelID: string;
    shipmentCost: {
      amount: number;
      currency: string;
    };
    label: {
      pdf: string;
      zpl: string;
      png: string;
      href: string;
    };
    trackingStatus: 'in_transit' | 'delivered' | 'pending'; // Add additional statuses if needed
    email: string;
    _rev: string;
    _id: string;
    packages: {
      quantity: number;
      id: string;
      total: number;
    }[];
    _updatedAt: string; // ISO date string
  };
  