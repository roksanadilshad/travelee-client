"use client";

import React, { useState, useRef, useMemo, useEffect, useCallback } from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { 
  Bell, Search, CalendarDays, Heart, Settings, LogOut, X, 
  Menu, Briefcase, Compass, User, BarChart3, Users, MapPin, Loader2, ChevronRight, 
  LayoutGrid,
  CreditCard
} from "lucide-react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TraveleeLogo from "@/components/Share/Logo";
import { useSession, signOut } from "next-auth/react";
import RightSidebar from "@/components/dashboard/RightSidebar";
import Chatbot from "@/components/chatbot";

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

  const userRole = userData?.role || "user";
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

        <div className="p-6 border-t border-slate-50">
          <button 
            onClick={() => signOut({ callbackUrl: '/' })}
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
        </header>

        <div className="flex-1 flex overflow-hidden">
          <main className="flex-1 overflow-y-auto px-6 lg:px-12 pb-10">
            <div className="max-w-6xl">
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

      {/* Floating Chatbot */}
      <div className="fixed bottom-6 right-6 z-[999]">
        <Chatbot />
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