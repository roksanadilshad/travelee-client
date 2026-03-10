"use client";
import React, { createContext, useContext, useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation"; 
import Swal from "sweetalert2";

const SocketContext = createContext(null);
export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }) => {
  const [socket, setSocketState] = useState(null);
  const socketRef = useRef(null);
  const { data: session } = useSession();
  const router = useRouter(); 

  useEffect(() => {
    if (!socketRef.current) {
      const SOCKET_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
      const newSocket = io(SOCKET_URL, {
        transports: ["websocket"],
        withCredentials: true,
      });

      socketRef.current = newSocket;

      newSocket.on("connect", () => {
        console.log("Connected to Socket Server:", newSocket.id);
        setSocketState(newSocket);
      });
    }

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    const currentSocket = socketRef.current;

    if (currentSocket && session?.user?.email) {
      currentSocket.emit("join-personal-room", session.user.email);

      const handleReceiveInvite = (data) => {
        Swal.fire({
          title: "New Trip Invitation!",
          text: `${data.senderName} invited you to join "${data.tripTitle}"`,
          icon: "info",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Go to Dashboard",
        }).then((result) => {
          if (result.isConfirmed) {
          
            router.push("/dashboard/my-trips");
          }
        });
      };

      currentSocket.on("receive-invite", handleReceiveInvite);

      return () => {
        currentSocket.off("receive-invite", handleReceiveInvite);
      };
    }
  }, [socket, session, router]);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};