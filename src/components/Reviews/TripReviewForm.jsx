"use client";

import { useState } from "react";
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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "react-toastify";

export default function TripReviewForm({ onReviewAdded }) {
  const searchParams = useSearchParams();
  const tripIdFromURL = searchParams.get("tripId");
  const [form, setForm] = useState({
    tripId: tripIdFromURL || "",
    rating: "",
    comment: "",
    images: [],
  });
  const [imagesPreviews, setImagesPreviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hoverRating, setHoverRating] = useState(0);

  const { user } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleImagesChange = (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      setForm((prev) => ({ ...prev, images: [...prev.images, ...files] }));
      files.forEach((file) => {
        const reader = new FileReader();
        reader.onloadend = () =>
          setImagesPreviews((prev) => [...prev, reader.result]);
        reader.readAsDataURL(file);
      });
    }
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
    return data.data.url;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.tripId && !tripIdFromURL) return alert("Trip ID missing!");
    if (!form.rating) return alert("Please select a rating!");

  if (!form.tripId) return toast.error("Trip ID missing!");
  if (!form.rating) return toast.warning("Please select a rating!");

  if (!user || !user.email) {
    toast.info("Please login first to submit a review 🙏");
    return;
  }

      const payload = {
        userEmail: user.email,
        userName: user.fullName || user.name || "User",
        userAvatar:
          user.image ||
          `https://ui-avatars.com/api/?name=${encodeURIComponent(
            user.fullName || user.name || "User"
          )}&background=6366f1&color=fff&size=128`,
        destination_id: tripIdFromURL || form.tripId,
        rating: parseInt(form.rating),
        comment: form.comment,
        images: imagesUrls,
      };

      const res = await fetch("https://travelee-server.vercel.app/api/tripreviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to add review");

      setForm({
        tripId: tripIdFromURL || "",
        rating: "",
        comment: "",
        images: [],
      });
      setImagesPreviews([]);
      if (onReviewAdded) onReviewAdded();
      alert("Review submitted successfully! ✨");
    } catch (err) {
      console.error(err);
      alert(err.message || "Failed to submit review");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-2xl mx-auto py-8 px-4"
    >
      <Card className="overflow-hidden border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] bg-white/90 backdrop-blur-md">
        <CardHeader className="text-center pb-2 pt-8">
          <div className="mx-auto w-16 h-1 w-16 bg-indigo-600 rounded-full mb-4 shadow-[0_0_15px_rgba(79,70,229,0.4)]" />
          <CardTitle className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600">
            Rate Your Experience
          </CardTitle>
          <CardDescription className="text-base">
            Tell us about your trip to {tripIdFromURL ? `Destination #${tripIdFromURL}` : "this place"}
          </CardDescription>
        </CardHeader>

        <CardContent className="p-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            
            {/* Interactive Star Rating */}
            <div className="flex flex-col items-center justify-center space-y-3">
              <label className="text-sm font-bold text-gray-500 uppercase tracking-widest">Your Rating</label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setForm(f => ({...f, rating: star}))}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    className="transition-all duration-200 transform hover:scale-125 focus:outline-none"
                  >
                    <FaStar
                      size={36}
                      className={(hoverRating || form.rating) >= star ? "text-yellow-400 drop-shadow-md" : "text-gray-200"}
                    />
                  </button>
                ))}
              </div>
              {form.rating > 0 && (
                <span className="text-sm font-semibold text-indigo-600 animate-pulse">
                  {form.rating === 5 ? "Excellent! 😍" : form.rating === 4 ? "Great! 🙂" : "Good"}
                </span>
              )}
            </div>

            {/* Comment Section */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700">Write your story</label>
              <Textarea
                name="comment"
                value={form.comment}
                onChange={handleChange}
                placeholder="What made this trip special? Mention the food, people, or scenery..."
                className="min-h-[140px] border-gray-200 rounded-2xl focus:ring-indigo-500 focus:border-indigo-500 text-base p-4 resize-none transition-all"
                required
              />
            </div>

            {/* Professional Image Uploader */}
            <div className="space-y-4">
              <label className="text-sm font-bold text-gray-700">Add Photos</label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <label className="aspect-square flex flex-col items-center justify-center border-2 border-dashed border-gray-200 rounded-2xl cursor-pointer hover:bg-indigo-50 hover:border-indigo-300 transition-all group">
                  <FaCamera className="text-gray-400 group-hover:text-indigo-500 mb-2" size={24} />
                  <span className="text-xs font-medium text-gray-500 group-hover:text-indigo-600">Upload</span>
                  <input type="file" multiple accept="image/*" onChange={handleImagesChange} className="hidden" />
                </label>

                <AnimatePresence>
                  {imagesPreviews.map((img, idx) => (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      key={idx}
                      className="relative aspect-square rounded-2xl overflow-hidden group shadow-sm"
                    >
                      <Image src={img} alt="preview" fill className="object-cover" />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <button
                          type="button"
                          onClick={() => removeImage(idx)}
                          className="bg-red-500 text-white p-2 rounded-full transform hover:scale-110 transition-transform"
                        >
                          <FaTrash size={14} />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>

            {/* Hidden Field for Logic */}
            <input type="hidden" name="tripId" value={form.tripId} />

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={loading}
              className={`w-full h-14 rounded-2xl font-bold text-lg shadow-lg transition-all duration-300 ${
                loading 
                ? "bg-gray-400 cursor-not-allowed" 
                : "bg-primary hover:bg-green-600 hover:shadow-indigo-200 active:scale-[0.98]"
              }`}
            >
              {loading ? (
                <div className="flex items-center space-x-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Publishing...</span>
                </div>
              ) : (
                "Post Review"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
}