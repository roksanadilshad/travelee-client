"use client";
import { useState } from "react";
import { useParams } from "next/navigation";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useAuth } from "@/hooks/useAuth";

export default function InviteFriend({
  tripId,
  tripTitle,
  socket,
  onAutoSave,
  currentUser,
}) {
  const params = useParams();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const axiosSecure = useAxiosSecure();
  const { token } = useAuth();

  const senderDisplayName =
    currentUser?.name || currentUser?.email?.split("@")[0] || "A friend";

  const handleInvite = async () => {
    if (!email) {
      return Swal.fire({
        icon: "warning",
        title: "Missing Email",
        text: "Please enter a valid email address.",
        confirmButtonColor: "#0EA5A4", 
      });
    }

    setLoading(true);
    try {
      
      let currentId = tripId || params?.id;
      
      
      if (!currentId || currentId === "temp-id" || typeof currentId === 'undefined') {
        if (onAutoSave) {
            const savedId = await onAutoSave();
            currentId = savedId;
        }
      }

      if (!currentId) {
        setLoading(false);
        return Swal.fire({
          icon: "error",
          title: "Save Required",
          text: "Please save the trip before inviting!",
          confirmButtonColor: "#0EA5A4", 
        });
      }

      const res = await axiosSecure.post("/my-trips/invite-hybrid", {
        tripId: currentId,
        friendEmail: email,
        senderName: senderDisplayName,
        tripTitle: tripTitle || "Our Trip",
        friendId: email, 
      });

      if (res.data.success) {
        if (socket) {
          socket.emit("send-invite", {
            friendId: email,
            senderName: senderDisplayName,
            tripId: currentId,
            tripTitle: tripTitle || "this trip",
          });
        }

        Swal.fire({
          title: "Invited!",
          html: `Invitation sent via <b>Email</b> and <b>Real-time</b> to <br/> <span style="color: #0EA5A4; font-weight: bold;">${email}</span>`,
          icon: "success",
          confirmButtonColor: "#0EA5A4",
          confirmButtonText: "Done!",
          showClass: {
            popup: "animate__animated animate__fadeInUp animate__faster",
          },
        });

        setEmail("");
      }
    } catch (err) {
      console.error("Invite Error Detail:", err);
      const errorMsg = err.response?.data?.message || err.message || "Something went wrong!";

      Swal.fire({
        icon: "error",
        title: "Invitation Failed",
        text: errorMsg,
        confirmButtonColor: "#ef4444",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-2 p-3 bg-[#0EA5A4]/10 rounded-xl border border-[#0EA5A4]/20 shadow-sm w-full">
      <p className="text-[10px] font-bold text-[#0EA5A4] uppercase tracking-wider">
        Invite Collaborator 
      </p>
      <div className="flex gap-2">
        <input
          type="email"
          className="flex-1 border border-[#0EA5A4]/30 p-2 rounded-lg text-sm text-black outline-none focus:ring-2 focus:ring-[#0EA5A4] transition-all"
          placeholder="friend@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button
          onClick={handleInvite}
          disabled={loading}
          className="bg-[#0EA5A4] text-white text-sm px-5 py-2 rounded-lg disabled:bg-gray-300 font-bold transition-all shrink-0"
        >
          {loading ? "..." : "Invite"}
        </button>
      </div>
    </div>
  );
}