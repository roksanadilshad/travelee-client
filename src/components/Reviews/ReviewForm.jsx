"use client";

import { useState } from "react";
import Image from "next/image";
import { FaStar, FaCheckCircle, FaCamera, FaUser, FaImage, FaTrash } from "react-icons/fa";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function ReviewForm() {
  const [reviews, setReviews] = useState([]);
  const [form, setForm] = useState({
    name: "",
    avatar: null,
    rating: "",
    comment: "",
    images: [],
  });
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [imagesPreviews, setImagesPreviews] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setForm((prev) => ({ ...prev, avatar: file }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImagesChange = (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      setForm((prev) => ({ ...prev, images: [...prev.images, ...files] }));
      
      // Create previews
      files.forEach((file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagesPreviews((prev) => [...prev, reader.result]);
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const removeImage = (index) => {
    setForm((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
    setImagesPreviews((prev) => prev.filter((_, i) => i !== index));
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
    setLoading(true);

    try {
      let avatarUrl = form.avatar
        ? await uploadImage(form.avatar)
        : `https://ui-avatars.com/api/?name=${form.name || "User"}&background=6366f1&color=fff&size=128`;

      const newReview = {
        id: Date.now().toString(),
        user: { name: form.name, avatar: avatarUrl },
        rating: parseInt(form.rating),
        comment: form.comment,
        images: [],
        date: new Date().toISOString(),
        verified: true,
      };

      // Upload all review images
      if (form.images && form.images.length > 0) {
        const imgUrls = await Promise.all(
          form.images.map((file) => uploadImage(file))
        );
        newReview.images = imgUrls;
      }

      setReviews([newReview, ...reviews]);
      
      // Reset form
      setForm({ name: "", avatar: null, rating: "", comment: "", images: [] });
      setAvatarPreview(null);
      setImagesPreviews([]);
      
      // Reset file inputs
      e.target.reset();
    } catch (err) {
      console.error("Image upload failed:", err);
      alert("Image upload failed. Please try again.");
    }

    setLoading(false);
  };

  const StarRating = ({ rating, size = "text-xl" }) => {
    return (
      <div className="flex items-center gap-1">
        {Array.from({ length: 5 }, (_, i) => (
          <FaStar
            key={i}
            className={`${
              i < rating ? "text-yellow-400" : "text-gray-300"
            } ${size}`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Customer Reviews
          </h1>
          <p className="text-gray-600">Share your experience with us</p>
        </div>

        {/* Review Form */}
        <Card className="mb-8 shadow-lg border-0 bg-white/80 backdrop-blur">
          <CardHeader className="border-b bg-gradient-to-r from-indigo-50 to-purple-50">
            <CardTitle className="text-2xl flex items-center gap-2">
              <FaStar className="text-yellow-400" />
              Write a Review
            </CardTitle>
            <CardDescription>
              Tell us about your experience and help others make informed decisions
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name and Avatar Row */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                    <FaUser className="text-indigo-500" />
                    Your Name
                  </label>
                  <Input
                    type="text"
                    name="name"
                    placeholder="Enter your name"
                    value={form.name}
                    onChange={handleChange}
                    className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                    <FaCamera className="text-indigo-500" />
                    Profile Picture (Optional)
                  </label>
                  <div className="flex items-center gap-4">
                    <Avatar className="h-16 w-16 border-2 border-indigo-200">
                      <AvatarImage src={avatarPreview} />
                      <AvatarFallback className="bg-gradient-to-br from-indigo-500 to-purple-500 text-white text-xl">
                        {form.name.charAt(0).toUpperCase() || "U"}
                      </AvatarFallback>
                    </Avatar>
                    <Input
                      type="file"
                      name="avatar"
                      accept="image/*"
                      onChange={handleAvatarChange}
                      className="flex-1 cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                    />
                  </div>
                </div>
              </div>

              {/* Rating */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <FaStar className="text-yellow-400" />
                  Rating
                </label>
                <Select
                  value={form.rating}
                  onValueChange={(value) =>
                    setForm((prev) => ({ ...prev, rating: value }))
                  }
                  required
                >
                  <SelectTrigger className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500">
                    <SelectValue placeholder="Select your rating" />
                  </SelectTrigger>
                  <SelectContent>
                    {[5, 4, 3, 2, 1].map((r) => (
                      <SelectItem key={r} value={r.toString()}>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold">{r}</span>
                          <StarRating rating={r} size="text-sm" />
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Comment */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">
                  Your Review
                </label>
                <Textarea
                  name="comment"
                  value={form.comment}
                  onChange={handleChange}
                  placeholder="Share your experience with us..."
                  rows={5}
                  className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 resize-none"
                  required
                />
              </div>

              {/* Review Images */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <FaImage className="text-indigo-500" />
                  Add Photos (Optional)
                </label>
                <Input
                  type="file"
                  name="images"
                  accept="image/*"
                  multiple
                  onChange={handleImagesChange}
                  className="cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                />
                
                {imagesPreviews.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
                    {imagesPreviews.map((preview, idx) => (
                      <div
                        key={idx}
                        className="relative group aspect-square rounded-lg overflow-hidden border-2 border-gray-200"
                      >
                        <Image
                          src={preview}
                          alt={`Preview ${idx + 1}`}
                          fill
                          className="object-cover"
                          unoptimized
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(idx)}
                          className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                        >
                          <FaTrash className="text-xs" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold py-6 text-lg shadow-lg hover:shadow-xl transition-all"
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Submitting Review...
                  </div>
                ) : (
                  "Submit Review"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Reviews List */}
        <div className="space-y-6">
          {reviews.length === 0 ? (
            <Card className="text-center py-12 border-dashed border-2 bg-white/50">
              <CardContent className="pt-6">
                <FaStar className="text-6xl text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 text-lg">No reviews yet. Be the first to share your experience!</p>
              </CardContent>
            </Card>
          ) : (
            reviews.map((review) => (
              <Card
                key={review.id}
                className="shadow-lg border-0 bg-white/80 backdrop-blur hover:shadow-xl transition-shadow"
              >
                <CardContent className="pt-6">
                  {/* User Info */}
                  <div className="flex items-start gap-4 mb-4">
                    <Avatar className="h-14 w-14 border-2 border-indigo-200 ring-2 ring-indigo-100">
                      <AvatarImage src={review.user.avatar} alt={review.user.name} />
                      <AvatarFallback className="bg-gradient-to-br from-indigo-500 to-purple-500 text-white text-lg">
                        {review.user.name.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-bold text-lg text-gray-800">
                          {review.user.name}
                        </h3>
                        {review.verified && (
                          <Badge className="bg-green-500 hover:bg-green-600 text-white flex items-center gap-1">
                            <FaCheckCircle className="text-xs" />
                            Verified
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-gray-500">
                        {new Date(review.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-2 mb-4">
                    <StarRating rating={review.rating} />
                    <span className="text-lg font-bold text-gray-700">
                      {review.rating}.0
                    </span>
                  </div>

                  {/* Comment */}
                  <p className="text-gray-700 leading-relaxed mb-4">
                    {review.comment}
                  </p>

                  {/* Review Images */}
                  {review.images && review.images.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {review.images.map((img, idx) => (
                        <div
                          key={idx}
                          className="relative aspect-square rounded-lg overflow-hidden border-2 border-gray-200 hover:border-indigo-400 transition-colors cursor-pointer group"
                        >
                          <Image
                            src={img}
                            alt={`Review image ${idx + 1}`}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform"
                            unoptimized
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
}