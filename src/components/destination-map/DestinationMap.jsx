"use client";

import React, { useEffect, useRef, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import L from "leaflet";
import { Search } from "lucide-react";
import "leaflet/dist/leaflet.css";
import { useRouter } from "next/navigation";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl:
        "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
    iconUrl:
        "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    shadowUrl:
        "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const createCustomIcon = (color) => {
    return new L.DivIcon({
        html: `
            <svg width="30" height="42" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 21C16 17.5 19 14.4087 19 10.5C19 6.63401 15.866 3.5 12 3.5C8.13401 3.5 5 6.63401 5 10.5C5 14.4087 8 17.5 12 21Z" fill="${color}" stroke="white" stroke-width="2"/>
                <circle cx="12" cy="10.5" r="2.5" fill="white"/>
            </svg>
        `,
        className: "custom-marker-icon",
        iconSize: [30, 42],
        iconAnchor: [15, 42],
        popupAnchor: [0, -40],
    });
};

const tealIcon = createCustomIcon("#FF6B6B");


const DestinationMap = () => {
    const [destinations, setDestinations] = useState([]);
    const [query, setQuery] = useState("");
    const mapRef = useRef(null);
    const router = useRouter();

    useEffect(() => {
        fetch("http://localhost:500/destinations?limit=100")
            .then((res) => res.json())
            .then((data) => setDestinations(data.data));
    }, []);

    const handleSearch = async () => {
        if (!query) return;

        const res = await fetch(
            `https://nominatim.openstreetmap.org/search?format=json&q=${query}`
        );

        const data = await res.json();

        if (data.length > 0) {
            const lat = parseFloat(data[0].lat);
            const lon = parseFloat(data[0].lon);

            mapRef.current.flyTo([lat, lon], 10, {
                duration: 2,
            });
        }
    };

    return (
        <div className="bg-white py-12">
            {/* Header Section based on the Image */}
            <div className="container mx-auto px-6 mb-10">
                <div className="flex justify-between items-end pb-4">
                    <div>
                        <div className="w-8 h-1 bg-red-500 mb-4"></div> {/* Red accent line */}
                        <h2 className="text-5xl md:text-6xl font-extrabold tracking-tight text-[#1A2B33] uppercase">
                            Find & Book Destinations <span className="text-[#23B2A4]">
                                on the Map</span>
                        </h2>
                        <p className="text-[#7D8A90] mt-3 flex items-center gap-2 font-medium">
                            <span className="text-[#23B2A4]">✦</span>  Discover amazing places around the world and book your trip directly from the map.
                        </p>
                    </div>
                </div>
            </div>

            <div className="relative container mx-auto px-6">
                {/* 🔍 Styled Search Box */}
                <div className="absolute top-6 left-1/2 -translate-x-1/2 z-[1000] flex bg-white/90 backdrop-blur-md shadow-2xl rounded-xl overflow-hidden border border-gray-100">
                    <input
                        type="text"
                        placeholder="Search location..."
                        className="px-6 py-3 outline-none w-72 text-sm font-medium"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                    <button
                        onClick={handleSearch}
                        className="bg-[#23B2A4] hover:bg-[#1e968a] text-white px-6 transition-colors"
                    >
                        <Search size={20} />
                    </button>
                </div>

                {/* 🗺️ Map Container with rounded corners to match the cards */}
                <div className="rounded-[32px] overflow-hidden shadow-2xl border border-gray-100">
                    <MapContainer
                        ref={mapRef}
                        center={[30, 60]}
                        zoom={3}
                        style={{ height: "600px", width: "100%" }}
                    >
                        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

                        {destinations.map((destination) => (
                            <Marker
                                key={destination._id}
                                position={[
                                    destination.coordinates.latitude,
                                    destination.coordinates.longitude,
                                ]}
                                icon={tealIcon}
                                eventHandlers={{
                                    mouseover: (e) => e.target.openPopup(),
                                    click: (e) => e.target.openPopup(),
                                }}
                            >
                                <Popup className="custom-popup">
                                    <div
                                        className="w-48 p-1 cursor-pointer group"
                                        onClick={() => router.push(`/destinations/${destination._id}`)}
                                    >
                                        <div className="relative overflow-hidden rounded-xl mb-2">
                                            <img
                                                src={destination.media.cover_image}
                                                alt={destination.city}
                                                className="w-full h-28 object-cover transition-transform duration-500 group-hover:scale-110"
                                            />
                                            <div className="absolute top-2 right-2 bg-black/20 backdrop-blur-md p-1.5 rounded-full">
                                                <div className="w-3 h-3 border-2 border-white rounded-full"></div>
                                            </div>
                                        </div>
                                        <h3 className="font-bold text-[#1A2B33] text-lg uppercase tracking-tight leading-tight">
                                            {destination.city}
                                        </h3>
                                        <div className="flex justify-between items-center mt-1">
                                            <p className="text-[10px] font-bold text-[#23B2A4] uppercase tracking-wider">
                                                {destination.country}
                                            </p>
                                            <p className="text-[10px] font-bold text-[#7D8A90]">
                                                {destination.price}
                                            </p>
                                        </div>
                                    </div>
                                </Popup>
                            </Marker>
                        ))}
                    </MapContainer>
                </div>
            </div>
        </div>

    );
};

export default DestinationMap;