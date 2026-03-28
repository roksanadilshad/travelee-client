"use client";

import React, { useState, useRef, useMemo, useEffect, useCallback } from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { 
  Bell, Search, CalendarDays, Heart, Settings, LogOut, X, 
  Menu, PlaneTakeoff, Map, Briefcase, Utensils, Hotel, Compass, 
  MoreHorizontal, User, BarChart3, Users, MapPin, CreditCard, Loader2 
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
  const scrollRef = useRef(null);


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
      console.error("Error fetching user role:", error);
    } finally {
      setLoading(false);
    }
  }, [session?.user?.email]);

  useEffect(() => {
    fetchUserDetails();
  }, [fetchUserDetails]);


  const userRole = userData?.role || "user";
  const isAdmin = userRole === "admin";

 
  const filteredMenu = useMemo(() => {
    const menuConfig = [
      { name: "Browse", href: "/dashboard/browse", icon: Compass, roles: ["user", "admin"] },
      // { name: "Analytics", href: "/dashboard/analytics", icon: BarChart3, roles: ["admin"] },
      { name: "All Users", href: "/dashboard/users", icon: Users, roles: ["admin"] },
      { name: "Add Destinations", href: "/dashboard/add-destination", icon: MapPin, roles: ["admin"] },
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

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - 200 : scrollLeft + 200;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  const menuConfig = [
    { name: "Browse", href: "/dashboard/browse", icon: Compass },
    { name: "Tickets", href: "/dashboard/my-trips", icon: Briefcase },
    { name: "Schedule Planning", href: "/dashboard/schedule", icon: CalendarDays },
    // { name: "Messages", href: "/dashboard/messages", icon: MessageSquare },
    { name: "Saved Places", href: "/dashboard/wishlist", icon: Heart },
    { name: "Profile", href: "/dashboard/my-profile", icon: User },
  ];

 
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

      <button 
        onClick={() => setIsSidebarOpen(true)}
        className="fixed top-6 left-6 z-[60] lg:hidden bg-white p-3 rounded-2xl shadow-md border border-slate-100"
      >
        <Menu size={20} />
      </button>

      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-white transform transition-transform duration-300 ease-in-out flex flex-col
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
        lg:relative lg:translate-x-0 border-r border-slate-50
      `}>
        <div className="h-24 flex items-center justify-between px-8">
          <Link href="/"><TraveleeLogo /></Link>
          <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden text-slate-400">
            <X size={20}/>
          </button>
        </div>

        <nav className="flex-1 px-6 space-y-1">
          {filteredMenu.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link key={item.name} href={item.href}
                className={`flex items-center gap-4 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                  isActive ? "bg-[#0A1D1A] text-white shadow-lg" : "text-slate-400 hover:text-slate-900"
                }`}
              >
                <item.icon size={20} /> {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="p-6 border-t border-slate-50">
          <button 
            onClick={() => signOut()}
            className="flex w-full items-center gap-4 px-4 py-3 text-sm font-semibold text-slate-400 hover:text-red-500 transition-all"
          >
            <LogOut size={20} /> Logout
          </button>
        </div>
      </aside>

      {/* Main Container */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <header className="h-24 flex items-center justify-between px-8 lg:px-12 bg-[#F4F7FE]/80 backdrop-blur-sm sticky top-0 z-30">
          <div className="ml-14 lg:ml-0">
            <h1 className="text-2xl lg:text-3xl font-bold text-slate-900 tracking-tight">
              Hello, {userData?.fullName?.split(' ')[0] || "User"}
              {isAdmin && (
                <span className="ml-3 text-[10px] bg-emerald-100 text-emerald-600 px-2 py-1 rounded-lg uppercase font-black">
                  Admin Panel
                </span>
              )}
            </h1>
            <p className="text-xs text-slate-400 font-medium">
              {isAdmin ? "System Overview & Management" : "Explore your next adventure!"}
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center bg-white rounded-2xl px-4 py-2.5 w-72 shadow-sm border border-white">
              <Search size={18} className="text-slate-300 mr-2" />
              <input 
                type="text" placeholder="Search..." 
                className="bg-transparent border-none text-sm w-full outline-none"
                value={searchTerm} onChange={handleSearch}
              />
            </div>
            <img 
              src={userData?.image || `https://ui-avatars.com/api/?name=${userData?.fullName}`} 
              alt="user" 
              className="h-12 w-12 rounded-2xl object-cover border-2 border-white shadow-sm" 
            />
          </div>
        </header>

        <div className="flex-1 flex overflow-hidden">
          <main className="flex-1 overflow-y-auto px-6 lg:px-12 pb-10">
            
            {/* Admin Only Stats */}
            {isAdmin && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10 mt-4">
                <StatCard icon={<Users size={24}/>} label="Total Users" count="1,284" color="bg-blue-500" />
                <StatCard icon={<MapPin size={24}/>} label="Destinations" count="452" color="bg-emerald-500" />
                <StatCard icon={<Briefcase size={24}/>} label="Active Trips" count="85" color="bg-orange-500" />
                <StatCard icon={<CreditCard size={24}/>} label="Total Revenue" count="$12.5k" color="bg-purple-500" />
              </div>
            )}

            <div className="max-w-6xl">
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

const StatCard = ({ icon, label, count, color }) => (
  <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-50 flex items-center gap-5 hover:shadow-md transition-all">
    <div className={`${color} p-4 rounded-2xl text-white shadow-lg`}>{icon}</div>
    <div>
      <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">{label}</p>
      <h3 className="text-2xl font-black text-slate-900">{count}</h3>
    </div>
  </div>
);