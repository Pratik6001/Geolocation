"use client";
import { useEffect, useState, useCallback } from "react";
import { Search } from "./svg";

interface IpInfo {
    ip_address: string;
    country: string;
    country_code: string;
    region: string;
    city: string;
    latitude: string;
    longitude: string;
    postal_code: string;
    timezone: {
        current_time: string;
    };
    connection: {
        autonomous_system_number: number;
    };
}

export default function Page() {
    const [data, setData] = useState<IpInfo>();
    const [input, setInputValue] = useState("");

    const fetchInfo = useCallback(async (ip: string) => {
        try {
            const response = await fetch(`https://ipgeolocation.abstractapi.com/v1/?api_key=a36dd6096d9b4fce873d11c803e34361&ip_address=${ip}`);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const result: IpInfo = await response.json();
            setData(result);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }, []);

    useEffect(() => {
        if (input) fetchInfo(input);
    }, [fetchInfo]);

    return (
        <>
            <div className="">
                <div className="relative flex items-center max-w-md mx-auto h-12 rounded-lg focus-within:shadow-lg bg-white overflow-hidden">
                    <div className="grid place-items-center h-full w-12 text-gray-300">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>

                    <input
                        onChange={(e) => setInputValue(e.target.value)}
                        className="peer h-full w-full outline-none text-sm text-gray-700 pr-2"
                        type="text"
                        id="search"
                        placeholder="Search IP address..."
                    />
                    <button onClick={() => fetchInfo(input)}><Search /></button>
                </div>

                <div className="m-16">
                    <div className="flex flex-col md:flex-row justify-center items-center mx-auto max-w-screen-lg gap-6">
                        <div className="w-max md:w-1/2 lg:w-1/4">
                            <div className="p-6 flex flex-col justify-center items-center ">
                                <h1 className="text-lg font-sans font-medium p-2">IP Address</h1>
                                <p className="text-sm text-gray-800 p-2">{data?.ip_address || "N/A"}</p>
                            </div>
                            <div className="p-6 flex flex-col justify-center items-center w-max ">
                                <h1 className="text-lg font-sans font-medium p-2">Country Code</h1>
                                <p className="text-sm text-gray-800 p-2">{data?.country_code || "N/A"}</p>
                            </div>
                        </div>

                        <div className="w-max md:w-1/2 lg:w-1/4">
                            <div className="p-6 flex flex-col justify-center items-center w-max ">
                                <h1 className="text-lg font-sans font-medium p-2">Country Name</h1>
                                <p className="text-sm text-gray-800 p-2">{data?.country || "N/A"}</p>
                            </div>
                            <div className="p-6 flex flex-col justify-center items-center ">
                                <h1 className="text-lg font-sans font-medium p-2">Region Name</h1>
                                <p className="text-sm text-gray-800 p-2">{data?.region || "N/A"}</p>
                            </div>
                        </div>

                        <div className=" md:w-1/2 lg:w-1/4 w-max">
                            <div className="p-6 flex flex-col justify-center items-center w-max ">
                                <h1 className="text-lg font-sans font-medium p-2">City Name</h1>
                                <p className="text-sm text-gray-800 p-2">{data?.city || "N/A"}</p>
                            </div>
                            <div className="p-6 flex flex-col justify-center items-center ">
                                <h1 className="text-lg font-sans font-medium p-2">Zip Code</h1>
                                <p className="text-sm text-gray-800 p-2">{data?.postal_code || "N/A"}</p>
                            </div>
                        </div>

                        <div className="w-max md:w-1/2 lg:w-1/4">
                            <div className="p-6 flex flex-col justify-center items-center w-max ">
                                <h1 className="text-lg font-sans font-medium p-2">Time Zone</h1>
                                <p className="text-sm text-gray-800 p-2">{data?.timezone?.current_time || "N/A"}</p>
                            </div>
                            <div className="p-6 flex flex-col justify-center items-center ">
                                <h1 className="text-lg font-sans font-medium p-2">ASN</h1>
                                <p className="text-sm text-gray-800 p-2">{data?.connection?.autonomous_system_number || "N/A"}</p>
                            </div>
                        </div>
                        <div className="w-max md:w-1/2 lg:w-1/4">
                            <div className="p-6 flex flex-col justify-center items-center ">
                                <h1 className="text-lg font-sans font-medium p-2">Latitude</h1>
                                <p className="text-sm text-gray-800 p-2">{data?.latitude || "N/A"}</p>
                            </div>
                            <div className="p-6 flex flex-col justify-center items-center ">
                                <h1 className="text-lg font-sans font-medium p-2">Longitude</h1>
                                <p className="text-sm text-gray-800 p-2">{data?.longitude || "N/A"}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
