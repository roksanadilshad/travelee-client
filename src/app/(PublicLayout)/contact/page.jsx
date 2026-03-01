"use client";

import React from 'react';
import { MdOutlineEmail, MdLocationPin } from "react-icons/md";
import { FaPhone, FaLinkedin, FaTwitter } from "react-icons/fa6";
import { Globe, Headphones, Users, Send } from "lucide-react"; 
import { Button } from "@/components/ui/button";
import { useAuth } from '@/hooks/useAuth';
import { useLanguage } from "@/context/LanguageContext";

const ContactPage = () => {
  const { user } = useAuth();
  const { t } = useLanguage();

  return (
    <div className="w-full bg-white text-slate-900">
      {/* 1. HERO SECTION */}
      <section className="w-full py-20 bg-slate-50 border-b">
        <div className="container mx-auto px-4 text-center">
          {/* Flat keys used here */}
          <h1 className="text-4xl md:text-6xl font-black mb-4">{t("contact_hero_title")}</h1>
          <p className="text-slate-600 max-w-2xl mx-auto">{t("contact_hero_subtitle")}</p>
        </div>
      </section>

      {/* 2. MAIN CONTACT BOX */}
      <section className="w-full py-16 px-4">
        <div className="max-w-6xl mx-auto bg-white border rounded-[2rem] shadow-2xl overflow-hidden flex flex-col md:flex-row min-h-[600px]">
          
          {/* LEFT SIDE: Info */}
          <div className="w-full md:w-2/5 bg-[#0f172a] p-10 text-white flex flex-col justify-between">
            <div className="space-y-8">
              <h3 className="text-2xl font-bold">{t("contact_info_title")}</h3>
              <div className="space-y-6">
                <ContactInfoItem 
                  icon={<MdOutlineEmail />} 
                  label={t("contact_email_label")} 
                  value="support@travelee.com" 
                />
                <ContactInfoItem 
                  icon={<FaPhone />} 
                  label={t("contact_phone_label")} 
                  value="+880 1234 567 890" 
                />
                <ContactInfoItem 
                  icon={<MdLocationPin />} 
                  label={t("contact_location_label")} 
                  value={t("contact_location_value")} 
                />
              </div>
            </div>
            <div className="flex gap-4 pt-10 border-t border-slate-800">
              <FaLinkedin className="text-xl hover:text-accent cursor-pointer transition-colors" />
              <FaTwitter className="text-xl hover:text-accent cursor-pointer transition-colors" />
            </div>
          </div>

          {/* RIGHT SIDE: Form */}
          <div className="w-full md:w-3/5 p-10 bg-white min-w-0">
            <h3 className="text-2xl font-bold mb-8 text-slate-800">{t("contact_form_title")}</h3>
            <form className="w-full space-y-6 flex flex-col">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold uppercase text-slate-500">{t("contact_label_name")}</label>
                  <input 
                    type="text" 
                    defaultValue={user?.displayName || user?.name || ""} 
                    className="w-full p-4 bg-slate-50 border rounded-xl outline-none focus:border-primary transition-all" 
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold uppercase text-slate-500">{t("contact_label_email")}</label>
                  <input 
                    type="email" 
                    defaultValue={user?.email || ""} 
                    className="w-full p-4 bg-slate-50 border rounded-xl outline-none focus:border-primary transition-all" 
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold uppercase text-slate-500">{t("contact_label_message")}</label>
                <textarea 
                  rows="5" 
                  className="w-full p-4 bg-slate-50 border rounded-xl outline-none focus:border-primary transition-all" 
                  placeholder={t("contact_placeholder_message")}
                ></textarea>
              </div>
              <Button className="w-full h-14 bg-primary hover:bg-green-600 text-white font-bold rounded-xl text-lg shadow-lg hover:shadow-xl transition-all">
                {t("contact_btn_send")}
              </Button>
            </form>
          </div>
        </div>
      </section>

      {/* 3. WEEKLY INTEL SECTION */}
      <section className="w-full py-20 bg-primary/5">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-bold text-sm mb-6">
            <Send size={16} /> {t("contact_weekly_intel")}
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900">{t("contact_newsletter_desc")}</h2>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
             <input 
                type="email" 
                placeholder={t("contact_label_email")} 
                className="flex-1 p-4 border rounded-xl outline-none focus:border-primary"
             />
             <Button className="bg-[#0f172a] hover:bg-slate-800 text-white px-8 h-14 rounded-xl font-bold transition-colors">
                Subscribe
             </Button>
          </div>
        </div>
      </section>

      {/* 4. MAP SECTION */}
      <section className="w-full py-20 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">{t("contact_location_label")}</h2>
          <div className="w-full aspect-video bg-slate-200 rounded-[2rem] relative overflow-hidden shadow-2xl border-4 border-white">
            {/* DIRECTIONS: 
                1. Go to Google Maps (maps.google.com).
                2. Search for your specific address.
                3. Click "Share" -> "Embed a map".
                4. Copy the URL inside the 'src' attribute and paste it below.
            */}
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.90226456079!2d90.3905068!3d23.7508688!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b89793f77341%3A0x696048d087b3226a!2sDhaka!5e0!3m2!1sen!2sbd!4v1710000000000!5m2!1sen!2sbd"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Business Location"
              className="grayscale-[20%] contrast-[1.1] hover:grayscale-0 transition-all duration-500"
            ></iframe>
            
            {/* Status Overlay */}
            <div className="absolute bottom-6 left-6 z-10 bg-white/90 backdrop-blur px-6 py-3 rounded-full font-bold shadow-xl flex items-center gap-3 border border-white/50">
              <Globe className="text-primary animate-spin" style={{ animationDuration: '8s' }} /> 
              <span className="text-sm text-slate-800">Live Location Active</span>
            </div>
          </div>
        </div>
      </section>

      {/* 5. SUPPORT TIERS */}
      <section className="w-full py-20">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-8">
           <SupportCard 
              icon={<Headphones size={40} className="text-orange-500" />} 
              title={t("contact_support_live")} 
              desc={t("contact_support_live_desc")}
              bgColor="bg-orange-50"
           />
           <SupportCard 
              icon={<Users size={40} className="text-blue-500" />} 
              title={t("contact_support_partner")} 
              desc={t("contact_support_partner_desc")}
              bgColor="bg-blue-50"
           />
        </div>
      </section>
    </div>
  );
};

const ContactInfoItem = ({ icon, label, value }) => (
  <div className="flex gap-4 items-start group">
    <div className="text-2xl text-primary transition-transform group-hover:scale-110">{icon}</div>
    <div><p className="font-bold">{label}</p><p className="text-slate-400">{value}</p></div>
  </div>
);

const SupportCard = ({ icon, title, desc, bgColor }) => (
  <div className={`p-10 border rounded-[2rem] ${bgColor} flex items-start gap-6 hover:shadow-md transition-all`}>
    <div className="shrink-0">{icon}</div>
    <div>
      <h4 className="font-bold text-xl mb-2">{title}</h4>
      <p className="text-slate-600">{desc}</p>
    </div>
  </div>
);

export default ContactPage;