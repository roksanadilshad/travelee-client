
export default async function DestinationsPage({ searchParams }) {
    // searchParams is a built-in Next.js feature to get URL queries
    const city = (await searchParams).city || ""; 

    // Fetching from your Node.js backend
    const res = await fetch(`http://localhost:500/destinations?city=${city}`, {
        cache: 'no-store'
    });
    const destinations = await res.json();

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4">
                {city ? `Showing results for "${city}"` : "All Destinations"}
            </h1>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {destinations.length > 0 ? (
                    destinations.map(dest => (
                        <div key={dest._id} className="border p-4 rounded shadow">
                            <img src={dest.images[0]} alt={dest.title} className="h-48 w-full object-cover rounded" />
                            <h2 className="text-xl font-bold mt-2">{dest.title}</h2>
                            <p className="text-gray-500">{dest.location.city}</p>
                        </div>
                    ))
                ) : (
                    <p>No destinations found for "{city}".</p>
                )}
            </div>
        </div>
    );
}