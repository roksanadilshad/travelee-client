"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Bell, Search, LayoutDashboard, CalendarDays, Heart, 
  MessageSquare, UserCircle, Users, Settings, LogOut, 
  Menu, X, PlaneTakeoff, Map 
} from "lucide-react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLanguage } from "@/context/LanguageContext";
import TraveleeLogo from "@/components/Share/Logo";

export default function DashboardLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const pathname = usePathname();
  
  const { t, lang } = useLanguage();
  
  // Role Logic
  const userRole = "user"; 

  const menuConfig = {
    admin: [
      { 
        group: lang === 'EN' ? "Administration" : "প্রশাসন", 
        items: [
          { name: t("nav.home"), href: "/dashboard/admin", icon: LayoutDashboard },
          { name: t("tour.itinerary"), href: "/dashboard/admin/bookings", icon: CalendarDays },
          { name: t("footer.col1_title"), href: "/dashboard/admin/users", icon: Users },
        ]
      }
    ],
    user: [
      { 
        group: t("nav.trips"), 
        items: [
          // "My Plans"
          { name: t("nav.home"), href: "/", icon: Map }, 
          // "My Trips"
          { name: t("nav.trips"), href: "/dashboard/my-trips", icon: PlaneTakeoff },
          // "My Wishlist"
          { name: t("tour.save_wishlist"), href: "/dashboard/wishlist", icon: Heart },
        ]
      },
      { 
        group: t("tour.detail_label"), 
        items: [
          // "My Reviews"
          { name: t("tour.reviews"), href: "/dashboard/reviews", icon: MessageSquare },
          // "My Profile"
          { name: t("tour.detail_label"), href: "/dashboard/my-profile", icon: UserCircle },
        ]
      }
    ]
  };

  const currentNav = menuConfig[userRole] || menuConfig.user;

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex font-sans">
      {/* Sidebar Overlay (Mobile) */}
      <div 
        className={`fixed inset-0 bg-slate-900/40 z-40 lg:hidden transition-opacity duration-300 ${isSidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`} 
        onClick={() => setIsSidebarOpen(false)}
      />

      {/* Modern Professional Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-slate-200 
        transform transition-transform duration-300 ease-in-out flex flex-col
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
        lg:relative lg:translate-x-0
      `}>
        {/* Branding */}
        <div className="h-20 flex items-center px-6 border-b border-slate-50">
          {/* <Link href="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-100">
              <PlaneTakeoff className="text-white w-5 h-5" />
            </div>
            <span className="text-xl font-black text-slate-800 tracking-tighter">TRAVELEE</span>
          </Link> */}
          <Link href="/">
          <TraveleeLogo/>
          </Link>
        </div>

        {/* Navigation Groups */}
        <nav className="flex-1 overflow-y-auto p-4 pt-6 space-y-7">
          {currentNav.map((section, idx) => (
            <div key={idx}>
              <h3 className="px-3 text-[10px] font-bold text-slate-400 uppercase tracking-[0.15em] mb-3">
                {section.group}
              </h3>
              <div className="space-y-1">
                {section.items.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`flex items-center gap-3.5 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all group ${
                        isActive 
                          ? "bg-blue-600 text-white shadow-md shadow-blue-100" 
                          : "text-slate-500 hover:bg-slate-50 hover:text-blue-600"
                      }`}
                    >
                      <item.icon size={19} className={isActive ? "text-white" : "text-slate-400 group-hover:text-blue-600"} />
                      {item.name}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* User Footer */}
        <div className="p-4 border-t border-slate-50 bg-slate-50/50">
          <button className="flex w-full items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-bold text-red-500 hover:bg-red-50 transition-all">
            <LogOut size={19} />
            {lang === 'EN' ? "Sign Out" : "লগ আউট"}
          </button>
        </div>
      </aside>

      {/* Main Container */}
      <div className="flex-1 flex flex-col min-w-0 h-screen">
        {/* Transparent Header */}
        <header className="h-20 bg-white/70 backdrop-blur-md border-b border-slate-200 flex items-center justify-between px-6 lg:px-10 shrink-0 sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)} 
              className="p-2 lg:hidden hover:bg-slate-100 rounded-lg"
            >
              <Menu size={22} className="text-slate-600" />
            </button>
            <div className="hidden md:block">
               <h1 className="text-sm font-bold text-slate-800 uppercase tracking-tight">
                 {pathname.split('/').pop()?.replace(/-/g, ' ') || "Overview"}
               </h1>
            </div>
          </div>

          <div className="flex items-center gap-4 md:gap-6">
            <div className="hidden md:flex items-center bg-slate-100 rounded-full px-4 py-2 w-64 border border-transparent focus-within:border-blue-200 focus-within:bg-white transition-all">
               <Search size={16} className="text-slate-400 mr-2" />
               <input 
                type="text" 
                placeholder={t("searchplaceholder")} 
                className="bg-transparent border-none text-xs w-full focus:ring-0 outline-none text-slate-600"
               />
            </div>

            <div className="flex items-center gap-3">
              <button className="relative p-2 text-slate-500 hover:bg-slate-100 rounded-full">
                <Bell size={20} />
                <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
              </button>
              <div className="h-9 w-9 rounded-full bg-blue-100 border-2 border-white shadow-sm overflow-hidden">
                <img src={`https://ui-avatars.com/api/?name=${userRole}&background=0D8ABC&color=fff`} alt="user" />
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto p-6 lg:p-10">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>

      <ToastContainer position="bottom-right" />
    </div>
  );
}