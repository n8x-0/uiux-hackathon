import React from "react";

interface ContextIface {
    favitems: number[] | null;
    bagitems: number[] | null;
    set: (value: number, storagename: string) => void;
    delete: (value: number | number[], storagename: string) => void;
    get: (storagename: string) => number[] | null;
}

export const storage = React.createContext<ContextIface | undefined>(undefined);
