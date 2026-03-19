"use client";

import React, { useState, useEffect, useCallback } from "react";
import { 
  Users, Mail, Trash2, Search, 
  MoreVertical, Loader2, ShieldCheck, ShieldAlert
} from "lucide-react";
import Swal from "sweetalert2";
import { useAuth } from "@/hooks/useAuth";

const AllUsersPage = () => {
  const { token } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchAllUsers = useCallback(async () => {
  
    if (!token) {
      console.log("Waiting for token...");
      return;
    }

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

      if (res.status === 401) {
        console.error("401 Unauthorized: আপনার টোকেনটি ব্যাকএন্ড গ্রহণ করছে না।");
        setLoading(false);
        return;
      }

      const result = await res.json();
      
      
      if (result.success && Array.isArray(result.data)) {
        setUsers(result.data);
      } else if (Array.isArray(result)) {
        setUsers(result);
      } else {
        console.error("Unexpected data format:", result);
      }

    } catch (error) {
      console.error("Fetch Error:", error);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchAllUsers();
  }, [fetchAllUsers]);

 
  const handleDelete = async (userId) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "User delete korle r fire paben na!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#10b981",
      cancelButtonColor: "#ef4444",
      confirmButtonText: "Yes, delete!"
    });

    if (confirm.isConfirmed) {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/${userId}`, {
          method: "DELETE",
          headers: { "Authorization": `Bearer ${token}` }
        });
        
        if (res.ok) {
          setUsers(prev => prev.filter(user => user._id !== userId));
          Swal.fire("Deleted!", "User remove kora hoyeche.", "success");
        }
      } catch (error) {
        Swal.fire("Error", "Delete fail hoyeche!", "error");
      }
    }
  };

  const filteredUsers = users.filter(user => 
    user.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    user.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto pb-20 p-4">
      
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
        <div>
          <h2 className="text-3xl font-black text-slate-900 flex items-center gap-3">
            <div className="p-3 bg-[#0A1D1A] rounded-2xl text-white shadow-lg">
                <Users size={24} />
            </div>
            User Management
          </h2>
          <p className="text-sm text-slate-400 font-medium mt-1">Total {users.length} members joined</p>
        </div>
        
        <div className="relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
          <input 
            type="text" 
            placeholder="Search users..." 
            className="pl-12 pr-6 py-4 bg-white rounded-[1.5rem] text-sm w-full md:w-96 shadow-sm outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      
      <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50">
                <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">User Details</th>
                <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Role</th>
                <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {loading ? (
                <tr>
                  <td colSpan="3" className="py-24 text-center">
                    <Loader2 className="w-10 h-10 text-emerald-500 animate-spin mx-auto mb-4" />
                    <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Fetching Users...</p>
                  </td>
                </tr>
              ) : filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <tr key={user._id} className="hover:bg-slate-50/30 transition-colors group">
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl overflow-hidden bg-slate-100 shadow-sm border border-slate-200 flex-shrink-0">
                          <img 
                            src={user.image || `https://ui-avatars.com/api/?name=${user.fullName}&background=random`} 
                            alt={user.fullName} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <p className="text-sm font-black text-slate-900">{user.fullName}</p>
                          <p className="text-xs text-slate-400 flex items-center gap-1 font-medium">
                            <Mail size={12} /> {user.email}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest ${
                        user.role === 'admin' 
                        ? 'bg-purple-100 text-purple-600' 
                        : 'bg-emerald-100 text-emerald-600'
                      }`}>
                        {user.role === 'admin' ? <ShieldAlert size={12} /> : <ShieldCheck size={12} />}
                        {user.role || 'User'}
                      </span>
                    </td>
                    <td className="px-8 py-5 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button 
                          onClick={() => handleDelete(user._id)}
                          className="p-2.5 bg-red-50 text-red-400 hover:text-red-600 hover:bg-red-100 rounded-xl transition-all"
                        >
                          <Trash2 size={18} />
                        </button>
                        <button className="p-2.5 bg-slate-50 text-slate-400 hover:text-slate-900 rounded-xl">
                          <MoreVertical size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="py-20 text-center text-slate-400">
                    No users found with {searchTerm}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AllUsersPage;