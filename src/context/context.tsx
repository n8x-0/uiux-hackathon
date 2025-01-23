import React from "react";

type CartItem = {
    total: number;
    quantity: number;   
};

export type Cart = {
    [productId: string]: CartItem;
};

export interface ContextIface {
    favitems: string[] | null;
    bagitems: string[] | null;
    productQuantities: {id: string, total: number, quantity: number}[] | [];
    setProductQuantitiesMethod: (item: {id: string, total: number, quantity: number}[] | []) => void;
    set: (value: string, storagename: string) => void;
    delete: (value: string | string[], storagename: string) => void;
    get: (storagename: string) => string[] | null;
}

export const storage = React.createContext<ContextIface | undefined>(undefined);
