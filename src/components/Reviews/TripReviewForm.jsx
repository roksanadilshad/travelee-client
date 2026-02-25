"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { FaTrash } from "react-icons/fa";
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
  const [ setUser] = useState(null);
  // const [trips, setTrips] = useState([]);
  const [form, setForm] = useState({
    tripId: tripIdFromURL || "",
    rating: "",
    comment: "",
    images: [],
  });
  const [imagesPreviews, setImagesPreviews] = useState([]);
  const [loading, setLoading] = useState(false);

  const { user } = useAuth();
  // // Fetch user
  // useEffect(() => {
  //   const fetchUser = async () => {
  //     try {
  //       const res = await fetch(
  //         "https://travelee-server.vercel.app/user/email?email=rimon@gmail.com",
  //       );
  //       const data = await res.json();
  //       if (data.success) setUser(data.data);
  //     } catch (err) {
  //       console.error(err);
  //     }
  //   };
  //   fetchUser();
  // }, []);

  // Fetch trips
  // useEffect(() => {
  //   const fetchTrips = async () => {
  //     try {
  //       const res = await fetch("https://travelee-server.vercel.app/my-trips");
  //       const data = await res.json();
  //       setTrips(data);
  //       // Auto-select
  //       if (tripIdFromURL && data.find((t) => t._id === tripIdFromURL)) {
  //         setForm((prev) => ({ ...prev, tripId: tripIdFromURL }));
  //       }
  //     } catch (err) {
  //       console.error(err);
  //     }
  //   };
  //   fetchTrips();
  // }, [tripIdFromURL]);

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

  if (!form.tripId) return toast.error("Trip ID missing!");
  if (!form.rating) return toast.warning("Please select a rating!");

  if (!user || !user.email) {
    toast.info("Please login first to submit a review 🙏");
    return;
  }

  setLoading(true);
  try {
    let imagesUrls = [];
    if (form.images.length > 0) {
      imagesUrls = await Promise.all(form.images.map((f) => uploadImage(f)));
    }

    const payload = {
      userEmail: user.email,
      userName: user.fullName || user.name || "User",
      userAvatar:
        user.image ||
        `https://ui-avatars.com/api/?name=${encodeURIComponent(
          user.fullName || user.name || "User"
        )}&background=6366f1&color=fff&size=128`,
      destination_id: tripIdFromURL,
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
      destination_id: tripIdFromURL,
      rating: "",
      comment: "",
      images: [],
    });
    setImagesPreviews([]);
    if (onReviewAdded) onReviewAdded();

    toast.success("Review submitted successfully! 🎉");
  } catch (err) {
    console.error(err);
    toast.error(err.message || "Failed to submit review");
  } finally {
    setLoading(false);
  }
};

  // const tripName =
  //   trips.find((t) => t._id === form.tripId)?.tripName || "Loading...";

  return (
    <Card className="max-w-3xl mx-auto mb-8 shadow-lg border-0 bg-white/80">
      <CardHeader className="bg-gradient-to-r from-indigo-50 to-purple-50 border-b">
        <CardTitle className="text-2xl">Add Trip Review</CardTitle>
        <CardDescription>Share your experience with your trip</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Trip Display (readonly) */}
          {/* <div>
            <label className="block font-semibold mb-1">Trip</label>
            <Input value={tripName} readOnly className="bg-gray-100 cursor-not-allowed" />
          </div> */}
          {/* Destination ID (readonly) */}
          <div>
            <label className="block font-semibold mb-1">Destination ID</label>
            <Input
              value={tripIdFromURL || ""}
              readOnly
              className="bg-gray-100 cursor-not-allowed"
            />
          </div>

          {/* Rating */}
          <div>
            <label className="block font-semibold mb-1">Rating</label>
            <select
              name="rating"
              value={form.rating}
              onChange={handleChange}
              required
              className="w-full border rounded p-2"
            >
              <option value="">Select rating</option>
              {[5, 4, 3, 2, 1].map((r) => (
                <option key={r} value={r}>
                  {r} ⭐
                </option>
              ))}
            </select>
          </div>

          {/* Comment */}
          <div>
            <label className="block font-semibold mb-1">Review</label>
            <Textarea
              name="comment"
              value={form.comment}
              onChange={handleChange}
              placeholder="Write your review..."
              rows={4}
              required
            />
          </div>

          {/* Images */}
          <div>
            <label className="block font-semibold mb-1">
              Images (Optional)
            </label>
            <Input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImagesChange}
            />
            {imagesPreviews.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {imagesPreviews.map((img, idx) => (
                  <div key={idx} className="relative w-24 h-24">
                    <Image
                      src={img}
                      alt={`preview ${idx}`}
                      fill
                      className="object-cover rounded"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(idx)}
                      className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1"
                    >
                      <FaTrash size={12} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <Button type="submit" disabled={loading} className="w-full">
            {loading ? "Submitting..." : "Submit Review"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
