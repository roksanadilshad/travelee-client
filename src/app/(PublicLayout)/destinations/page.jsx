"use client"; // We convert the wrapper to Client-side to use the language hook

import DestinationCard from "@/components/Share/cards/DestinationCard";
import DestinationsPagination from "@/components/Share/DestinationsPagination";
import FilterAndSearch from "@/components/Share/FilterAndSearch";
import { useLanguage } from "@/context/LanguageContext"; // Adjust path as needed
import { useEffect, useState } from "react";

export default function DestinationsPage({ searchParams }) {
  const { t } = useLanguage();
  const [data, setData] = useState({ destinations: [], totalPages: 1, loading: true });

  // Extract params (In Next.js 15+, searchParams is a promise)
  const [params, setParams] = useState(null);

  useEffect(() => {
    async function resolveParams() {
      const p = await searchParams;
      setParams(p);
      
      const city = p?.city || "";
      const page = parseInt(p?.page) || 1;
      const limit = 9;
      const query = new URLSearchParams({ ...p, page, limit }).toString();

      const res = await fetch(`https://travelee-server.vercel.app/destinations?${query}`, { 
        cache: "no-store" 
      });
      
      if (res.ok) {
        const json = await res.json();
        setData({
          destinations: json.data || [],
          totalPages: json.totalPages || 1,
          loading: false
        });
      }
    }
    resolveParams();
  }, [searchParams]);

  if (data.loading) return <div className="min-h-screen bg-[var(--background)]" />;

  const city = params?.city || "";
  const page = parseInt(params?.page) || 1;

  return (
    <div className="container mx-auto mt-24 mb-20 px-4 pt-20">
      {/* HEADER SECTION - TACTICAL UI */}
      <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
        <div className="space-y-2">
          <h1 className="text-5xl font-black tracking-tighter uppercase italic text-[var(--foreground)]">
            {city ? `${t("dest.showing_results")} "${city}"` : t("dest.all_destinations")}
          </h1>
          <p className="text-[var(--primary)] font-bold tracking-[0.4em] uppercase text-[10px]">
            {t("dest.hub_subtitle")}
          </p>
        </div>
        
        {/* Units Found Badge */}
        <div className="bg-gray-600 text-gray-600 px-8 py-3 rounded-full font-black text-xs italic shadow-xl shadow-[var(--primary)]/10 flex items-center gap-2">
          <span className="text-primary text-lg">●</span>
          {data.destinations.length} {t("dest.found_count")}
        </div>
      </div>

      <main className="grid grid-cols-1 md:grid-cols-12 gap-8 p-3">
        {/* SIDEBAR: SEARCH & FILTER (LEFT) */}
        <aside className="col-span-1 md:col-span-3 lg:col-span-2">

            <FilterAndSearch />
        
        </aside>

        {/* CARD CONTAINER (RIGHT) */}
        <div className="col-span-1 md:col-span-9 lg:col-span-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {data.destinations.length > 0 ? (
              data.destinations.map((destination, idx) => (
                <DestinationCard
                  key={destination._id}
                  destination={destination}
                  index={idx} // Passing index for staggered animation
                />
              ))
            ) : (
              <div className="col-span-full py-20 bg-[var(--muted)]/30 rounded-[var(--radius)] text-center border-2 border-dashed border-[var(--border)]">
                <p className="text-[var(--muted-foreground)] font-bold uppercase italic">
                   {t("dest.no_results")} {city}
                </p>
              </div>
            )}
          </div>

          {/* PAGINATION */}
          <div className="mt-16 flex justify-center">
            <DestinationsPagination
              totalPages={data.totalPages}
              page={page}
              city={city}
            />
          </div>
        </div>
      </main>
    </div>
  );
}