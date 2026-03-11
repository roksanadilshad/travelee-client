"use client";
import { useState, useEffect } from "react";

export default function useDestinationSearch(query) {
  const [result, setResult] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query) {
      setResult([]);
      return;
    }

    const timer = setTimeout(async () => {
      setLoading(true);

      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/destinations?city=${query}`
        );

        const data = await res.json();

        const filtered = data.data.filter((item) =>
          item.city?.toLowerCase().includes(query.toLowerCase()) ||
          item.country?.toLowerCase().includes(query.toLowerCase()) ||
          item.region?.toLowerCase().includes(query.toLowerCase())
        );

        setResult(filtered);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [query]);

  return { result, loading };
}