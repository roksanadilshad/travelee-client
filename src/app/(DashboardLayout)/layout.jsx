"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { 
  Bell, Search, CalendarDays, Heart, 
  MessageSquare, Settings, LogOut, X, 
  Menu, PlaneTakeoff, Map, HelpCircle, Briefcase, Utensils, Hotel, Compass, MoreHorizontal, Play, ChevronRight, ChevronLeft,
  User
} from "lucide-react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLanguage } from "@/context/LanguageContext";
import TraveleeLogo from "@/components/Share/Logo";
import { useSession } from "next-auth/react";
import RightSidebar from "@/components/dashboard/RightSidebar";

export default function DashboardLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Default closed for mobile
  const pathname = usePathname();
  const { t } = useLanguage();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get("q") || "");
  const { data: session } = useSession();
  
  // Ref for the category slider
  const scrollRef = useRef(null);

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

  return (
    <div className="min-h-screen bg-[#F4F7FE] flex font-sans overflow-hidden">
      <ToastContainer position="bottom-right" />

      {/* Mobile Sidebar Trigger */}
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
          {menuConfig.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-4 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                  isActive ? "bg-[#0A1D1A] text-white shadow-lg shadow-emerald-900/20" : "text-slate-400 hover:text-slate-900"
                }`}
              >
                <item.icon size={20} />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="p-6 space-y-1 border-t border-slate-50">
          <NavItem icon={<Settings size={20}/>} label="Settings" href="/dashboard/settings" />
          <NavItem icon={<HelpCircle size={20}/>} label="Help" href="/help-center" />
          <button className="flex w-full items-center gap-4 px-4 py-3 text-sm font-semibold text-slate-400 hover:text-red-500 transition-all">
            <LogOut size={20} /> Logout
          </button>
        </div>
      </aside>

      {/* Main Container */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Header */}
        <header className="h-24 flex items-center justify-between px-8 lg:px-12 shrink-0 bg-[#F4F7FE]/80 backdrop-blur-sm sticky top-0 z-30">
          <div className="ml-14 lg:ml-0">
            <h1 className="text-2xl lg:text-3xl font-bold text-slate-900 tracking-tight">
              Hello, {session?.user?.name?.split(' ')[0] || "Madison"}
            </h1>
            <p className="text-xs lg:text-sm text-slate-400 font-medium">Welcome Back!</p>
          </div>

          <div className="flex items-center gap-3 lg:gap-4">
            <div className="hidden sm:flex items-center bg-white rounded-2xl px-4 py-2.5 w-48 md:w-72 shadow-sm border border-white">
              <Search size={18} className="text-slate-300 mr-2" />
              <input 
                type="text" placeholder="Search" 
                className="bg-transparent border-none text-sm w-full outline-none text-slate-600 placeholder:text-slate-300"
                value={searchTerm} onChange={handleSearch}
              />
            </div>
            <button className="p-3 bg-white text-slate-400 rounded-2xl shadow-sm hover:text-slate-600 transition-all border border-white">
              <Bell size={20} />
            </button>
            <div className="h-10 w-10 lg:h-12 lg:w-12 rounded-2xl overflow-hidden shadow-sm border-2 border-white">
               <img src={session?.user?.image || "https://i.pravatar.cc/150?u=madison"} alt="user" className="w-full h-full object-cover" />
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 flex overflow-hidden relative">
          <main className="flex-1 overflow-y-auto px-6 lg:px-12 pb-10 scroll-smooth">
            
            {/* Horizontal Scrollable Categories */}
            <div className="relative group mb-8">
              <div 
                ref={scrollRef}
                className="flex items-center gap-3 overflow-x-auto no-scrollbar snap-x touch-pan-x"
              >
                <CategoryTab icon={<Hotel size={18}/>} label="Hotels" />
                <CategoryTab icon={<Utensils size={18}/>} label="Food" />
                <CategoryTab icon={<PlaneTakeoff size={18}/>} label="Flights" />
                <CategoryTab icon={<Map size={18}/>} label="Trips" />
                <CategoryTab icon={<Compass size={18}/>} label="Adventure" />
                <CategoryTab icon={<CalendarDays size={18}/>} label="Events" />
                <button className="flex-shrink-0 p-3 bg-white rounded-2xl shadow-sm text-slate-400 border border-white">
                  <MoreHorizontal size={20}/>
                </button>
              </div>
              
              {/* Slider Arrows (visible only on hover on desktop) */}
              <button 
                onClick={() => scroll('left')}
                className="absolute -left-4 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity hidden lg:block border border-slate-100"
              >
                <ChevronLeft size={16}/>
              </button>
              <button 
                onClick={() => scroll('right')}
                className="absolute -right-4 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity hidden lg:block border border-slate-100"
              >
                <ChevronRight size={16}/>
              </button>
            </div>

            <div className="max-w-5xl">
              {children}
              
              {/* Promo Banner */}
              <div className="mt-10 relative h-40 lg:h-52 rounded-[2rem] overflow-hidden group shadow-xl">
                 <img src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="banner" />
                 <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent flex flex-col justify-center px-8 lg:px-12 text-white">
                    <p className="text-[10px] lg:text-xs font-bold opacity-80 mb-1 uppercase tracking-widest">Wherever You Go,</p>
                    <h2 className="text-2xl lg:text-4xl font-black mb-3 leading-tight">Let Us Make it <br className="hidden sm:block"/> Happen.</h2>
                    <button className="w-fit bg-white text-black px-6 py-2 rounded-xl text-xs font-black hover:bg-emerald-400 transition-colors">Start Planning</button>
                 </div>
              </div>
            </div>
          </main>

          {/* Right Sidebar - Hidden on Tablets/Mobile */}
          <aside className="hidden 2xl:flex flex-col w-[400px] bg-white m-6 mt-0 rounded-[2.5rem] shadow-sm border border-slate-50 p-8 overflow-y-auto">
             
          <RightSidebar/>
          </aside>
        </div>
      </div>
    </div>
  );
}

/* UI Helper Components */
const NavItem = ({ icon, label, href }) => (
  <Link href={href} className="flex items-center gap-4 px-4 py-3 text-sm font-semibold text-slate-400 hover:text-slate-900 transition-all">
    {icon} {label}
  </Link>
);

const CategoryTab = ({ icon, label }) => (
  <button className="flex-shrink-0 flex items-center gap-2.5 px-6 py-3 bg-white rounded-2xl text-sm font-bold text-slate-600 shadow-sm border border-white hover:border-slate-100 transition-all snap-start">
    <span className="text-slate-300">{icon}</span>
    {label}
  </button>
);

const PastTripItem = ({ name, date, img }) => (
  <div className="flex items-center gap-4 p-3 rounded-2xl hover:bg-slate-50 transition-all cursor-pointer border border-transparent hover:border-slate-100">
     <img src={img} className="w-12 h-12 rounded-xl object-cover" alt={name} />
     <div className="flex-1">
        <h4 className="text-sm font-black text-slate-900">{name}</h4>
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{date}</p>
     </div>
     <ChevronRight size={14} className="text-slate-300" />
  </div>
);