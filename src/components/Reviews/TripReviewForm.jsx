"use client";

import { useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { FaTrash, FaStar, FaCamera } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

import { toast } from "react-toastify";

export default function TripReviewForm({ onReviewAdded, session, tripId: propTripId}) {
  // FIX 1: Safely handle searchParams which can be null in some environments
  const searchParams = useSearchParams();
  const tripIdFromURL = searchParams ? searchParams.get("tripId") : null;

  // FIX 2: Priority logic for ID (Prop from Modal > URL Param)
  const targetTripId = propTripId || tripIdFromURL;
  const user = session?.user;

  const [form, setForm] = useState({
    rating: 0,
    comment: "",
    images: [],
  });

  const [imagesPreviews, setImagesPreviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hoverRating, setHoverRating] = useState(0);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleImagesChange = (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    setForm((prev) => ({
      ...prev,
      images: [...prev.images, ...files],
    }));

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagesPreviews((prev) => [...prev, reader.result]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (idx) => {
    setForm((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== idx),
    }));
    setImagesPreviews((prev) => prev.filter((_, i) => i !== idx));
  };

  const uploadImage = async (file) => {
    const API_KEY = "a56b8a7cf4efc2eb29c41b771489d45d";
    const formData = new FormData();
    formData.append("image", file);

    const res = await fetch(`https://api.imgbb.com/1/upload?key=${API_KEY}`, {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    if (!data.success) throw new Error("Image upload failed");
    return data.data.url;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!targetTripId) return toast.error("Trip ID missing!");
    if (!form.rating) return toast.warning("Please select a rating!");
    if (!user?.email) return toast.info("Please login first 🙏");

    setLoading(true);

    try {
      let imagesUrls = [];
      if (form.images.length > 0) {
        imagesUrls = await Promise.all(
          form.images.map((file) => uploadImage(file))
        );
      }

      const payload = {
        userEmail: user.email,
        userName: user.name || "User",
        userAvatar: user.image || `https://ui-avatars.com/api/?name=${user.name}`,
        destination_id: targetTripId, // Link review to destination
        rating: Number(form.rating),
        comment: form.comment,
        images: imagesUrls,
      };

      const res = await fetch("https://travelee-server.vercel.app/api/tripreviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Failed to add review");

      toast.success("Review submitted! 🎉");
      
      // Reset local state
      setForm({ rating: 0, comment: "", images: [] });
      setImagesPreviews([]);
      
      if (onReviewAdded) onReviewAdded();
    } catch (err) {
      toast.error(err.message || "Error submitting review");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full">
      <Card className="border-none shadow-none bg-transparent">
        <CardHeader className="text-center p-0 mb-6">
          <CardTitle className="text-2xl font-black">Rate Your Trip</CardTitle>
          <CardDescription className="text-xs uppercase font-bold tracking-widest text-emerald-600">
            Destination ID: {targetTripId}
          </CardDescription>
        </CardHeader>

        <CardContent className="p-0">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex flex-col items-center gap-2">
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setForm(f => ({ ...f, rating: star }))}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    className="transition-transform hover:scale-110 active:scale-90"
                  >
                    <FaStar
                      size={32}
                      className={(hoverRating || form.rating) >= star ? "text-yellow-400" : "text-slate-200"}
                    />
                  </button>
                ))}
              </div>
            </div>

            <Textarea
              name="comment"
              value={form.comment}
              onChange={handleChange}
              placeholder="Tell others about your experience..."
              className="rounded-2xl border-none bg-slate-50 focus-visible:ring-emerald-500"
              required
            />

            <div className="flex gap-2 overflow-x-auto py-2">
              <label className="w-20 h-20 shrink-0 flex items-center justify-center border-2 border-dashed border-slate-200 rounded-2xl cursor-pointer hover:bg-slate-50">
                <FaCamera className="text-slate-300" size={20} />
                <input type="file" multiple accept="image/*" onChange={handleImagesChange} className="hidden" />
              </label>

              <AnimatePresence>
                {imagesPreviews.map((img, idx) => (
                  <motion.div key={idx} initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} className="relative w-20 h-20 shrink-0">
                    <Image src={img} alt="preview" fill className="rounded-2xl object-cover" />
                    <button
                      type="button"
                      onClick={() => removeImage(idx)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full shadow-lg"
                    >
                      <FaTrash size={10} />
                    </button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            <Button disabled={loading} className="w-full bg-[#0A1D1A] py-6 rounded-2xl font-black text-xs uppercase tracking-widest">
              {loading ? "Syncing..." : "Publish Review"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
}