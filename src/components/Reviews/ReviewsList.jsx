"use client";

 
import { useState } from "react";
import ReviewCard from "./ReviewCard";
import { reviews } from "./Reviews";
import { FaStar } from "react-icons/fa";

export default function ReviewsList() {
  const [filterRating, setFilterRating] = useState(0);
  const [sortBy, setSortBy] = useState("date");

  // Calculate statistics
  const averageRating = (
    reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
  ).toFixed(1);

  const ratingCounts = [5, 4, 3, 2, 1].map(rating => ({
    rating,
    count: reviews.filter(r => r.rating === rating).length
  }));

  // Filter and sort reviews
  const filteredReviews = reviews
    .filter(review => filterRating === 0 || review.rating === filterRating)
    .sort((a, b) => {
      if (sortBy === "date") {
        return new Date(b.date) - new Date(a.date);
      } else if (sortBy === "rating") {
        return b.rating - a.rating;
      } else if (sortBy === "helpful") {
        return b.helpful - a.helpful;
      }
      return 0;
    });

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Reviews</h1>
        <div className="flex items-center gap-3 mb-4">
          <div className="flex items-center">
            <span className="text-4xl font-bold text-gray-800 mr-2">
              {averageRating}
            </span>
            <div>
              <div className="flex">
                {Array.from({ length: 5 }, (_, i) => (
                  <FaStar
                    key={i}
                    className={`${
                      i < Math.round(averageRating) ? "text-yellow-400" : "text-gray-300"
                    } text-sm`}
                  />
                ))}
              </div>
              <p className="text-sm text-gray-600">{reviews.length} reviews</p>
            </div>
          </div>
        </div>

        {/* Rating Distribution */}
        <div className="bg-gray-50 rounded-lg p-4 mb-4">
          {ratingCounts.map(({ rating, count }) => (
            <div key={rating} className="flex items-center gap-2 mb-2 last:mb-0">
              <button
                onClick={() => setFilterRating(filterRating === rating ? 0 : rating)}
                className={`flex items-center gap-2 flex-1 hover:bg-gray-100 p-2 rounded transition ${
                  filterRating === rating ? 'bg-blue-50 border border-blue-300' : ''
                }`}
              >
                <span className="text-sm font-medium w-8">{rating}</span>
                <FaStar className="text-yellow-400 text-xs" />
                <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-yellow-400"
                    style={{ width: `${(count / reviews.length) * 100}%` }}
                  />
                </div>
                <span className="text-sm text-gray-600 w-8 text-right">{count}</span>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-6">
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="date">Most Recent</option>
          <option value="rating">Highest Rated</option>
          <option value="helpful">Most Helpful</option>
        </select>

        {filterRating > 0 && (
          <button
            onClick={() => setFilterRating(0)}
            className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition"
          >
            Clear Filter ({filterRating} ⭐)
          </button>
        )}
      </div>

      {/* Reviews */}
      <div>
        {filteredReviews.length > 0 ? (
          filteredReviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))
        ) : (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <p className="text-gray-500 text-lg">No reviews found with this filter.</p>
            <button
              onClick={() => setFilterRating(0)}
              className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
            >
              View All Reviews
            </button>
          </div>
        )}
      </div>
    </div>
  );
}