import DestinationCard from "@/components/Share/cards/DestinationCard";
import Footer from "@/components/Share/Footer";
import Navbar from "@/components/Share/Navbar";


import React from "react";
import { ToastContainer } from "react-toastify";


export default function PublicLayout({
  children,
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />

      {/* Toastify  */}
      <ToastContainer />
    </div>
  );
}
