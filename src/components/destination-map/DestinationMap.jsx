"use client";

import React, { useEffect, useRef, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import L from "leaflet";
import { Search } from "lucide-react";
import "leaflet/dist/leaflet.css";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl:
        "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
    iconUrl:
        "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    shadowUrl:
        "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});


const DestinationMap = () => {
    const [destinations, setDestinations] = useState([]);
    const [query, setQuery] = useState("");
    const mapRef = useRef(null);

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
        <div className="relative">

            {/* 🔍 Search Box */}
            <div className="absolute top-6 left-1/2 -translate-x-1/2 z-[1000] flex bg-white shadow-lg rounded-full overflow-hidden">

                <input
                    type="text"
                    placeholder="Search location..."
                    className="px-4 py-2 outline-none w-72"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />

                <button
                    onClick={handleSearch}
                    className="bg-blue-500 text-white px-4 flex items-center justify-center"
                >
                    <Search size={18} />
                </button>

            </div>

            {/* 🗺️ Map */}
            <MapContainer
                ref={mapRef}
                center={[30, 60]}
                zoom={3.}
                style={{ height: "600px", width: "100%" }}
                className="container mx-auto px-6"
            >
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

                {destinations.map((destination) => (
                    <Marker
                        key={destination._id}
                        position={[
                            destination.coordinates.latitude,
                            destination.coordinates.longitude,
                        ]}
                        eventHandlers={{
                            mouseover: (e) => {
                                e.target.openPopup();
                            },
                            mouseout: (e) => {
                                e.target.closePopup();
                            },
                            click: (e) => e.target.openPopup(),
                        }}
                    >
                        <Popup>
                            <div className="w-40 h-48 overflow-hidden">
                                <img
                                    src={destination.media.cover_image}
                                    alt={destination.city}
                                    className="rounded w-full h-24 object-cover"
                                />
                                <h3 className="font-bold truncate">{destination.city}</h3>
                                <p className="text-sm truncate">{destination.country}</p>
                                <p className="text-xs text-blue-500 truncate">
                                    Price: {destination.price}
                                </p>
                            </div>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>

    );
};

export default DestinationMap;