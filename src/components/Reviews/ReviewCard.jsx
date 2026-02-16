"use client";

 
import { useState } from "react";
import Image from "next/image";
import { FaStar, FaCheckCircle } from "react-icons/fa";

export default function ReviewCard({ review }) {
  const [imageErrors, setImageErrors] = useState({});

  const handleImageError = (index) => {
    setImageErrors(prev => ({ ...prev, [index]: true }));
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-4 hover:shadow-lg transition-shadow">
      {/* User Info */}
      <div className="flex items-center mb-3">
        <div className="relative w-12 h-12 mr-3">
          <Image
            src={review.user.avatar || "https://ui-avatars.com/api/?name=User&background=cccccc&color=fff&size=128"}
            alt={review.user.name}
            fill
            className="rounded-full border-2 border-gray-200 object-cover"
            sizes="48px"
            unoptimized // For external URLs
          />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <p className="font-semibold text-gray-800">{review.user.name}</p>
            {review.verified && (
              <FaCheckCircle className="text-green-500 text-sm" title="Verified Visit" />
            )}
          </div>
          <p className="text-sm text-gray-500">
            {new Date(review.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </p>
        </div>
      </div>

      {/* Star Rating */}
      <div className="flex items-center mb-3">
        <div className="flex mr-2">
          {Array.from({ length: 5 }, (_, i) => (
            <FaStar
              key={i}
              className={`${
                i < review.rating ? "text-yellow-400" : "text-gray-300"
              } text-lg`}
            />
          ))}
        </div>
        <span className="text-sm font-semibold text-gray-700">
          {review.rating}.0
        </span>
      </div>

      {/* Comment */}
      <p className="text-gray-700 mb-4 leading-relaxed">{review.comment}</p>

      {/* Images */}
      {review.images && review.images.length > 0 && (
        <div className={`grid gap-2 mb-3 ${
          review.images.length === 1 ? 'grid-cols-1' : 
          review.images.length === 2 ? 'grid-cols-2' : 
          'grid-cols-2 md:grid-cols-3'
        }`}>
          {review.images.map((img, idx) => (
            !imageErrors[idx] && (
              <div key={idx} className="relative h-40 overflow-hidden rounded-lg group">
                <Image
                  src={img}
                  alt={`Review Image ${idx + 1}`}
                  fill
                  className="object-cover rounded-lg transition-transform group-hover:scale-105 cursor-pointer"
                  onError={() => handleImageError(idx)}
                  sizes="(max-width: 768px) 50vw, 33vw"
                  unoptimized // For external URLs from Unsplash
                />
              </div>
            )
          ))}
        </div>
      )}

      {/* Helpful Counter */}
      {review.helpful > 0 && (
        <div className="text-sm text-gray-500 border-t pt-3">
          <span className="font-medium">{review.helpful}</span> people found this helpful
        </div>
      )}
    </div>
  );
}