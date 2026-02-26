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
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "react-toastify";

export default function TripReviewForm({ onReviewAdded }) {
  const searchParams = useSearchParams();
  const tripIdFromURL = searchParams.get("tripId");

  const [form, setForm] = useState({
    tripId: tripIdFromURL || "",
    rating: 0,
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

    const res = await fetch(
      `https://api.imgbb.com/1/upload?key=${API_KEY}`,
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await res.json();
    if (!data.success) throw new Error("Image upload failed");

    return data.data.url;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const targetTripId = tripIdFromURL || form.tripId;

    if (!targetTripId) return toast.error("Trip ID missing!");
    if (!form.rating) return toast.warning("Please select a rating!");
    if (!user?.email)
      return toast.info("Please login first to submit a review 🙏");

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
        userName: user.fullName || user.name || "User",
        userAvatar:
          user.image ||
          `https://ui-avatars.com/api/?name=${encodeURIComponent(
            user.fullName || user.name || "User"
          )}&background=6366f1&color=fff&size=128`,
        destination_id: targetTripId,
        rating: Number(form.rating),
        comment: form.comment,
        images: imagesUrls,
      };

      const res = await fetch(
        "https://travelee-server.vercel.app/api/tripreviews",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      const data = await res.json();
      if (!res.ok)
        throw new Error(data.message || "Failed to add review");

      // Reset form
      setForm({
        tripId: tripIdFromURL || "",
        rating: 0,
        comment: "",
        images: [],
      });

      setImagesPreviews([]);
      if (onReviewAdded) onReviewAdded();

      toast.success("Review submitted successfully! 🎉");
    } catch (err) {
      console.error(err);
      toast.error(
        err.message || "Something went wrong while submitting."
      );
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
      <Card className="overflow-hidden border-none shadow bg-white/90 backdrop-blur-md">
        <CardHeader className="text-center pb-2 pt-8">
          <CardTitle className="text-3xl font-bold">
            Rate Your Experience
          </CardTitle>
          <CardDescription>
            Tell us about your trip{" "}
            {tripIdFromURL
              ? `to Destination #${tripIdFromURL}`
              : ""}
          </CardDescription>
        </CardHeader>

        <CardContent className="p-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Star Rating */}
            <div className="flex flex-col items-center space-y-3">
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() =>
                      setForm((f) => ({
                        ...f,
                        rating: star,
                      }))
                    }
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    className="transition-transform hover:scale-125"
                  >
                    <FaStar
                      size={36}
                      className={
                        (hoverRating || form.rating) >= star
                          ? "text-yellow-400"
                          : "text-gray-200"
                      }
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Comment */}
            <Textarea
              name="comment"
              value={form.comment}
              onChange={handleChange}
              placeholder="What made this trip special?"
              required
            />

            {/* Image Upload */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <label className="aspect-square flex items-center justify-center border-2 border-dashed rounded-2xl cursor-pointer">
                <FaCamera />
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImagesChange}
                  className="hidden"
                />
              </label>

              <AnimatePresence>
                {imagesPreviews.map((img, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="relative aspect-square rounded-2xl overflow-hidden"
                  >
                    <Image
                      src={img}
                      alt="preview"
                      fill
                      className="object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(idx)}
                      className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full"
                    >
                      <FaTrash size={12} />
                    </button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full"
            >
              {loading ? "Publishing..." : "Post Review"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
}