"use client";

import React, { useState, useEffect } from "react";
import { storage } from "./context";

interface ContextIface {
    favitems: number[] | null;
    bagitems: number[] | null;
    set: (value: number, storagename: string) => void;
    delete: (value: number | number[], storagename: string) => void;
    get: (storagename: string) => number[] | null;
}

const StorageProvider = ({ children }: { children: React.ReactNode }) => {
    const [favitems, setFavitems] = useState<number[] | null>(null);
    const [bagitems, setBagitems] = useState<number[] | null>(null);

    useEffect(() => {
        if (favitems === null && typeof window !== "undefined") {
            const storedFavs = JSON.parse(localStorage.getItem("favitems") as string);
            setFavitems(storedFavs && storedFavs.length > 0 ? storedFavs : null);
        }

        if (bagitems === null && typeof window !== "undefined") {
            const storedBags = JSON.parse(localStorage.getItem("bagitems") as string);
            setBagitems(storedBags && storedBags.length > 0 ? storedBags : null);
        }
    }, [favitems, bagitems]);
    useEffect(() => {
        if (favitems !== null) {
            localStorage.setItem("favitems", JSON.stringify(favitems));
        }
    }, [favitems]);
    
    useEffect(() => {
        if (bagitems !== null) {
            localStorage.setItem("bagitems", JSON.stringify(bagitems));
        }
    }, [bagitems]);
    

    const context: ContextIface = {
        favitems,
        bagitems,

        set: (value, storagename) => {
            const updateState = storagename === "favitems" ? setFavitems : setBagitems;
            const currentItems = storagename === "favitems" ? favitems : bagitems;
            
            const alreadyAdded = currentItems?.find((data)=> data == value)
            if(!alreadyAdded){
                const updatedItems = currentItems ? [...currentItems, value] : [value];
                updateState(updatedItems);
            }else{
                throw new Error("Alredy there")
            }
        },

        delete: (value, storagename) => {
            const updateState = storagename === "favitems" ? setFavitems : setBagitems;
            const currentItems = storagename === "favitems" ? favitems : bagitems;

            if (!currentItems) return;

            const updatedItems = currentItems.filter((item) => item !== value);
            if(updatedItems.length >= 0){
                updateState(updatedItems);            
            }else{
                updateState(null);            
            }
        },

        get: (storagename) => {
            const item = localStorage.getItem(storagename);
            return item ? JSON.parse(item) : null;
        },
    };

    return <storage.Provider value={context}>{children}</storage.Provider>;
};

export default StorageProvider;
