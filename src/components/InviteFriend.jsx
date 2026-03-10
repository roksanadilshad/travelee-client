"use client";
import { useState } from "react";
import { useParams } from "next/navigation";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import Swal from "sweetalert2";

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

  const senderDisplayName =
    currentUser?.name || currentUser?.email?.split("@")[0] || "A friend";

  const handleInvite = async () => {
    if (!email) {
      return Swal.fire({
        icon: "warning",
        title: "Missing Email",
        text: "Please enter a valid email address.",
        confirmButtonColor: "#2563eb",
      });
    }

    setLoading(true);
    try {
      let currentId = tripId || params?.id;
      if (!currentId || currentId === "temp-id") {
        if (onAutoSave) currentId = await onAutoSave();
      }

      if (!currentId) {
        setLoading(false);
        return Swal.fire({
          icon: "error",
          title: "Save Required",
          text: "Please save the trip before inviting!",
          confirmButtonColor: "#2563eb",
        });
      }

      const res = await axiosSecure.post("/my-trips/invite", {
        tripId: currentId,
        friendEmail: email,
      });

      console.log("Server Response:", res.data);

      if (res.status === 200 || res.status === 201 || res.data.success) {
        if (socket) {
          socket.emit("send-invite", {
            friendId: res.data.friendId || res.data._id || email,
            senderName: senderDisplayName,
            tripId: currentId,
            tripTitle: tripTitle || "this trip",
          });
        }

        Swal.fire({
          title: "Success!",
          html: `Invitation sent successfully to <b class="text-blue-600">${email}</b>`,
          icon: "success",
          draggable: true,
          confirmButtonColor: "#2563eb",
          confirmButtonText: "Done!",
          showClass: {
            popup: "animate__animated animate__fadeInUp animate__faster",
          },
          hideClass: {
            popup: "animate__animated animate__fadeOutDown animate__faster",
          },
        });

        setEmail("");
      }
    } catch (err) {
      console.error("Invite Error Detail:", err);

      const errorMsg =
        err.response?.data?.message || err.message || "Something went wrong!";

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
    <div className="flex flex-col gap-2 p-3 bg-blue-50 rounded-xl border border-blue-100 shadow-sm w-full">
      <p className="text-[10px] font-bold text-blue-600 uppercase tracking-wider">
        Invite Collaborator
      </p>
      <div className="flex gap-2">
        <input
          type="email"
          className="flex-1 border border-blue-200 p-2 rounded-lg text-sm text-black outline-none focus:ring-2 focus:ring-blue-400 transition-all"
          placeholder="friend@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button
          onClick={handleInvite}
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-5 py-2 rounded-lg disabled:bg-blue-300 font-bold transition-colors shrink-0"
        >
          {loading ? "..." : "Invite"}
        </button>
      </div>
    </div>
  );
}
