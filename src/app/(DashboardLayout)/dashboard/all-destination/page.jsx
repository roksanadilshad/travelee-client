"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import { 
  MapPin, Trash2, Search, Eye, EyeOff, 
  RefreshCw, Globe, List, ChevronLeft, ChevronRight, LayoutGrid, Table as TableIcon
} from "lucide-react";
import Swal from "sweetalert2";
import { useAuth } from "@/hooks/useAuth";

const AllDestinationsPage = () => {
  const { token } = useAuth();
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState("table");
  const itemsPerPage = 12;

  const fetchDestinations = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/destinations?limit=200`, {
        headers: { "Authorization": `Bearer ${token}` }
      });
      const result = await res.json();
      if (result.data) {
        const sanitizedData = result.data.map(item => ({
          ...item,
          isVisible: item.isVisible !== false 
        }));
        setDestinations(sanitizedData);
      }
    } catch (error) {
      console.error("Fetch Error:", error);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => { fetchDestinations(); }, [fetchDestinations]);

  const filteredItems = useMemo(() => {
    return destinations.filter(item => 
      item.city?.toLowerCase().includes(searchTerm.toLowerCase()) || 
      item.country?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [destinations, searchTerm]);

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const currentItems = filteredItems.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This destination will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      confirmButtonText: "Yes, delete it!"
    });

    if (confirm.isConfirmed) {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/destinations/${id}`, {
          method: "DELETE",
          headers: { "Authorization": `Bearer ${token}` }
        });
        if (res.ok) {
          setDestinations(prev => prev.filter(d => d._id !== id));
          Swal.fire("Deleted!", "Destination removed.", "success");
        }
      } catch (error) {
        Swal.fire("Error", "Failed to delete.", "error");
      }
    }
  };

  const handleToggleVisibility = async (id, currentVisibility) => {
    const newVisibility = !currentVisibility;
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/destinations/${id}/visibility`, {
        method: "PATCH",
        headers: { 
          "Content-Type": "application/json", 
          "Authorization": `Bearer ${token}` 
        },
        body: JSON.stringify({ isVisible: newVisibility })
      });
      
      if (res.ok) {
        setDestinations(prev => prev.map(d => d._id === id ? { ...d, isVisible: newVisibility } : d));
        const toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true,
          });
          toast.fire({
            icon: 'success',
            title: `Destination is now ${newVisibility ? 'Visible' : 'Hidden'}`
          });
      }
    } catch (error) {
      Swal.fire("Error", "Update failed.", "error");
    }
  };

  const getPageNumbers = () => {
    const pages = [];
    if (totalPages <= 3) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage === 1) pages.push(1, 2, 3);
      else if (currentPage === totalPages) pages.push(totalPages - 2, totalPages - 1, totalPages);
      else pages.push(currentPage - 1, currentPage, currentPage + 1);
    }
    return pages;
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-4 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-primary rounded-2xl shadow-lg shadow-primary/20">
              <Globe className="text-white w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-900 leading-none">All Destinations</h1>
              <p className="text-slate-500 text-sm mt-1">Manage search visibility and inventory.</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2 bg-white p-1.5 rounded-2xl border border-slate-200 shadow-sm">
            <button 
              onClick={() => setViewMode("table")}
              className={`p-2 rounded-xl transition-all ${viewMode === 'table' ? 'bg-primary text-white shadow-md' : 'text-slate-400 hover:text-slate-600'}`}
            >
              <TableIcon size={20} />
            </button>
            <button 
              onClick={() => setViewMode("grid")}
              className={`p-2 rounded-xl transition-all ${viewMode === 'grid' ? 'bg-primary text-white shadow-md' : 'text-slate-400 hover:text-slate-600'}`}
            >
              <LayoutGrid size={20} />
            </button>
            <div className="w-[1px] h-6 bg-slate-200 mx-1" />
            <button onClick={fetchDestinations} className="p-2 text-slate-400 hover:text-primary transition-all">
              <RefreshCw size={20} className={loading ? "animate-spin text-primary" : ""} />
            </button>
          </div>
        </header>

        {/* Search Bar */}
        <div className="flex flex-col lg:flex-row gap-4 items-center">
          <div className="w-full lg:flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search by city or country..." 
              className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-4 focus:ring-primary/5 outline-none transition-all"
              value={searchTerm}
              onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
            />
          </div>
          <div className="flex items-center gap-2 px-4 py-3 bg-white border border-slate-200 rounded-xl">
             <List size={18} className="text-slate-400" />
             <span className="text-sm font-semibold text-slate-600">{filteredItems.length} Total</span>
          </div>
        </div>

        {/* Dynamic Content View */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="bg-white h-64 rounded-2xl animate-pulse border border-slate-100" />
            ))}
          </div>
        ) : viewMode === "table" ? (
          /* TABLE VIEW */
          <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="px-6 py-4 text-xs font-bold uppercase text-slate-500">Destination</th>
                    <th className="px-6 py-4 text-xs font-bold uppercase text-slate-500">Location</th>
                    <th className="px-6 py-4 text-xs font-bold uppercase text-slate-500 text-center">Status</th>
                    <th className="px-6 py-4 text-xs font-bold uppercase text-slate-500 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {currentItems.map((item) => (
                    <tr key={item._id} className={`hover:bg-slate-50/50 transition-colors ${!item.isVisible && 'bg-slate-50/30'}`}>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <img 
                            src={item.media?.cover_image || item.image} 
                            alt={item.city} 
                            className="w-12 h-12 rounded-lg object-cover border border-slate-200" 
                          />
                          <span className="font-bold text-slate-800">{item.city}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1.5 text-slate-600">
                          <MapPin size={14} className="text-slate-400" />
                          <span className="text-sm">{item.country}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex justify-center">
                          <button 
                            onClick={() => handleToggleVisibility(item._id, item.isVisible)}
                            className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider transition-all ${
                              item.isVisible ? 'bg-emerald-100 text-emerald-600 hover:bg-emerald-200' : 'bg-slate-200 text-slate-600 hover:bg-slate-300'
                            }`}
                          >
                            {item.isVisible ? <Eye size={12} /> : <EyeOff size={12} />}
                            {item.isVisible ? 'Public' : 'Hidden'}
                          </button>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button onClick={() => handleDelete(item._id)} className="p-2 text-rose-500 hover:bg-rose-50 rounded-xl transition-colors">
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          /* GRID VIEW */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {currentItems.map((item) => (
              <div key={item._id} className="group bg-white border border-slate-200 rounded-3xl overflow-hidden hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300 relative">
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={item.media?.cover_image || item.image} 
                    alt={item.city} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-3 right-3 flex gap-2">
                     <button 
                      onClick={() => handleToggleVisibility(item._id, item.isVisible)}
                      className={`p-2 rounded-xl backdrop-blur-md shadow-lg transition-all ${
                        item.isVisible ? 'bg-white/90 text-emerald-600' : 'bg-slate-900/80 text-white'
                      }`}
                    >
                      {item.isVisible ? <Eye size={16} /> : <EyeOff size={16} />}
                    </button>
                  </div>
                </div>
                
                <div className="p-5">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-bold text-slate-900 text-lg leading-tight">{item.city}</h3>
                      <div className="flex items-center gap-1 text-slate-500 mt-1">
                        <MapPin size={12} />
                        <span className="text-xs font-medium">{item.country}</span>
                      </div>
                    </div>
                    <button 
                      onClick={() => handleDelete(item._id)}
                      className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-slate-50 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Status</span>
                    <span className={`text-[10px] font-black uppercase px-2 py-1 rounded-md ${item.isVisible ? 'text-emerald-600 bg-emerald-50' : 'text-slate-500 bg-slate-100'}`}>
                      {item.isVisible ? 'Live' : 'Hidden'}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && currentItems.length === 0 && (
          <div className="bg-white border border-slate-200 rounded-3xl py-20 text-center text-slate-400">
            <Search size={48} className="mx-auto mb-4 opacity-20" />
            <p className="font-medium">No destinations found matching your search.</p>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-3 py-6">
            <button
              disabled={currentPage === 1}
              onClick={() => { setCurrentPage(prev => prev - 1); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="p-2 rounded-xl border border-slate-200 bg-white text-slate-500 disabled:opacity-30 hover:bg-slate-50 transition-all shadow-sm"
            >
              <ChevronLeft size={20} />
            </button>

            <div className="flex items-center gap-2">
              {getPageNumbers().map((page) => (
                <button
                  key={page}
                  onClick={() => { setCurrentPage(page); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className={`w-10 h-10 rounded-xl font-bold text-xs transition-all ${
                    currentPage === page 
                    ? 'bg-primary text-white shadow-lg shadow-primary/30' 
                    : 'bg-white text-slate-500 border border-slate-200 hover:border-primary/50'
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>

            <button
              disabled={currentPage === totalPages}
              onClick={() => { setCurrentPage(prev => prev + 1); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="p-2 rounded-xl border border-slate-200 bg-white text-slate-500 disabled:opacity-30 hover:bg-slate-50 transition-all shadow-sm"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllDestinationsPage;