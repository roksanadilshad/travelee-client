"use client";
import { useState } from "react";
import { useSession } from "next-auth/react";
import useAxiosSecure from "@/hooks/useAxiosSecure";

export default function InviteFriend({
  tripId,
  tripTitle,
  socket,
  onAutoSave,
}) {
  const { data: session, status } = useSession();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const axiosSecure = useAxiosSecure();

  const handleInvite = async () => {
    
    if (status === "loading") return alert("Authentication is loading...");
    if (!session) return alert("You must be logged in to invite friends.");
    if (!email) return alert("Please enter an email address.");
    if (email === session.user?.email)
      return alert("You cannot invite yourself!");

    setLoading(true);

    try {
     
      let currentTripId = tripId;

      if (!currentTripId || currentTripId === "temp-id") {
        if (onAutoSave) {
          currentTripId = await onAutoSave();
        }
      }

      if (!currentTripId) {
        setLoading(false);
        return alert("Still loading trip data. Please try again in a moment.");
      }

     
      const res = await axiosSecure.post(`/my-trips/invite`, {
        tripId: currentTripId,
        friendEmail: email,
      });

      if (res.data.success) {
        if (socket) {
          socket.emit("send-invite", {
            friendId: res.data.friendId,
            senderName: session.user?.name || session.user?.email,
            tripId: currentTripId,
            tripTitle: tripTitle,
          });
        }
        alert(`Invitation sent successfully to ${email}!`);
        setEmail("");
      }
    } catch (err) {
      console.error("Invite Error:", err);
      
      if (err.response?.status === 401) {
        alert(
          "Session expired or unauthorized. Please log out and log in again.",
        );
      } else {
        alert(
          err.response?.data?.message || err.message || "Something went wrong.",
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-2 p-3 bg-blue-50 rounded-xl border border-blue-100 shadow-sm">
      <p className="text-[10px] font-bold text-blue-600 uppercase tracking-wider">
        Invite Collaborator
      </p>
      <div className="flex gap-2">
        <input
          type="email"
          className="flex-1 border p-2 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-400 text-black shadow-inner"
          placeholder="friend@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button
          onClick={handleInvite}
          disabled={loading || status === "loading"}
          className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded-lg transition-all active:scale-95 disabled:bg-blue-300 font-bold shadow-md"
        >
          {loading ? "Sending..." : "Invite"}
        </button>
      </div>
    </div>
  );
}
