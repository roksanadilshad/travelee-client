"use client";

import { useEffect, useState } from "react";
import TripReviewCard from "./TripReviewCard";
import Lightbox from "./Lightbox";

export default function TripReviewsList({ tripId }) {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lightbox, setLightbox] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        let url = "http://localhost:500/api/tripreviews";
        if (tripId) url += `?tripId=${tripId}`;

        const res = await fetch(url);
        const data = await res.json();
        setReviews(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
  }, [tripId]);

  if (loading) return <LoadingSkeleton />;
  if (!reviews.length) return <NoReviews />;

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {reviews.map((review) => (
          <TripReviewCard
            key={review._id}
            review={review}
            onImageClick={(images, idx) => setLightbox({ images, index: idx })}
          />
        ))}
      </div>

      {lightbox && (
        <Lightbox
          images={lightbox.images}
          startIndex={lightbox.index}
          onClose={() => setLightbox(null)}
        />
      )}
    </>
  );
}

// ── Skeleton Loader ──
function LoadingSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {[...Array(3)].map((_, i) => (
        <div
          key={i}
          className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm animate-pulse"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-11 h-11 rounded-full bg-gray-200" />
            <div className="space-y-2">
              <div className="h-3 w-28 bg-gray-200 rounded" />
              <div className="h-3 w-16 bg-gray-200 rounded" />
            </div>
          </div>
          <div className="space-y-2">
            <div className="h-3 w-full bg-gray-100 rounded" />
            <div className="h-3 w-4/5 bg-gray-100 rounded" />
            <div className="h-3 w-3/5 bg-gray-100 rounded" />
          </div>
        </div>
      ))}
    </div>
  );
}

// ── No Reviews ──
function NoReviews() {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-gray-400 gap-2">
      <span className="text-4xl">💬</span>
      <p className="text-base font-medium">No reviews yet</p>
      <p className="text-sm">Be the first to share your experience!</p>
    </div>
  );
}
