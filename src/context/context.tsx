import React from "react";

export interface ContextIface {
    favitems: string[] | null;
    bagitems: string[] | null;
    set: (value: string, storagename: string) => void;
    delete: (value: string | string[], storagename: string) => void;
    get: (storagename: string) => string[] | null;
}

export const storage = React.createContext<ContextIface | undefined>(undefined);
