"use client";

import React, { useState } from "react";
import { 
  Search, 
  Send, 
  MoreVertical, 
  Phone, 
  Video, 
  Image as ImageIcon, 
  Paperclip,
  Smile,
  CheckCheck
} from "lucide-react";

const MessagesPage = () => {
  const [activeChat, setActiveChat] = useState(1);

  const contacts = [
    { id: 1, name: "Sarah Jenkins", msg: "The hotel booking is confirmed!", time: "12:45 PM", online: true, unread: 2, avatar: "https://i.pravatar.cc/150?u=sarah" },
    { id: 2, name: "Travel Guide Alex", msg: "I'll meet you at the airport.", time: "10:30 AM", online: true, unread: 0, avatar: "https://i.pravatar.cc/150?u=alex" },
    { id: 3, name: "Support Team", msg: "How was your flight to Paris?", time: "Yesterday", online: false, unread: 0, avatar: "https://i.pravatar.cc/150?u=support" },
  ];

  const messages = [
    { id: 1, sender: "them", text: "Hello! I've sent over the itinerary for your Lisbon trip next week.", time: "12:40 PM" },
    { id: 2, sender: "me", text: "Awesome, thanks Sarah! Does it include the dinner reservation at Belcanto?", time: "12:42 PM" },
    { id: 3, sender: "them", text: "Yes, it's all set for 8:00 PM on Friday. The hotel booking is confirmed too!", time: "12:45 PM" },
  ];

  return (
    <div className="h-[calc(100vh-180px)] flex gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* 1. Sidebar: Contact List */}
      <div className="w-full md:w-80 lg:w-96 flex flex-col bg-white rounded-[2.5rem] shadow-sm border border-slate-50 overflow-hidden">
        <div className="p-6">
          <h2 className="text-xl font-black text-slate-900 mb-4">Messages</h2>
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
            <input 
              type="text" 
              placeholder="Search chats..." 
              className="w-full bg-slate-50 border-none rounded-2xl py-3 pl-12 text-sm focus:ring-2 ring-emerald-500/20 outline-none"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-3 space-y-1 custom-scrollbar">
          {contacts.map((contact) => (
            <button 
              key={contact.id}
              onClick={() => setActiveChat(contact.id)}
              className={`w-full flex items-center gap-4 p-4 rounded-[2rem] transition-all ${
                activeChat === contact.id ? "bg-[#0A1D1A] text-white shadow-lg" : "hover:bg-slate-50 text-slate-600"
              }`}
            >
              <div className="relative">
                <img src={contact.avatar} className="w-12 h-12 rounded-2xl object-cover" alt="" />
                {contact.online && (
                  <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-4 border-white rounded-full" />
                )}
              </div>
              <div className="flex-1 text-left min-w-0">
                <div className="flex justify-between items-center mb-1">
                  <h4 className="font-bold text-sm truncate">{contact.name}</h4>
                  <span className={`text-[10px] ${activeChat === contact.id ? "text-slate-400" : "text-slate-300"}`}>{contact.time}</span>
                </div>
                <p className={`text-xs truncate ${activeChat === contact.id ? "text-slate-400" : "text-slate-400"}`}>
                  {contact.msg}
                </p>
              </div>
              {contact.unread > 0 && activeChat !== contact.id && (
                <span className="bg-emerald-500 text-white text-[10px] font-black h-5 w-5 rounded-full flex items-center justify-center">
                  {contact.unread}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* 2. Main Chat Window */}
      <div className="hidden md:flex flex-1 flex-col bg-white rounded-[2.5rem] shadow-sm border border-slate-50 overflow-hidden">
        
        {/* Chat Header */}
        <div className="px-8 py-5 border-b border-slate-50 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img src={contacts.find(c => c.id === activeChat)?.avatar} className="w-10 h-10 rounded-xl object-cover" alt="" />
            <div>
              <h3 className="font-bold text-slate-900 leading-none mb-1">
                {contacts.find(c => c.id === activeChat)?.name}
              </h3>
              <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">Active Now</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <ChatActionIcon icon={<Phone size={18} />} />
            <ChatActionIcon icon={<Video size={18} />} />
            <ChatActionIcon icon={<MoreVertical size={18} />} />
          </div>
        </div>

        {/* Messages Feed */}
        <div className="flex-1 overflow-y-auto p-8 space-y-6 bg-[#FDFDFF] custom-scrollbar">
          {messages.map((m) => (
            <div key={m.id} className={`flex ${m.sender === "me" ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[70%] group ${m.sender === "me" ? "items-end" : "items-start"} flex flex-col`}>
                <div className={`p-4 rounded-3xl text-sm font-medium leading-relaxed shadow-sm ${
                  m.sender === "me" 
                    ? "bg-[#0A1D1A] text-white rounded-tr-none" 
                    : "bg-white text-slate-700 border border-slate-50 rounded-tl-none"
                }`}>
                  {m.text}
                </div>
                <div className="flex items-center gap-2 mt-2 px-1">
                  <span className="text-[10px] font-bold text-slate-300 uppercase">{m.time}</span>
                  {m.sender === "me" && <CheckCheck size={14} className="text-emerald-500" />}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Chat Input */}
        <div className="p-6 bg-white border-t border-slate-50">
          <div className="flex items-center gap-4 bg-slate-50 rounded-[2rem] p-2 pl-6">
            <button className="text-slate-300 hover:text-slate-600 transition-colors"><Smile size={20} /></button>
            <input 
              type="text" 
              placeholder="Type your message..." 
              className="flex-1 bg-transparent border-none text-sm focus:ring-0 outline-none text-slate-600 py-3"
            />
            <div className="flex items-center gap-2 pr-2">
              <button className="p-2 text-slate-300 hover:text-slate-600 transition-colors"><Paperclip size={20} /></button>
              <button className="p-3 bg-[#0A1D1A] text-white rounded-2xl shadow-lg shadow-emerald-900/20 hover:scale-105 transition-transform">
                <Send size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ChatActionIcon = ({ icon }) => (
  <button className="p-3 text-slate-400 hover:bg-slate-50 hover:text-slate-900 rounded-2xl transition-all">
    {icon}
  </button>
);

export default MessagesPage;