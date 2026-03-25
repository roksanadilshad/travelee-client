"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import { 
  Users, Mail, Trash2, Search, 
  Loader2, ShieldCheck, ShieldAlert, Ban, CheckCircle, 
  RefreshCw, ChevronLeft, ChevronRight, UserX
} from "lucide-react";
import Swal from "sweetalert2";
import { useAuth } from "@/hooks/useAuth";

const AllUsersPage = () => {
  const { token } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const fetchAllUsers = useCallback(async () => {
    if (!token) return;
    try {
      setLoading(true);
      const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/user`;
      const res = await fetch(apiUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}` 
        }
      });
      const result = await res.json();
      if (result.success && Array.isArray(result.data)) {
        setUsers(result.data);
      } else if (Array.isArray(result)) {
        setUsers(result);
      }
    } catch (error) {
      console.error("Fetch Error:", error);
    } finally {
      setTimeout(() => setLoading(false), 500); // Smooth transition
    }
  }, [token]);

  useEffect(() => {
    fetchAllUsers();
  }, [fetchAllUsers]);

  const filteredUsers = useMemo(() => {
    return users.filter(user => 
      user.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) || 
      user.email?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [users, searchTerm]);

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const currentItems = filteredUsers.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (userId) => {
    const confirm = await Swal.fire({
      title: "Confirm Deletion",
      text: "This user profile and associated data will be permanently removed.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#FF6B6B",
      cancelButtonColor: "#94a3b8",
      confirmButtonText: "Yes, Delete User",
      background: "var(--background)",
      color: "var(--foreground)"
    });

    if (confirm.isConfirmed) {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/${userId}`, {
          method: "DELETE",
          headers: { "Authorization": `Bearer ${token}` }
        });
        if (res.ok) {
          setUsers(prev => prev.filter(u => u._id !== userId));
          Swal.fire("Deleted!", "The user has been successfully removed.", "success");
        }
      } catch (error) {
        Swal.fire("Error", "Could not complete the request.", "error");
      }
    }
  };

  const handleToggleStatus = async (userId, currentStatus) => {
    const isBlocked = currentStatus === "blocked";
    const newStatus = isBlocked ? "active" : "blocked";

    const confirm = await Swal.fire({
      title: isBlocked ? "Unblock User?" : "Block User?",
      text: `User will ${isBlocked ? "regain" : "lose"} access to the platform immediately.`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: isBlocked ? "#0EA5A4" : "#f59e0b",
      confirmButtonText: "Confirm Change"
    });

    if (confirm.isConfirmed) {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/${userId}/status`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
          body: JSON.stringify({ status: newStatus })
        });
        if (res.ok) {
          setUsers(prev => prev.map(u => u._id === userId ? { ...u, status: newStatus } : u));
          Swal.fire("Success", `User status updated to ${newStatus}.`, "success");
        }
      } catch (error) {
        Swal.fire("Error", "Action failed.", "error");
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-4 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Top Header */}
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary rounded-xl shadow-lg shadow-primary/20">
                <Users className="text-white w-6 h-6" />
              </div>
              <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">System Directory</h1>
            </div>
            <p className="text-slate-500 font-medium">Manage user credentials and security roles.</p>
          </div>

          <div className="flex items-center gap-3">
            <button 
              onClick={fetchAllUsers}
              className="p-3 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-all shadow-sm active:scale-95"
            >
              <RefreshCw size={20} className={`${loading ? "animate-spin text-primary" : "text-slate-600"}`} />
            </button>
          </div>
        </header>

        {/* Filters and Stats */}
        <div className="flex flex-col lg:flex-row gap-4 items-center">
          <div className="w-full lg:flex-1 relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" size={20} />
            <input 
              type="text" 
              placeholder="Filter by name, email or unique ID..." 
              className="w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-2xl shadow-sm outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary transition-all text-slate-700 font-medium placeholder:text-slate-400"
              value={searchTerm}
              onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
            />
          </div>
          <div className="w-full lg:w-72 flex items-center justify-between px-6 py-4 bg-white border border-slate-200 rounded-2xl shadow-sm">
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Operational</span>
              <span className="text-2xl font-black text-slate-800">{users.filter(u => u.status !== 'blocked').length} <span className="text-sm font-normal text-slate-400">/ {users.length}</span></span>
            </div>
            <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center text-primary">
              <ShieldCheck size={28} />
            </div>
          </div>
        </div>

        {/* Table Container */}
        <div className="bg-white rounded-[2rem] border border-slate-200 shadow-2xl shadow-slate-200/50 overflow-hidden">
          <div className="overflow-x-auto custom-scrollbar">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-50/50 border-b border-slate-100">
                  <th className="px-8 py-5 text-left text-xs font-bold text-slate-400 uppercase tracking-widest">Identification</th>
                  <th className="px-8 py-5 text-left text-xs font-bold text-slate-400 uppercase tracking-widest">Security Level</th>
                  <th className="px-8 py-5 text-left text-xs font-bold text-slate-400 uppercase tracking-widest">Connectivity</th>
                  <th className="px-8 py-5 text-right text-xs font-bold text-slate-400 uppercase tracking-widest">Control Panel</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {loading ? (
                  Array.from({ length: 5 }).map((_, i) => (
                    <tr key={i} className="animate-pulse">
                      <td className="px-8 py-6"><div className="flex gap-4 items-center"><div className="w-12 h-12 bg-slate-100 rounded-full"></div><div className="space-y-2"><div className="w-32 h-4 bg-slate-100 rounded"></div><div className="w-48 h-3 bg-slate-100 rounded"></div></div></div></td>
                      <td className="px-8 py-6"><div className="w-20 h-6 bg-slate-100 rounded-full"></div></td>
                      <td className="px-8 py-6"><div className="w-24 h-4 bg-slate-100 rounded"></div></td>
                      <td className="px-8 py-6"><div className="flex justify-end gap-2"><div className="w-8 h-8 bg-slate-100 rounded-lg"></div><div className="w-8 h-8 bg-slate-100 rounded-lg"></div></div></td>
                    </tr>
                  ))
                ) : currentItems.length > 0 ? (
                  currentItems.map((user) => (
                    <tr key={user._id} className="hover:bg-slate-50/80 transition-all duration-200 group">
                      <td className="px-8 py-5">
                        <div className="flex items-center gap-4">
                          <div className="relative">
                            <img 
                              src={user.image || `https://ui-avatars.com/api/?name=${user.fullName}&background=0EA5A4&color=fff&bold=true`} 
                              className="w-12 h-12 rounded-2xl object-cover ring-2 ring-white shadow-md transition-transform group-hover:scale-105"
                            />
                            <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${user.status === 'blocked' ? 'bg-slate-300' : 'bg-emerald-500'}`}></div>
                          </div>
                          <div>
                            <p className="font-bold text-slate-800 text-sm">{user.fullName}</p>
                            <p className="text-xs text-slate-400 font-medium flex items-center gap-1"><Mail size={12}/> {user.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-5">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider border ${
                          user.role === 'admin' ? 'bg-indigo-50 text-indigo-600 border-indigo-100' : 'bg-slate-100 text-slate-500 border-slate-200'
                        }`}>
                          {user.role === 'admin' ? <ShieldAlert size={12} /> : <ShieldCheck size={12} />}
                          {user.role || 'Member'}
                        </span>
                      </td>
                      <td className="px-8 py-5">
                        <div className="flex flex-col">
                          <span className={`text-xs font-bold ${user.status === 'blocked' ? 'text-accent' : 'text-primary'}`}>
                            {user.status === 'blocked' ? 'Restricted' : 'Authenticated'}
                          </span>
                           
                        </div>
                      </td>
                      <td className="px-8 py-5 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button 
                            onClick={() => handleToggleStatus(user._id, user.status || 'active')}
                            className={`p-2.5 rounded-xl transition-all border ${
                              user.status === 'blocked' 
                              ? 'bg-primary/5 text-primary border-primary/20 hover:bg-primary/10' 
                              : 'bg-amber-50 text-amber-600 border-amber-100 hover:bg-amber-100'
                            }`}
                            title="Update Access Status"
                          >
                            {user.status === 'blocked' ? <CheckCircle size={18} /> : <Ban size={18} />}
                          </button>
                          <button 
                            onClick={() => handleDelete(user._id)}
                            className="p-2.5 bg-rose-50 text-accent border border-rose-100 hover:bg-accent hover:text-white rounded-xl transition-all"
                            title="Permanent Deletion"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="py-24">
                      <div className="flex flex-col items-center text-center space-y-3">
                        <div className="p-4 bg-slate-50 rounded-full">
                          <UserX className="w-12 h-12 text-slate-300" />
                        </div>
                        <h3 className="text-lg font-bold text-slate-700">Database Empty</h3>
                        <p className="text-slate-400 max-w-xs mx-auto text-sm">No user records matched your current filtering criteria.</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Professional Pagination */}
          {totalPages > 1 && (
            <div className="px-8 py-6 border-t border-slate-100 bg-slate-50/30 flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em]">
                Page {currentPage} <span className="text-slate-200 mx-2">|</span> {filteredUsers.length} Entries
              </span>
              
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="w-10 h-10 flex items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 hover:border-primary hover:text-primary disabled:opacity-30 transition-all shadow-sm"
                >
                  <ChevronLeft size={18} />
                </button>
                
                <div className="flex items-center gap-1.5 mx-2">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`w-10 h-10 rounded-xl font-bold text-xs transition-all ${
                        currentPage === page 
                        ? 'bg-primary text-white shadow-lg shadow-primary/30 scale-110' 
                        : 'bg-white text-slate-500 border border-slate-200 hover:border-primary/50'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                </div>

                <button 
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="w-10 h-10 flex items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 hover:border-primary hover:text-primary disabled:opacity-30 transition-all shadow-sm"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar { height: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #E2E8F0; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #0EA5A4; }
      `}</style>
    </div>
  );
};

export default AllUsersPage;