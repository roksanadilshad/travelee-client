"use client";

import { useState, useEffect } from "react";
import axios from "axios"; // Added axios
import { motion, AnimatePresence } from "framer-motion";
import { FaStar, FaCheckCircle, FaCamera, FaUser, FaImage, FaTrash } from "react-icons/fa";
// ... (your existing shadcn imports)

export default function ReviewForm() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", avatar: null, rating: "", comment: "", images: [] });
  // ... (your existing preview states)

  // 1. Fetch existing reviews on mount
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await axios.get("http://localhost:5000/reviews");
        setReviews(res.data);
      } catch (err) {
        console.error("Failed to load reviews:", err);
      }
    };
    fetchReviews();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 2. Upload Images to ImgBB first (Your existing logic)
      let avatarUrl = form.avatar 
        ? await uploadImage(form.avatar) 
        : `https://ui-avatars.com/api/?name=${form.name}&background=0EA5A4&color=fff`;

      let imgUrls = [];
      if (form.images.length > 0) {
        imgUrls = await Promise.all(form.images.map((file) => uploadImage(file)));
      }

      // 3. Prepare the payload for MongoDB
      const reviewData = {
        user: { name: form.name, avatar: avatarUrl },
        rating: parseInt(form.rating),
        comment: form.comment,
        images: imgUrls,
        date: new Date().toISOString(),
        verified: true,
        tripId: `TRP-${Math.floor(1000 + Math.random() * 9000)}` // Industrial Touch
      };

      // 4. SAVE TO BACKEND
      const response = await axios.post("http://localhost:5000/reviews", reviewData);

      if (response.data.insertedId) {
        setReviews([reviewData, ...reviews]); // Update UI
        setForm({ name: "", avatar: null, rating: "", comment: "", images: [] });
        setAvatarPreview(null);
        setImagesPreviews([]);
      }
    } catch (err) {
      console.error("Submission failed:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white py-16 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Updated Header: Industrial Aesthetic */}
        <div className="mb-12">
           <span className="text-[#0EA5A4] font-black uppercase tracking-[0.4em] text-[10px]">Registry Update</span>
           <h2 className="text-5xl font-black text-slate-900 tracking-tighter uppercase mt-2">
             User <span className="text-slate-400 italic">Feedback</span>
           </h2>
        </div>

        {/* Updated Button: Teal/Slate Theme */}
        <Button
          type="submit"
          disabled={loading}
          className="w-full bg-slate-900 hover:bg-[#0EA5A4] text-white font-black uppercase tracking-widest py-8 text-sm transition-all rounded-2xl shadow-xl"
        >
          {loading ? "Processing Data..." : "Broadcast Review"}
        </Button>

        {/* ... existing form fields updated with Slate-900 borders ... */}
      </div>
    </div>
  );
}