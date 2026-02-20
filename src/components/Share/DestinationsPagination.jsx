import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import React from "react";

const DestinationsPagination = ({ totalPages, page, city }) => {
  return (
    <div>
      {/* Pagination ---->>>>> */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center space-x-2 md:space-x-6 lg:space-x-12 mt-6 mb-8">
          {/* Previous Button */}
          <Link
            href={`/destinations?city=${city}&page=${page - 1}`}
            className={`px-3 py-1 flex items-center font-semibold rounded border ${
              page === 1
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-white"
            }`}
            aria-disabled={page === 1}
          >
            <ArrowLeft className="w-5 h-5" /> Prev
          </Link>

          {/* Page Numbers */}
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
            <Link
              key={num}
              href={`/destinations?city=${city}&page=${num}`}
              className={`px-3 py-1 rounded border ${
                page === num ? "bg-blue-500 text-white" : "bg-white"
              }`}
            >
              {num}
            </Link>
          ))}

          {/* Next Button */}
          <Link
            href={`/destinations?city=${city}&page=${page + 1}`}
            className={`px-3 py-1 flex items-center font-semibold rounded border ${
              page === totalPages
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-white"
            }`}
            aria-disabled={page === totalPages}
          >
            Next <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      )}
    </div>
  );
};

export default DestinationsPagination;
