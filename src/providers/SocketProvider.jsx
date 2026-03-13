"use client";
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useRef,
} from "react";
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
     
      currentSocket.emit("join-self", session.user.email); 

      const handleReceiveInvite = (data) => {
        Swal.fire({
          title: "New Trip Invitation! ✈️",
          html: `
            <div style="font-size: 16px; line-height: 1.6; color: #374151;">
              <b style="color: #0EA5A4; font-size: 18px; text-transform: uppercase;">${data.senderName}</b> 
              <br/> 
              has invited you to join 
              <br/>
              <b style="color: #1f2937; font-size: 19px;">"${data.tripTitle}"</b>
            </div>
          `,
          icon: "info",
          showCancelButton: true,
          confirmButtonColor: "#0EA5A4",
          cancelButtonColor: "#64748b",
          confirmButtonText: "Accept & View",
          cancelButtonText: "Decline",
          reverseButtons: true,
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