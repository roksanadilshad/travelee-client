"use client";

import React from 'react';
import { MdOutlineEmail, MdLocationPin } from "react-icons/md";
import { FaPhone, FaLinkedin, FaTwitter, FaInstagram } from "react-icons/fa6";
import { ArrowRight, Globe, Headphones, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from '@/hooks/useAuth';

const ContactPage = () => {
    const {user} = useAuth()
  return (
    <div className="w-full bg-white text-slate-900">
      {/* 1. HERO SECTION */}
      <section className="w-full py-20 bg-slate-50 border-b">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-black mb-4">Connect With Us</h1>
          <p className="text-slate-600 max-w-2xl mx-auto">We're here to help you navigate your journey.</p>
        </div>
      </section>

      {/* 2. MAIN CONTACT BOX - Forced Layout */}
      <section className="w-full py-16 px-4">
        <div className="max-w-6xl mx-auto bg-white border rounded-[2rem] shadow-2xl overflow-hidden flex flex-col md:flex-row min-h-[600px]">
          
          {/* LEFT SIDE: Info (40% width) */}
          <div className="w-full md:w-2/5 bg-[#0f172a] p-10 text-white flex flex-col justify-between">
            <div className="space-y-8">
              <h3 className="text-2xl font-bold">Information</h3>
              <div className="space-y-6">
                <div className="flex gap-4 items-start">
                  <MdOutlineEmail className="text-accent text-2xl" />
                  <div><p className="font-bold">Email</p><p className="text-slate-400">support@travelee.com</p></div>
                </div>
                <div className="flex gap-4 items-start">
                  <FaPhone className="text-accent text-xl" />
                  <div><p className="font-bold">Phone</p><p className="text-slate-400">+880 1234 567 890</p></div>
                </div>
                <div className="flex gap-4 items-start">
                  <MdLocationPin className="text-accent text-2xl" />
                  <div><p className="font-bold">Location</p><p className="text-slate-400">Dhaka, Bangladesh</p></div>
                </div>
              </div>
            </div>
            <div className="flex gap-4 pt-10 border-t border-slate-800">
              <FaLinkedin className="text-xl hover:text-accent cursor-pointer" />
              <FaTwitter className="text-xl hover:text-accent cursor-pointer" />
            </div>
          </div>

          {/* RIGHT SIDE: Form (60% width) - Fixed with min-w-0 */}
          <div className="w-full md:w-3/5 p-10 bg-white min-w-0">
            <h3 className="text-2xl font-bold mb-8 text-slate-800">Send a Message</h3>
            <form className="w-full space-y-6 flex flex-col">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold uppercase text-slate-500">Name</label>
                  <input type="text" value={user?.name} className="w-full p-4 bg-slate-50 border rounded-xl outline-none focus:border-accent" />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold uppercase text-slate-500">Email</label>
                  <input type="email" value={user?.email} className="w-full p-4 bg-slate-50 border rounded-xl outline-none focus:border-accent" />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold uppercase text-slate-500">Message</label>
                <textarea rows="5" className="w-full p-4 bg-slate-50 border rounded-xl outline-none focus:border-accent" placeholder="Your message..."></textarea>
              </div>
              <Button className="w-full h-14 bg-primary hover:bg-green-600 text-white font-bold rounded-xl text-lg">
                Send Message
              </Button>
            </form>
          </div>
        </div>
      </section>

      {/* 3. MAP SECTION */}
      <section className="w-full py-20 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Global Map</h2>
          <div className="w-full aspect-video bg-slate-200 rounded-[2rem] relative overflow-hidden flex items-center justify-center">
             <img src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&q=80&w=1000" className="absolute inset-0 w-full h-full object-cover opacity-50" alt="Map"/>
             <div className="relative z-10 bg-white/80 backdrop-blur px-6 py-3 rounded-full font-bold shadow-xl flex items-center gap-3">
                <Globe className="text-accent animate-spin-slow" /> Global Operations Active
             </div>
          </div>
        </div>
      </section>

      {/* 4. SUPPORT TIERS */}
      <section className="w-full py-20">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-8">
           <div className="p-10 border rounded-[2rem] bg-orange-50 flex items-start gap-6">
              <Headphones size={40} className="text-accent shrink-0" />
              <div><h4 className="font-bold text-xl mb-2">Live Support</h4><p className="text-slate-600">Average response time: 2 minutes.</p></div>
           </div>
           <div className="p-10 border rounded-[2rem] bg-blue-50 flex items-start gap-6">
              <Users size={40} className="text-blue-500 shrink-0" />
              <div><h4 className="font-bold text-xl mb-2">Partnerships</h4><p className="text-slate-600">Join our network of 45+ countries.</p></div>
           </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;