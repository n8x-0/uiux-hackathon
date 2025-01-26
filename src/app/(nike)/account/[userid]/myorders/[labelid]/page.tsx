"use client";

import { TrackingDetails } from "@/utils/types";
import { useEffect, useState } from "react";

const TrackByLabel = ({ params }: { params: { labelid: string } }) => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [response, setResponse] = useState<TrackingDetails | null>(null);

  const trackMyShipment = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/track?labid=${params.labelid}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (res.ok) {
        const data = await res.json();
        setResponse(data);
      }
      setLoading(false);
      setError(null);
    } catch (err) {
      console.log(err);
      setLoading(false);
      setError("An error occurred while fetching tracking details.");
    }
  };

  useEffect(() => {
    trackMyShipment();
  }, []);

  return (
    <div className="w-full lg:p-12 p-4 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-2">
        Order Status
      </h1>
      {loading ? (
        <div className="space-y-4">
          <div className="h-6 w-3/4 bg-gray-300 animate-pulse rounded-md"></div>
          <div className="h-6 w-1/2 bg-gray-300 animate-pulse rounded-md"></div>
          <div className="h-6 w-5/6 bg-gray-300 animate-pulse rounded-md"></div>
          <div className="h-6 w-1/4 bg-gray-300 animate-pulse rounded-md"></div>
          <div className="h-6 w-2/3 bg-gray-300 animate-pulse rounded-md"></div>
        </div>
      ) : error ? (
        <div className="text-red-600 font-medium">{error}</div>
      ) : (
        response && (
          <div className="space-y-4 p-6 bg-white rounded shadow-md">
            <p className="text-lg font-medium text-gray-700">
              <span className="font-bold text-gray-800">Tracking Number: </span>
              {response.trackingNumber || "N/A"}
            </p>
            <p className="text-lg font-medium text-gray-700">
              <span className="font-bold text-gray-800">Carrier Status Code: </span>
              {response.carrierStatusCode || "N/A"}
            </p>
            <p className="text-lg font-medium text-gray-700">
              <span className="font-bold text-gray-800">Status Code: </span>
              {response.statusCode || "N/A"}
            </p>
            <p className="text-lg font-medium text-gray-700">
              <span className="font-bold text-gray-800">Status Description: </span>
              {response.statusDescription || "N/A"}
            </p>
            <p className="text-lg font-medium text-gray-700">
              <span className="font-bold text-gray-800">Carrier Status Description: </span>
              {response.carrierStatusDescription || "N/A"}
            </p>
            <p className="text-lg font-medium text-gray-700">
              <span className="font-bold text-gray-800">Ship Date: </span>
              {response.shipDate || "N/A"}
            </p>
            <p className="text-lg font-medium text-gray-700">
              <span className="font-bold text-gray-800">Estimated Delivery Date: </span>
              {response.estimatedDeliveryDate || "N/A"}
            </p>
            <p className="text-lg font-medium text-gray-700">
              <span className="font-bold text-gray-800">Actual Delivery Date: </span>
              {response.actualDeliveryDate || "N/A"}
            </p>
          </div>
        )
      )}
    </div>
  );
};

export default TrackByLabel;
