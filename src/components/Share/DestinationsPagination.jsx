"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

const DestinationsPagination = ({ totalPages, page, city }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handlePageChange = (newPage) => {
    const params = new URLSearchParams(searchParams.toString());

    if (city) params.set("city", city);
    params.set("page", newPage);

    // Update URL and refresh server component
    router.push(`/destinations?${params.toString()}`);
    router.refresh(); // this forces server component to fetch fresh data
  };

  return (
    <div>
      {totalPages > 1 && (
        <div className="flex justify-center items-center space-x-2 md:space-x-6 lg:space-x-12 mt-6 mb-8">

          {/* Previous Button */}
          {page > 1 ? (
            <button
              onClick={() => handlePageChange(page - 1)}
              className="px-3 py-1 flex items-center font-semibold rounded border bg-white"
            >
              <ArrowLeft className="w-5 h-5" /> Prev
            </button>
          ) : (
            <span className="px-3 py-1 flex items-center font-semibold rounded border bg-gray-300 text-gray-500 cursor-not-allowed">
              <ArrowLeft className="w-5 h-5" /> Prev
            </span>
          )}

          {/* Page Numbers */}
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
            <button
              key={num}
              onClick={() => handlePageChange(num)}
              className={`px-3 py-1 rounded border ${
                page === num ? "bg-blue-500 text-white" : "bg-white"
              }`}
            >
              {num}
            </button>
          ))}

          {/* Next Button */}
          {page < totalPages ? (
            <button
              onClick={() => handlePageChange(page + 1)}
              className="px-3 py-1 flex items-center font-semibold rounded border bg-white"
            >
              Next <ArrowRight className="w-5 h-5" />
            </button>
          ) : (
            <span className="px-3 py-1 flex items-center font-semibold rounded border bg-gray-300 text-gray-500 cursor-not-allowed">
              Next <ArrowRight className="w-5 h-5" />
            </span>
          )}

        </div>
      )}
    </div>
  );
};

export default DestinationsPagination;