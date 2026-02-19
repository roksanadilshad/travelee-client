"use client";

import { Star, CheckCircle } from "lucide-react";

export default function TripReviewCard({ review, onImageClick }) {
  return (
    <div className="flex flex-col rounded-2xl border border-gray-100 bg-white shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-3 px-5 pt-5 pb-4 border-b border-gray-50">
        <img
          src={review.user.avatar}
          alt={review.user.name}
          className="w-11 h-11 rounded-full object-cover ring-2 ring-gray-100"
        />
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-gray-800 text-sm truncate">
            {review.user.name}
          </p>
          <div className="flex items-center gap-0.5 mt-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < review.rating ? "text-amber-400 fill-amber-400" : "text-gray-300"
                }`}
              />
            ))}
            <span className="text-xs text-gray-400 ml-1">{review.rating}/5</span>
          </div>
        </div>

        {review.verified && (
          <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-600 bg-emerald-50 border border-emerald-100 rounded-full px-2 py-0.5 whitespace-nowrap">
            <CheckCircle className="w-3 h-3 text-emerald-600" />
            Verified
          </span>
        )}
      </div>

      {/* Comment */}
      <div className="px-5 py-4 flex-1">
        <p className="text-gray-600 text-sm leading-relaxed line-clamp-4">
          {review.comment}
        </p>
      </div>

      {/* Images */}
      {review.images && review.images.length > 0 && (
        <div className="px-5 pb-4 flex gap-2 overflow-x-auto">
          {review.images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => onImageClick(review.images, idx)}
              className="flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border border-gray-100 hover:ring-2 hover:ring-amber-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-amber-400"
            >
              <img
                src={img}
                alt={`Review image ${idx + 1}`}
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
              />
            </button>
          ))}
        </div>
      )}

      {/* Footer */}
      <div className="px-5 py-3 border-t border-gray-50 bg-gray-50/50">
        <p className="text-xs text-gray-400">
          {new Date(review.createdAt).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </p>
      </div>
    </div>
  );
}
