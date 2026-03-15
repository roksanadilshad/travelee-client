"use client";

import React, { useState, useEffect, useCallback } from "react";
import { 
  Mail, MapPin, Phone, Calendar, Edit3, 
  ShieldCheck, Camera, Globe, Github, Twitter, Loader2, X 
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { jwtDecode } from "jwt-decode";
import Swal from "sweetalert2";  

const MyProfile = () => {
  const { session, token, update } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const [userData, setUserData] = useState(null);
  const [editName, setEditName] = useState("");
  const [editPhone, setEditPhone] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);

  const decodedToken = token ? jwtDecode(token) : null;
  const userId = decodedToken?.id || decodedToken?.userId;

  const fetchUserDetails = useCallback(async () => {
    if (!session?.user?.email) return;
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/email`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: session.user.email })
      });
      const result = await res.json();
      if (result.success) {
        setUserData(result.data);
        setEditName(result.data.fullName || "");
        setEditPhone(result.data.phone || "");
      }
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  }, [session?.user?.email]);

  useEffect(() => {
    fetchUserDetails();
  }, [fetchUserDetails]);

  const uploadToImageBB = async (file) => {
    const formData = new FormData();
    formData.append("image", file);
    const apiKey = process.env.NEXT_PUBLIC_API_IMAGEBB;
    try {
      const response = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      return data.data.url;
    } catch (error) {
      return userData?.image;
    }
  };

  const handleUpdate = async () => {
    if (!userId) return Swal.fire("Error", "User ID not found!", "error");
    setLoading(true);
    try {
      let imageUrl = userData?.image;
      if (selectedImage) imageUrl = await uploadToImageBB(selectedImage);

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/update-profile`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          userId: userId,
          fullName: editName,
          phone: editPhone,
          image: imageUrl
        }),
      });

      if (res.ok) {
        await update(); 
        await fetchUserDetails();
        Swal.fire("Success!", "Profile Updated Successfully!", "success");
        setIsModalOpen(false);
      } else {
        Swal.fire("Failed!", "Update Failed!", "error");
      }
    } catch (err) {
      Swal.fire("Error", "Network Error!", "error");
    } finally {
      setLoading(false);
    }
  };

  if (!session) return <div className="p-20 text-center font-bold">Loading Profile...</div>;

  return (
    <div className="max-w-6xl mx-auto pb-20 px-4 sm:px-6">
       
      <div className="relative mb-12">
        <div className="h-48 lg:h-64 rounded-[2rem] sm:rounded-[2.5rem] bg-gradient-to-r from-[#0A1D1A] to-[#1a3d38] overflow-hidden relative shadow-xl">
           <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
        </div>

        <div className="px-4 sm:px-8 lg:px-12 -mt-12 sm:-mt-16 flex flex-col sm:flex-row items-center sm:items-end gap-4 sm:gap-6 relative z-10 text-center sm:text-left">
          <div className="w-28 h-28 sm:w-32 sm:h-32 lg:w-40 lg:h-40 rounded-[2rem] sm:rounded-[2.5rem] border-[4px] sm:border-[6px] border-[#F4F7FE] bg-white shadow-2xl overflow-hidden">
             <img src={userData?.image || `https://ui-avatars.com/api/?name=${userData?.fullName}`} alt="profile" className="w-full h-full object-cover" />
          </div>

          <div className="flex-1 pb-0 sm:pb-2">
            <div className="flex flex-col sm:flex-row items-center sm:items-center gap-2 sm:gap-3">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900">{userData?.fullName}</h1>
              <span className="flex items-center gap-1 bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
                <ShieldCheck size={12} /> {userData?.role || "Explorer"}
              </span>
            </div>
            <p className="text-slate-400 font-medium mt-1 flex items-center justify-center sm:justify-start gap-2">
              <Globe size={14} /> Based in Bangladesh • Travel Enthusiast
            </p>
          </div>

          <div className="pb-2 w-full sm:w-auto">
            <button onClick={() => setIsModalOpen(true)} className="w-full sm:w-auto bg-[#0A1D1A] text-white px-6 sm:px-8 py-3 rounded-2xl font-bold hover:scale-[1.02] transition-all flex items-center justify-center gap-2">
               <Edit3 size={18} /> Edit Profile
            </button>
          </div>
        </div>
      </div>

      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
        <div className="space-y-6">
          <div className="bg-white p-6 sm:p-8 rounded-[2rem] shadow-sm border border-slate-50">
             <h3 className="font-black text-slate-900 mb-6 uppercase text-xs tracking-[0.2em]">Social Links</h3>
             <div className="space-y-4">
                <SocialLink icon={<Twitter size={18}/>} label="Twitter" handle="@madison_travels" />
                <SocialLink icon={<Github size={18}/>} label="Github" handle="madison_dev" />
             </div>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-6">
           <div className="bg-white p-6 sm:p-10 rounded-[2rem] sm:rounded-[2.5rem] shadow-sm border border-slate-50">
              <h3 className="font-black text-slate-900 mb-8 uppercase text-xs tracking-[0.2em]">Personal Information</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-y-8 lg:gap-x-12">
                 <InfoBlock icon={<Mail />} label="Email Address" value={userData?.email} />
                 <InfoBlock icon={<Phone />} label="Phone Number" value={userData?.phone || "Not Set"} />
                 <InfoBlock icon={<MapPin />} label="Location" value="Dhaka, Bangladesh" />
                 <InfoBlock icon={<Calendar />} label="Joined Date" value="March 2026" />
              </div>
           </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white p-6 sm:p-8 rounded-[2rem] sm:rounded-[2.5rem] w-full max-w-md shadow-2xl">
            <button onClick={() => setIsModalOpen(false)} className="float-right text-slate-400"><X /></button>
            <h3 className="text-xl font-black mb-6">Edit Profile</h3>
            <div className="space-y-4">
              <input type="file" onChange={(e) => setSelectedImage(e.target.files[0])} className="w-full p-3 border-2 border-dashed rounded-2xl" />
              <input value={editName} onChange={(e) => setEditName(e.target.value)} className="w-full p-4 bg-slate-50 rounded-2xl" placeholder="Full Name" />
              <input value={editPhone} onChange={(e) => setEditPhone(e.target.value)} className="w-full p-4 bg-slate-50 rounded-2xl" placeholder="Phone" />
            </div>
            <button onClick={handleUpdate} className="w-full mt-6 py-4 bg-emerald-600 text-white rounded-2xl font-bold flex justify-center">
              {loading ? <Loader2 className="animate-spin" /> : "Save Changes"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const InfoBlock = ({ icon, label, value }) => (
  <div className="flex gap-4">
    <div className="w-12 h-12 bg-[#F4F7FE] rounded-2xl flex items-center justify-center text-slate-400 flex-shrink-0">{React.cloneElement(icon, { size: 20 })}</div>
    <div>
       <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-1">{label}</p>
       <p className="text-slate-700 font-bold break-all">{value}</p>
    </div>
  </div>
);

const SocialLink = ({ icon, label, handle }) => (
  <div className="flex items-center justify-between p-4 rounded-2xl border border-slate-50 cursor-pointer group">
    <div className="flex items-center gap-3">
      <span className="text-slate-400 group-hover:text-emerald-500">{icon}</span>
      <div>
        <p className="text-[10px] font-black text-slate-300 uppercase">{label}</p>
        <p className="text-sm font-bold text-slate-700">{handle}</p>
      </div>
    </div>
  </div>
);

export default MyProfile;
