import ShipEngine from "shipengine";

export const shipment = new ShipEngine({apiKey: process.env.SHIPENGINE_API_KEY as string})