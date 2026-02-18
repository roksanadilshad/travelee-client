"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { ToastContainer } from "react-toastify";
import { useState } from "react";
import NextAuthProvider from "./NextAuthProvider";

export default function Providers({ children }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <NextAuthProvider>
        {children}
        <ToastContainer position="top-right" autoClose={5000} theme="light" />
      </NextAuthProvider>
    </QueryClientProvider>
  );
}
