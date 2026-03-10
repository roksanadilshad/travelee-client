"use client";
import { useState } from "react";
import { useParams } from "next/navigation";
import useAxiosSecure from "@/hooks/useAxiosSecure";

export default function InviteFriend({
  tripId,
  tripTitle,
  socket,
  onAutoSave,
}) {
  const params = useParams();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const axiosSecure = useAxiosSecure();

  const handleInvite = async () => {
    if (!email) return alert("Please enter an email address.");

    setLoading(true);
    try {
      let currentId = tripId || params?.id;
      if (!currentId || currentId === "temp-id") {
        if (onAutoSave) currentId = await onAutoSave();
      }

      if (!currentId) {
        setLoading(false);
        return alert("Please save the trip first!");
      }

      const res = await axiosSecure.post("/my-trips/invite", {
        tripId: currentId,
        friendEmail: email,
      });

      if (res.data.success) {
        if (socket) {
          socket.emit("send-invite", {
            friendId: res.data.friendId,
            senderName: "A friend",
            tripId: currentId,
            tripTitle: tripTitle,
          });
        }
        alert(`Invitation sent successfully to ${email}!`);
        setEmail("");
      }
    } catch (err) {
      console.error("Invite Error:", err.response?.data);
      alert(err.response?.data?.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-2 p-3 bg-blue-50 rounded-xl border border-blue-100 shadow-sm">
      <p className="text-[10px] font-bold text-blue-600 uppercase">
        Invite Collaborator
      </p>
      <div className="flex gap-2">
        <input
          type="email"
          className="flex-1 border p-2 rounded-lg text-sm text-black outline-none"
          placeholder="friend@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button
          onClick={handleInvite}
          disabled={loading}
          className="bg-blue-600 text-white text-sm px-4 py-2 rounded-lg disabled:bg-blue-300 font-bold"
        >
          {loading ? "..." : "Invite"}
        </button>
      </div>
    </div>
  );
}
