"use client"; // Next.js App router-e client component dorkar hole eta top-e din

import React from "react";
  // File name check kore 'b' small ba capital thik korun
import Footer from "@/components/Share/Footer";
import Navbar from "@/components/Share/Navbar";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Chatbot from "@/components/chatbot";

export default function PublicLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen relative">
      <Navbar />
      
      <main className="flex-1">
        {children}
      </main>
      
      <Footer />

      {/* Floating Chatbot */}
      <div className="fixed bottom-6 right-6 z-999">
        <Chatbot />
      </div>

      <ToastContainer position="top-right" />
    </div>
  );
}