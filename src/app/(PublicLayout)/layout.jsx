import Footer from "@/components/Share/Footer";
import Navbar from "@/components/Share/Navbar";


import React from "react";


export default function PublicLayout({
  children,
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
