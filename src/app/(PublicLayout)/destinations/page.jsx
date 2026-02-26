"use client";

export const dynamic = "force-dynamic";

import DestinationCard from "@/components/Share/cards/DestinationCard";
import DestinationsPagination from "@/components/Share/DestinationsPagination";
import FilterAndSearch from "@/components/Share/FilterAndSearch";
import { useLanguage } from "@/context/LanguageContext";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function DestinationsPage() {
  const { t } = useLanguage();
  const searchParams = useSearchParams();

  const [data, setData] = useState({
    destinations: [],
    totalPages: 1,
    loading: true
  });

  const [params, setParams] = useState({});

  useEffect(() => {
    if (!searchParams) return;

    const city = searchParams.get("city") || "";
    const page = parseInt(searchParams.get("page")) || 1;
    const duration = searchParams.get("duration") || "";
    const budget = searchParams.get("budget") || "";
    const rating = searchParams.get("rating") || "";
    const sort = searchParams.get("sort") || "";
    const limit = 9;

    const query = new URLSearchParams({
      ...(city && { city }),
      ...(duration && { duration }),
      ...(budget && { budget }),
      ...(rating && { rating }),
      ...(sort && { sort }),
      page,
      limit
    }).toString();

    setParams({ city, page });

    async function fetchData() {
      try {
        const res = await fetch(
          `https://travelee-server.vercel.app/destinations?${query}`,
          { cache: "no-store" }
        );

        if (!res.ok) throw new Error("Failed to fetch");

        const json = await res.json();

        setData({
          destinations: json.data || [],
          totalPages: json.totalPages || 1,
          loading: false
        });
      } catch (error) {
        console.error("Fetch error:", error);
        setData(prev => ({ ...prev, loading: false }));
      }
    }

    fetchData();

  }, [searchParams]);

  if (data.loading) {
    return <div className="min-h-screen bg-[var(--background)]" />;
  }

  const city = params.city || "";
  const page = params.page || 1;

  return (
    <div className="container mx-auto mt-24 mb-20 px-4 pt-20">
      
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
        <div className="space-y-2">
          <h1 className="text-5xl font-black tracking-tighter uppercase italic text-[var(--foreground)]">
            {city
              ? `${t("dest.showing_results")} "${city}"`
              : t("dest.all_destinations")}
          </h1>
          <p className="text-[var(--primary)] font-bold tracking-[0.4em] uppercase text-[10px]">
            {t("dest.hub_subtitle")}
          </p>
        </div>

        <div className="bg-white text-gray-600 px-8 py-3 rounded-full font-black text-xs italic shadow-xl shadow-[var(--primary)]/10 flex items-center gap-2">
          <span className="text-primary text-lg">●</span>
          {data.destinations.length} {t("dest.found_count")}
        </div>
      </div>

      <main className="grid grid-cols-1 md:grid-cols-12 gap-8 p-3">
        
        {/* FILTER */}
        <aside className="col-span-1 md:col-span-3 lg:col-span-2">
          <FilterAndSearch />
        </aside>

        {/* DESTINATIONS */}
        <div className="col-span-1 md:col-span-9 lg:col-span-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {data.destinations.length > 0 ? (
              data.destinations.map((destination, idx) => (
                <DestinationCard
                  key={destination._id}
                  destination={destination}
                  index={idx}
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