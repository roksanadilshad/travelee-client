
"use client";
import React from 'react';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const PresenceBar = ({ activeUsers }) => {
  return (
    <div className="flex items-center gap-3 p-2 bg-white/80 backdrop-blur-md rounded-full border shadow-sm">
      <div className="flex -space-x-3 overflow-hidden">
        {activeUsers.map((user, index) => (
          <div key={index} className="relative group">
            <Avatar className="border-2 border-white w-9 h-9 transition-transform hover:scale-110 shadow-sm">
              <AvatarImage src={user.photoURL} alt={user.displayName} />
              <AvatarFallback className="bg-blue-500 text-white text-xs">
                {user.displayName?.charAt(0)}
              </AvatarFallback>
            </Avatar>
            
            <span className="absolute -top-9 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50">
              {user.displayName}
            </span>
          </div>
        ))}
      </div>
      {activeUsers.length > 0 && (
        <div className="flex items-center gap-1.5 pr-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </span>
          <span className="text-[11px] font-semibold text-gray-600 uppercase tracking-tighter">
            {activeUsers.length} Online
          </span>
        </div>
      )}
    </div>
  );
};

export default PresenceBar;