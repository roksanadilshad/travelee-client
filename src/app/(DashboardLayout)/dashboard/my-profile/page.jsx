"use client";

import React from "react";
import { useSession } from "next-auth/react";
import { 
  Mail, MapPin, Phone, Calendar, Edit3, 
  ShieldCheck, Camera, Globe, Github, Twitter
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

const MyProfile = () => {
  // const { data: session } = useSession();
  const { session, token } = useAuth();
  const user = session?.user;

  console.log("Frontend Token: ", token);
  

  // Professional Skeleton/Loading State
import { useLanguage } from "@/context/LanguageContext";

const MyProfile = () => {
  const { data: session } = useSession();
  const { t } = useLanguage();
  const user = session?.user;

  if (!session) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="h-48 bg-white rounded-[2.5rem] w-full" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="h-32 bg-white rounded-3xl" />
          <div className="h-32 bg-white rounded-3xl" />
          <div className="h-32 bg-white rounded-3xl" />
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto pb-20">
      {/* 1. Hero Profile Header */}
      <div className="relative mb-12">
        {/* Banner */}
        <div className="h-48 lg:h-64 rounded-[2.5rem] bg-gradient-to-r from-[#0A1D1A] to-[#1a3d38] overflow-hidden relative shadow-xl">
           <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
        </div>

        {/* Profile Info Overlay */}
        <div className="px-8 lg:px-12 -mt-16 flex flex-col md:flex-row items-end gap-6 relative z-10">
          <div className="relative group">
            <div className="w-32 h-32 lg:w-40 lg:h-40 rounded-[2.5rem] border-[6px] border-[#F4F7FE] bg-white shadow-2xl overflow-hidden">
               <img 
                 src={user?.image || `https://ui-avatars.com/api/?name=${user?.name}&background=0A1D1A&color=fff`} 
                 alt="profile" 
                 className="w-full h-full object-cover" 
               />
            </div>
            <button className="absolute bottom-2 right-2 p-2.5 bg-white text-slate-900 rounded-2xl shadow-xl hover:scale-110 transition-transform border border-slate-100">
               <Camera size={18} />
            </button>
          </div>

          <div className="flex-1 pb-2">
            <div className="flex items-center gap-3">
              <h1 className="text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">
                {user?.name}
              </h1>
              <span className="flex items-center gap-1 bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
                <ShieldCheck size={12} /> {user?.role || "Explorer"}
              </span>
            </div>
            <p className="text-slate-400 font-medium mt-1 flex items-center gap-2">
              <Globe size={14} /> Based in Bangladesh • Travel Enthusiast
            </p>
          </div>

          <div className="pb-2">
            <button className="bg-[#0A1D1A] text-white px-8 py-3.5 rounded-2xl font-bold shadow-lg shadow-emerald-900/20 hover:scale-[1.02] transition-all flex items-center gap-2">
               <Edit3 size={18} /> Edit Profile
            </button>
          </div>
        </div>
      </div>

      {/* 2. Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Stats & Socials */}
        <div className="space-y-8">
          <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-50">
             <h3 className="font-black text-slate-900 mb-6 uppercase text-xs tracking-[0.2em]">Profile Strength</h3>
             <div className="w-full bg-slate-100 h-2 rounded-full mb-4">
                <div className="bg-emerald-500 w-[85%] h-full rounded-full shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
             </div>
             <p className="text-xs font-bold text-slate-400 leading-relaxed">
               Your profile is almost complete! Add a phone number to reach 100%.
             </p>
          </div>

          <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-50">
             <h3 className="font-black text-slate-900 mb-6 uppercase text-xs tracking-[0.2em]">Social Links</h3>
             <div className="space-y-4">
                <SocialLink icon={<Twitter size={18}/>} label="Twitter" handle="@madison_travels" />
                <SocialLink icon={<Github size={18}/>} label="Github" handle="madison_dev" />
             </div>
          </div>
        </div>

        {/* Right Column: Detailed Info */}
        <div className="lg:col-span-2 space-y-8">
           <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-50">
              <h3 className="font-black text-slate-900 mb-8 uppercase text-xs tracking-[0.2em]">Personal Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-12">
                 <InfoBlock icon={<Mail />} label="Email Address" value={user?.email} />
                 <InfoBlock icon={<Phone />} label="Phone Number" value={user?.phone || "+880 1XXX-XXXXXX"} />
                 <InfoBlock icon={<MapPin />} label="Location" value="Dhaka, Bangladesh" />
                 <InfoBlock icon={<Calendar />} label="Joined Date" value="March 2026" />
              </div>
           </div>

           <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-50 relative overflow-hidden">
              <div className="relative z-10">
                <h3 className="font-black text-slate-900 mb-4 uppercase text-xs tracking-[0.2em]">Bio</h3>
                <p className="text-slate-500 font-medium leading-loose">
                  Passionate traveler and photographer exploring the hidden gems of the world. 
                  Focused on sustainable travel and documenting cultural heritage. 
                  Always looking for the next mountain to climb or ocean to explore.
                </p>
              </div>
              <div className="absolute top-0 right-0 p-4 opacity-5">
                 <Compass size={120} />
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

/* Helper Components */
const InfoBlock = ({ icon, label, value }) => (
  <div className="flex gap-4">
    <div className="w-12 h-12 bg-[#F4F7FE] rounded-2xl flex items-center justify-center text-slate-400 group-hover:text-[#0A1D1A] transition-colors">
       {React.cloneElement(icon, { size: 20 })}
    </div>
    <div>
       <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-1">{label}</p>
       <p className="text-slate-700 font-bold">{value || "Not Set"}</p>
    </div>
  </div>
);

const SocialLink = ({ icon, label, handle }) => (
  <div className="flex items-center justify-between p-4 rounded-2xl border border-slate-50 hover:bg-slate-50 transition-all cursor-pointer group">
    <div className="flex items-center gap-3">
      <span className="text-slate-400 group-hover:text-emerald-500 transition-colors">{icon}</span>
      <div className="flex flex-col">
        <span className="text-[10px] font-black text-slate-300 uppercase">{label}</span>
        <span className="text-sm font-bold text-slate-700">{handle}</span>
      </div>
    </div>
    <Edit3 size={14} className="text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity" />
  </div>
);

const Compass = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></svg>
);

export default MyProfile;