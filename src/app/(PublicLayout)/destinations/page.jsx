import DestinationCard from "@/components/Share/cards/DestinationCard";
import DestinationsPagination from "@/components/Share/DestinationsPagination";
import FilterAndSearch from "@/components/Share/FilterAndSearch";

// searchParams
export default async function DestinationsPage({ searchParams }) {
  // query params
  const city = (await searchParams).city || "";
  const page = parseInt((await searchParams).page) || 1;
  const limit = 9;

  // Fetching
  const res = await fetch(
    `http://localhost:500/destinations?city=${city}&page=${page}&limit=${limit}`,
    {
      cache: "no-store",
    },
  );

  const { data: destinations, totalPages } = await res.json();
  return (
    <div className="w-11/12 mx-auto">
      {/* Title---->>> */}
      <h1 className="text-4xl flex justify-center font-bold mb-8 my-4">
        {city ? `Showing results for "${city}"` : "All Destinations"}
      </h1>
        <span className="flex justify-end font-semibold text-gray-500 mr-6">Found: ( {destinations.length} )</span>

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
            <DestinationsPagination
              totalPages={totalPages}
              page={page}
              city={city}
            ></DestinationsPagination>
          </div>{" "}
        </main>
      </div>
    </div>
  );
}
