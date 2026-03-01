"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { MapPin, Star, Trash2 } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "react-toastify";

const SERVER_URL = "http://localhost:500";

const WishlistPage = () => {
  const { user } = useAuth();
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchWishlist = async () => {
    if (!user?.email) return;

    try {
      const res = await fetch(`${SERVER_URL}/wishlists/${user.email}`);
      const data = await res.json();
      setWishlist(data);
    } catch (err) {
      toast.error("Wishlist load failed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, [user?.email]);

  const handleRemove = async (destination_id) => {
    try {
      await fetch(`${SERVER_URL}/wishlists`, {
        method: "DELETE",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          destination_id,
          userEmail: user.email,
        }),
      });

      setWishlist((prev) =>
        prev.filter((item) => item.destination_id !== destination_id)
      );

      toast.info("Removed from wishlist 💔");
    } catch (err) {
      toast.error("Remove failed");
    }
  };

  if (loading) return <p className="p-10">Loading wishlist...</p>;

  return (
    <div className="min-h-screen p-8">
      <h1 className="text-3xl font-black mb-8">❤️ My Wishlist</h1>

      {wishlist.length === 0 && (
        <p className="text-gray-500">No wishlist items yet.</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {wishlist.map((item) => (
          <Link
            key={item._id}
            href={`/destinations/${item.destinationMongoId}`}
            className="block h-full"
          >
            <motion.div
              whileHover={{ y: -6 }}
              className="bg-white border rounded-2xl overflow-hidden shadow hover:shadow-xl transition-all flex flex-col"
            >
              <div className="relative h-52">
                <Image
                  src={item.media?.cover_image || "/default-placeholder.png"}
                  alt={item.city}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-3 left-3 bg-white/90 px-2 py-1 rounded-full flex items-center gap-1 text-xs font-bold">
                  <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                  {item.popularityScore || "8.5"}
                </div>

                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleRemove(item.destination_id);
                  }}
                  className="absolute top-3 right-3 bg-white p-2 rounded-full shadow hover:scale-110 transition"
                >
                  <Trash2 className="w-4 h-4 text-red-500" />
                </button>
              </div>

              <div className="p-4 flex flex-col flex-1">
                <p className="text-xs uppercase flex items-center gap-1 text-gray-500">
                  <MapPin className="w-3 h-3" /> {item.country}
                </p>
                <h3 className="text-xl font-black">{item.city}</h3>

                <p className="text-sm text-gray-500 mt-2 line-clamp-2">
                  {item.description}
                </p>

                <p className="mt-auto text-sm font-bold text-teal-600">
                  Budget: {item.avgBudget}
                </p>
              </div>
            </motion.div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default WishlistPage;