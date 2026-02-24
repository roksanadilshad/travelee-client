"use client";
import React from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

const DestinationsPagination = ({ totalPages, page, city }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handlePageChange = (newPage) => {
    // Create a new URLSearchParams instance from existing ones to preserve filters
    const params = new URLSearchParams(searchParams.toString());

    if (city) params.set("city", city);
    params.set("page", newPage);

    // Update URL - the server component will automatically pick this up
    router.push(`/destinations?${params.toString()}`, { scroll: false });
    router.refresh(); 
  };

  if (totalPages <= 1) return null;

  return (
    <div className="flex flex-col items-center justify-center space-y-4 py-12 border-t border-slate-100 mt-12">
      {/* PAGE STATUS INDICATOR */}
      <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">
        Syncing Page <span className="text-[#0EA5A4]">{page}</span> of <span className="text-slate-600">{totalPages}</span>
      </p>

      <div className="flex items-center gap-2">
        {/* PREV BUTTON */}
        <button
          onClick={() => handlePageChange(page - 1)}
          disabled={page <= 1}
          className={`flex items-center gap-2 px-5 py-2 rounded-xl font-bold transition-all duration-300 border ${
            page <= 1 
              ? "bg-slate-50 border-slate-100 text-slate-300 cursor-not-allowed" 
              : "bg-white border-slate-200 text-[#1E293B] hover:border-[#0EA5A4] hover:text-[#0EA5A4] shadow-sm"
          }`}
        >
          <ArrowLeft size={18} />
          <span className="text-xs uppercase tracking-widest">Prev</span>
        </button>

        {/* NUMERIC PAGINATION */}
        <div className="hidden md:flex items-center gap-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => {
             // Logic to only show a few pages if totalPages is huge
             if (num === 1 || num === totalPages || (num >= page - 1 && num <= page + 1)) {
                return (
                  <button
                    key={num}
                    onClick={() => handlePageChange(num)}
                    className={`w-10 h-10 rounded-xl font-black text-xs transition-all duration-300 border ${
                      page === num 
                        ? "bg-[#1E293B] border-[#1E293B] text-white shadow-lg" 
                        : "bg-white border-slate-200 text-slate-500 hover:border-[#0EA5A4] hover:text-[#0EA5A4]"
                    }`}
                  >
                    {num}
                  </button>
                );
             }
             if (num === page - 2 || num === page + 2) return <span key={num} className="text-slate-300">...</span>;
             return null;
          })}
        </div>

        {/* NEXT BUTTON */}
        <button
          onClick={() => handlePageChange(page + 1)}
          disabled={page >= totalPages}
          className={`flex items-center gap-2 px-5 py-2 rounded-xl font-bold transition-all duration-300 border ${
            page >= totalPages 
              ? "bg-slate-50 border-slate-100 text-slate-300 cursor-not-allowed" 
              : "bg-white border-slate-200 text-[#1E293B] hover:border-[#0EA5A4] hover:text-[#0EA5A4] shadow-sm"
          }`}
        >
          <span className="text-xs uppercase tracking-widest">Next</span>
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
};

export default DestinationsPagination;