"use client";

import React, { useState, useMemo, useEffect, useCallback } from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { 
  Bell, Search, CalendarDays, Heart, Settings, LogOut, X, 
  Menu, Briefcase, Compass, User, BarChart3, Users, MapPin, Loader2, ChevronRight, 
  LayoutGrid
} from "lucide-react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TraveleeLogo from "@/components/Share/Logo";
import { useSession, signOut } from "next-auth/react";
import RightSidebar from "@/components/dashboard/RightSidebar";

export default function DashboardLayout({ children }) {
  const { data: session, status } = useSession();
  const [userData, setUserData] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get("q") || "");

  // Fetch User Details from MongoDB
  const fetchUserDetails = useCallback(async () => {
    if (!session?.user?.email) return;
    try {
      setLoading(true);
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/email`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: session.user.email })
      });
      const result = await res.json();
      if (result.success) {
        setUserData(result.data);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      setLoading(false);
    }
  }, [session?.user?.email]);

  useEffect(() => {
    fetchUserDetails();
  }, [fetchUserDetails]);

  // Role normalization
  const userRole = useMemo(() => {
    if (session?.user?.email === "roky18bd@gmail.com") return "admin";
    return userData?.role?.toLowerCase() || "user";
  }, [userData, session]);

  const isAdmin = userRole === "admin";

  // Sidebar Menu Configuration
  const menuConfig = useMemo(() => [
    { name: "Browse", href: "/dashboard/browse", icon: Compass, roles: ["user"], category: "main" },
    { name: "Admin Browse", href: "/dashboard/admin-browse", icon: LayoutGrid, roles: ["admin"], category: "main" },
    { name: "My Tickets", href: "/dashboard/my-trips", icon: Briefcase, roles: ["user"], category: "main" },
    { name: "Saved Places", href: "/dashboard/wishlist", icon: Heart, roles: ["user"], category: "main" },
    { name: "Schedule", href: "/dashboard/schedule", icon: CalendarDays, roles: ["user"], category: "main" },
    { name: "Analytics", href: "/dashboard/analytics", icon: BarChart3, roles: ["admin"], category: "admin" },
    { name: "All Users", href: "/dashboard/users", icon: Users, roles: ["admin"], category: "admin" },
    { name: "Add Destinations", href: "/dashboard/add-destination", icon: MapPin, roles: ["admin"], category: "admin" },
     { name: "All Destinations", href: "/dashboard/all-destination", icon: MapPin, roles: ["admin"], category: "admin" },
    { name: "Profile", href: "/dashboard/my-profile", icon: User, roles: ["user", "admin"], category: "settings" },
  ], []);

  // Filter logic
  const filteredMenu = useMemo(() => 
    menuConfig.filter(item => item.roles.includes(userRole)), 
  [userRole, menuConfig]);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    const params = new URLSearchParams(searchParams);
    if (value) params.set("q", value);
    else params.delete("q");
    router.replace(`${pathname}?${params.toString()}`);
  };

  if (status === "loading" || loading) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-[#F4F7FE]">
        <Loader2 className="w-10 h-10 text-emerald-500 animate-spin mb-4" />
        <p className="text-xs font-black text-slate-400 uppercase tracking-[0.2em]">Verifying Access...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F4F7FE] flex font-sans overflow-hidden">
      <ToastContainer position="bottom-right" />

      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-72 bg-white transform transition-transform duration-300 ease-in-out flex flex-col
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
        lg:relative lg:translate-x-0 border-r border-slate-100
      `}>
        <div className="h-24 flex items-center justify-between px-8">
          <Link href="/"><TraveleeLogo /></Link>
          <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden text-slate-400 p-2 rounded-lg">
            <X size={20}/>
          </button>
        </div>

        <nav className="flex-1 px-6 space-y-8 overflow-y-auto pt-4 custom-scrollbar">
          {/* Main Menu */}
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-4 px-4">Menu</p>
            <div className="space-y-1">
              {filteredMenu.filter(i => i.category === "main").map((item) => (
                <SidebarItem key={item.name} item={item} isActive={pathname === item.href} />
              ))}
            </div>
          </div>

          {/* Admin Management */}
          {isAdmin && (
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-4 px-4">Management</p>
              <div className="space-y-1">
                {filteredMenu.filter(i => i.category === "admin").map((item) => (
                  <SidebarItem key={item.name} item={item} isActive={pathname === item.href} />
                ))}
              </div>
            </div>
          )}

          {/* Settings/User */}
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-4 px-4">User</p>
            <div className="space-y-1">
              {filteredMenu.filter(i => i.category === "settings").map((item) => (
                <SidebarItem key={item.name} item={item} isActive={pathname === item.href} />
              ))}
            </div>
          </div>
        </nav>

        {/* User Profile Footer */}
        <div className="p-6 border-t border-slate-50 bg-slate-50/50">
          <div className="flex items-center gap-3 mb-4 px-2">
            <img 
              src={userData?.image || `https://ui-avatars.com/api/?name=${userData?.fullName}`} 
              className="h-10 w-10 rounded-xl object-cover shadow-sm"
              alt="Profile"
            />
            <div className="overflow-hidden">
              <p className="text-sm font-bold text-slate-900 truncate">{userData?.fullName || "User"}</p>
              <p className="text-[10px] font-medium text-emerald-600 uppercase tracking-wider">{userRole}</p>
            </div>
          </div>
          <button 
            onClick={() => signOut()}
            className="flex w-full items-center gap-4 px-4 py-3 text-sm font-bold text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
          >
            <LogOut size={18} /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <header className="h-20 flex items-center justify-between px-8 lg:px-12 bg-[#F4F7FE]/70 backdrop-blur-md sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <button onClick={() => setIsSidebarOpen(true)} className="lg:hidden p-2 bg-white rounded-xl shadow-sm">
              <Menu size={20}/>
            </button>
            <div>
              <h1 className="text-xl lg:text-2xl font-black text-slate-900 tracking-tight">
                {userData?.fullName ? userData.fullName.split(' ')[0] : "Traveler"}
                {isAdmin && <span className="ml-2 text-[9px] bg-emerald-500 text-white px-2 py-0.5 rounded uppercase">Admin</span>}
              </h1>
              <p className="text-[11px] text-slate-400 font-bold uppercase tracking-wider hidden sm:block">
                {isAdmin ? "Administrator Dashboard" : "Travel Enthusiast"}
              </p>
            </div>
          </div>
        </header>

        <div className="flex-1 flex overflow-hidden">
          <main className="flex-1 overflow-y-auto px-6 lg:px-12 pb-12 custom-scrollbar">
            <div className="max-w-7xl animate-in fade-in slide-in-from-bottom-4 duration-700 mt-6">
              {children}
            </div>
          </main>

          {!isAdmin && (
            <aside className="hidden 2xl:flex flex-col w-[380px] bg-white m-6 mt-0 rounded-[2.5rem] p-8 overflow-y-auto shadow-sm border border-slate-50">
              <RightSidebar/>
            </aside>
          )}
        </div>
      </div>
    </div>
  );
}

const SidebarItem = ({ item, isActive }) => (
  <Link href={item.href}
    className={`group flex items-center justify-between px-4 py-3.5 rounded-2xl text-[13px] font-bold transition-all duration-300 ${
      isActive 
      ? "bg-[#0A1D1A] text-white shadow-lg translate-x-1" 
      : "text-slate-400 hover:text-slate-900 hover:bg-slate-50"
    }`}
  >
    <div className="flex items-center gap-4">
      <item.icon size={19} className={`${isActive ? "text-emerald-400" : "text-slate-400 group-hover:text-emerald-500"}`} /> 
      {item.name}
    </div>
    {isActive && <ChevronRight size={14} className="text-emerald-400" />}
  </Link>
);