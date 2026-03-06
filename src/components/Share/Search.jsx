"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaSearch, FaMapMarkerAlt } from "react-icons/fa";
import { HiOutlineSparkles } from "react-icons/hi";
import { useLanguage } from "@/context/LanguageContext";
import { toast } from "react-toastify";

export default function Search() {
  const { t } = useLanguage();
  const [query, setQuery] = useState("");
  const [result, setResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [cursor, setCursor] = useState(-1);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const router = useRouter();

  useEffect(() => {
    if (!query) {
      setResult([]);
      return;
    }

    const timer = setTimeout(async () => {
      setLoading(true);

      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/destinations?city=${query}`);

const data = await response.json();
console.log(data);

const filtered = data.data.filter(item =>
  item.city.toLowerCase().includes(query.toLowerCase())
);

        setResult(filtered);
      } catch (error) {
        console.log("Fetch error", error);
      } finally {
        setLoading(false);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [query]);

  const getHighlightText = (text, highlight) => {
    const parts = text.split(new RegExp(`(${highlight})`, "gi"));

    return parts.map((part, i) =>
      part.toLowerCase() === highlight.toLowerCase() ? (
        <b key={i} className="text-primary font-bold">
          {part}
        </b>
      ) : (
        part
      )
    );
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      
      if (cursor < result.length - 1) {
        setCursor((prev) => prev + 1);
      }
    }

    if (e.key === "ArrowUp") {
      
      if (cursor > 0) {
        setCursor((prev) => prev - 1);
      }
    }

    if (e.key === "Enter") {
      

      if (cursor >= 0) {
        router.push(`/destinations?city=${result[cursor].city}`);
      } else if (query.trim()) {
        router.push(`/destinations?city=${query}`);
      }

      setShowDropdown(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();

    if (query.trim()) {
      router.push(`/destinations?city=${query}`);
      setShowDropdown(false);
    }
  };

  const handleSelect = (city) => {
    setQuery(city);
    setShowDropdown(false);
    router.push(`/destinations?city=${city}`);
  };

  return (
    <div className="w-full">
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6 }}
        className={`relative p-1.5 rounded-[2rem] transition-all duration-500 shadow-2xl ${
          isFocused
            ? "bg-gradient-to-r from-[#0EA5A4] to-[#FF6B6B]"
            : "bg-white/80 backdrop-blur-md border border-slate-200"
        }`}
      >
        <div className="bg-white rounded-[1.8rem] p-2">
          <form
            onSubmit={handleSearch}
            className="flex flex-col md:flex-row md:items-center gap-2"
          >
            <div className="flex items-center flex-1 px-4">
              <FaMapMarkerAlt className="text-slate-400" />

              <div className="flex flex-col flex-1 ml-4 text-left relative">
                <input
                  type="text"
                  value={query}
                  placeholder={t("search.placeholder")}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  onKeyDown={handleKeyDown}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setCursor(-1);
                    setShowDropdown(true);
                  }}
                  className="bg-transparent outline-none text-[#1E293B] font-bold w-full"
                />

                {loading && <div className="text-sm">Loading...</div>}

                {showDropdown && query && !loading && (
                  <ul className="absolute top-10 left-0 w-full bg-white shadow-lg rounded-lg z-50">
                    {result.length > 0 ? (
                      result.map((item, index) => (
                        <li
                          key={item._id}
                          onMouseDown={() => handleSelect(item.city)}
                          className={`px-4  py-2 cursor-pointer ${
                            cursor === index
                              ? "bg-gray-200"
                              : "hover:bg-gray-100"
                          }`}
                        >
                          {getHighlightText(item.city, query)}
                        </li>
                      ))
                    ) : (
                      <li className="px-4 py-2 text-gray-500">
                        No results found
                      </li>
                    )}
                  </ul>
                )}
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-[#FF6B6B] text-white px-8 py-4 flex justify-center items-center gap-3 rounded-[1.5rem]"
            >
              <FaSearch />
              {t("search.button")}
            </motion.button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}