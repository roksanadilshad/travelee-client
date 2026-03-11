"use client";
import React, { useEffect, useState } from "react";
import { useSocket } from "@/providers/SocketProvider";
import { useSession } from "next-auth/react";
import Image from "next/image";

const ActiveCollaborators = ({ tripId }) => {
  const socket = useSocket();
  const { data: session } = useSession();
  const [activeUsers, setActiveUsers] = useState([]);

  useEffect(() => {
    if (!socket || !tripId || !session?.user) return;

    
    socket.emit("join-trip", {
      tripId: tripId,
      user: {
        name: session.user.name,
        email: session.user.email,
        image: session.user.image,
      },
    });

    
    socket.on("user-presence", (users) => {
      setActiveUsers(users);
    });

    return () => {
      socket.off("user-presence");
    };
  }, [socket, tripId, session]);

  return (
    <div className="flex items-center gap-2 p-2 bg-white rounded-full shadow-sm border border-gray-100 w-fit">
      <div className="flex -space-x-3 overflow-hidden">
        {activeUsers.map((user, index) => (
          <div key={user.email + index} className="relative group">
            <Image
              className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover"
              src={user.image || "https://i.ibb.co/v3m8XnF/user-placeholder.png"}
              alt={user.name}
              title={user.name}
            />
            
            <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 hidden group-hover:block bg-black text-white text-[10px] px-2 py-1 rounded whitespace-nowrap">
              {user.name} {user.email === session?.user?.email && "(You)"}
            </span>
          </div>
        ))}
      </div>
      
      {activeUsers.length > 0 && (
        <span className="text-xs font-medium text-green-600 px-2 flex items-center gap-1">
          <span className="h-1.5 w-1.5 bg-green-500 rounded-full animate-pulse"></span>
          {activeUsers.length} Online
        </span>
      )}
    </div>
  );
};

export default ActiveCollaborators;