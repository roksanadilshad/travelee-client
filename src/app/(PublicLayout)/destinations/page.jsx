import DestinationCard from "@/components/Share/cards/DestinationCard";
import FilterAndSearch from "@/components/Share/FilterAndSearch";

export default async function DestinationsPage({ searchParams }) {
  // searchParams is a built-in Next.js feature to get URL queries
  const city = (await searchParams).city || "";

  // Fetching from your Node.js backend
  const res = await fetch(`http://localhost:500/destinations?city=${city}`, {
    cache: "no-store",
  });
  const destinations = await res.json();

  return (
    <div className="w-11/12 mx-auto">
      {/* Title---->>> */}
      <h1 className="text-4xl flex justify-center font-bold mb-8 my-4">
        {city ? `Showing results for "${city}"` : "All Destinations"}
      </h1>

      <div>
        {/* Main Content---->>> */}
        <main className="grid grid-cols-1 md:grid-cols-12  gap-3 p-3">
          {/* search & Filter---->> */}
          <aside className="col-span-1 md:col-span-3 lg:col-span-2 bg-amber-100">
            <FilterAndSearch></FilterAndSearch>
          </aside>
          {/* Card Container---->>> */}
          <div className="container mx-auto col-span-1 md:col-span-9 lg:col-span-10">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {destinations.length > 0 ? (
                destinations.map((destination) => (
                  <DestinationCard
                    key={destination._id}
                    destination={destination}
                  ></DestinationCard>
                ))
              ) : (
                <p>No destinations found for {city}.</p>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
