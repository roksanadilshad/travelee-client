"use client";

import React, { useState, useMemo, useEffect, useCallback } from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { 
  Bell, Search, CalendarDays, Heart, Settings, LogOut, X, 
  Menu, PlaneTakeoff, Map, Briefcase, Utensils, Hotel, Compass, 
  MoreHorizontal, User, BarChart3, Users, MapPin, CreditCard, Loader2, 
  Home, ChevronRight
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

  // API URL from env
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  // Fetch User Details from MongoDB
  const fetchUserDetails = useCallback(async () => {
    // Only fetch if we have a session email and haven't loaded data yet
    if (!session?.user?.email) return;
    
    try {
      setLoading(true);
      const res = await fetch(`${API_URL}/user/email`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: session.user.email })
      });
      
      const result = await res.json();
      if (result.success) {
        setUserData(result.data);
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
    } finally {
      setLoading(false);
    }
  }, [session?.user?.email, API_URL]);

  useEffect(() => {
  if (status === "authenticated") {
    fetchUserDetails();
  } else if (status === "unauthenticated") {
    setLoading(false);
    // Optional: router.push('/login') 
  }
}, [status, fetchUserDetails]);

  // Role normalization
  const userRole = useMemo(() => {
    if (session?.user?.email === "roky18bd@gmail.com") return "admin";
    return userData?.role?.toLowerCase() || "user";
  }, [userData, session]);

  const isAdmin = userRole === "admin";

  const filteredMenu = useMemo(() => {
    const menuConfig = [
      { name: "Home", href: "/", icon: Home, roles: ["user", "admin"] },
      { name: "Browse", href: "/dashboard/browse", icon: Compass, roles: ["user", "admin"] },
      { name: "All Users", href: "/dashboard/users", icon: Users, roles: ["admin"] },
      { name: "Add Destinations", href: "/dashboard/destinations", icon: MapPin, roles: ["admin"] },
      { name: "My Tickets", href: "/dashboard/my-trips", icon: Briefcase, roles: ["user"] },
      { name: "Schedule", href: "/dashboard/schedule", icon: CalendarDays, roles: ["user", "admin"] },
      { name: "Saved Places", href: "/dashboard/wishlist", icon: Heart, roles: ["user"] },
      { name: "Profile", href: "/dashboard/my-profile", icon: User, roles: ["user", "admin"] },
    ];
    return menuConfig.filter(item => item.roles.includes(userRole));
  }, [userRole]);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    const params = new URLSearchParams(searchParams);
    if (value) params.set("q", value);
    else params.delete("q");
    router.replace(`${pathname}?${params.toString()}`);
  };

  // Prevent flicker during session check
  if (status === "loading" || (status === "authenticated" && loading)) {
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

      {/* Mobile Menu Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[45] lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <button 
        onClick={() => setIsSidebarOpen(true)}
        className="fixed top-6 left-6 z-[60] lg:hidden bg-white p-3 rounded-2xl shadow-md border border-slate-100"
      >
        <Menu size={20} />
      </button>

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

        <nav className="flex-1 px-6 space-y-1 overflow-y-auto">
          {filteredMenu.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link key={item.name} href={item.href}
                onClick={() => setIsSidebarOpen(false)}
                className={`flex items-center gap-4 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                  isActive ? "bg-[#0A1D1A] text-white shadow-lg" : "text-slate-400 hover:text-slate-900"
                }`}
              >
                <item.icon size={20} /> {item.name}
              </Link>
            );
          })}
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
            onClick={() => signOut({ callbackUrl: '/' })}
            className="flex w-full items-center gap-4 px-4 py-3 text-sm font-semibold text-slate-400 hover:text-red-500 transition-all"
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

          <div className="flex items-center gap-3 lg:gap-6">
            <div className="hidden md:flex items-center bg-white/50 rounded-2xl px-4 py-2 w-64 border border-slate-100 transition-all">
              <Search size={16} className="text-slate-400 mr-2" />
              <input 
                type="text" placeholder="Search data..." 
                className="bg-transparent border-none text-xs w-full outline-none font-medium"
                value={searchTerm} onChange={handleSearch}
              />
            </div>
            <button className="relative p-2.5 bg-white rounded-xl shadow-sm text-slate-400">
              <Bell size={20} />
              <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <img 
              src={userData?.image || `https://ui-avatars.com/api/?name=${userData?.fullName || 'User'}`} 
              alt="user" 
              className="h-12 w-12 rounded-2xl object-cover border-2 border-white shadow-sm" 
            />
          </div>
        </header>

        <div className="flex-1 flex overflow-hidden">
          <main className="flex-1 overflow-y-auto px-6 lg:px-12 pb-12 custom-scrollbar">
            <div className="max-w-7xl animate-in fade-in slide-in-from-bottom-4 duration-700 mt-6">
              {children}
            </div>
          </main>

          {/* Sidebar for regular users only */}
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