"use client";

import React from "react";
import { motion } from "framer-motion";
import { Target, ShieldCheck, Zap, Globe, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/context/LanguageContext"; // Added hook

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 }
};

const AboutPage = () => {
  const { t } = useLanguage();

  return (
    <div className="bg-background text-foreground overflow-x-hidden">
      
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[80vh] flex items-center py-24 border-b">
        <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
          <motion.div {...fadeIn}>
            <Badge variant="secondary" className="mb-6 px-4 py-1.5 rounded-full text-xs font-bold bg-primary/10 text-primary border-none">
              {t("about_hero_badge")}
            </Badge>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 leading-[1.05]">
              {t("about_hero_title")}
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed max-w-xl">
              {t("about_hero_desc")}
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative h-[500px] rounded-[2rem] overflow-hidden shadow-2xl"
          >
            <img 
              src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&q=80&w=1000" 
              alt="Tech" 
              className="object-cover w-full h-full"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8">
              <p className="text-white font-medium italic">"{t("about_quote")}"</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. CORE PILLARS */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: <Target />, title: t("about_pillar_1_title"), desc: t("about_pillar_1_desc") },
              { icon: <ShieldCheck />, title: t("about_pillar_2_title"), desc: t("about_pillar_2_desc") },
              { icon: <Zap />, title: t("about_pillar_3_title"), desc: t("about_pillar_3_desc") }
            ].map((item, i) => (
              <motion.div 
                key={i}
                {...fadeIn}
                transition={{ delay: i * 0.2 }}
                className="p-8 bg-card rounded-3xl border shadow-sm"
              >
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. JOURNEY (TIMELINE) */}
      <section className="py-24 overflow-hidden">
        <div className="container mx-auto px-6 text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">{t("about_journey_title")}</h2>
          <p className="text-muted-foreground">{t("about_journey_subtitle")}</p>
        </div>
        <div className="container mx-auto px-6 grid md:grid-cols-4 gap-4">
           {/* You can add specific translation keys for years/titles if needed, but using fixed ones for this example */}
           <TimelineStep year="2024" title="The Spark" desc="London foundation." />
           <TimelineStep year="2025" title="Series A" desc="$50M Infrastructure build." active />
           <TimelineStep year="2026" title="Global Reach" desc="45+ Countries." />
           <TimelineStep year="Future" title="Unity" desc="Borderless protocols." />
        </div>
      </section>

      {/* 4. IMPACT */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="bg-primary rounded-[3.5rem] p-12 lg:p-24 overflow-hidden relative"
          >
            <div className="relative z-10 grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-4xl md:text-6xl font-bold text-primary-foreground mb-8">
                  {t("about_impact_title")}
                </h2>
                <div className="grid grid-cols-2 gap-6">
                  <StatBox label={t("about_stat_users")} value="1.2M" />
                  <StatBox label={t("about_stat_countries")} value="45+" />
                  <StatBox label={t("about_stat_api")} value="1B+" />
                  <StatBox label={t("about_stat_uptime")} value="99.9%" />
                </div>
              </div>
              <div className="hidden lg:block relative">
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
                >
                  <Globe className="w-96 h-96 text-white/20 stroke-[1px]" />
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 5. LEADERSHIP */}
      <section className="py-24 bg-muted/20">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div className="max-w-xl">
              <h2 className="text-4xl font-bold mb-4">{t("about_team_title")}</h2>
              <p className="text-muted-foreground">{t("about_team_subtitle")}</p>
            </div>
            <Button variant="outline" className="rounded-full">{t("about_team_btn")}</Button>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            <TeamMember name="Sarah Chen" role="CEO" img="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400" />
            <TeamMember name="Marcus Thorne" role="CTO" img="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400" />
            <TeamMember name="Elena Rodriguez" role="Design" img="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400" />
            <TeamMember name="Julian Vole" role="Engineering" img="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400" />
          </div>
        </div>
      </section>

      {/* 6. CALL TO ACTION */}
      <section className="py-32 relative overflow-hidden">
        <div className="container mx-auto px-6 text-center">
          <motion.div {...fadeIn}>
            <h2 className="text-4xl md:text-6xl font-bold mb-8">{t("about_cta_title")}</h2>
            <p className="text-muted-foreground mb-12 max-w-2xl mx-auto text-lg">
              {t("about_cta_desc")}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" className="rounded-full px-10 h-14 text-lg">
                {t("about_cta_btn_start")} <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              {/* <Button size="lg" variant="outline" className="rounded-full px-10 h-14 text-lg">
                {t("about_cta_btn_sales")}
              </Button> */}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

/* --- Helper Components (Internal) --- */

const StatBox = ({ label, value }) => (
  <div className="bg-white/10 backdrop-blur-lg border border-white/20 p-6 rounded-3xl text-primary-foreground">
    <p className="text-4xl font-extrabold mb-1 tracking-tighter">{value}</p>
    <p className="text-xs uppercase font-bold tracking-widest opacity-80">{label}</p>
  </div>
);

const TimelineStep = ({ year, title, desc, active = false }) => (
  <motion.div 
    {...fadeIn}
    className={`p-6 rounded-3xl border transition-all ${active ? 'bg-primary text-primary-foreground shadow-xl scale-105 z-10' : 'bg-card'}`}
  >
    <span className="text-sm font-bold opacity-60">{year}</span>
    <h4 className="text-xl font-bold mt-2 mb-3">{title}</h4>
    <p className={`text-xs leading-relaxed ${active ? 'text-primary-foreground/80' : 'text-muted-foreground'}`}>{desc}</p>
  </motion.div>
);

const TeamMember = ({ name, role, img }) => (
  <motion.div 
    whileHover={{ y: -10 }}
    className="group relative rounded-[2.5rem] overflow-hidden border bg-card"
  >
    <img src={img} alt={name} className="w-full h-[300px] object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
    <div className="p-6">
      <h4 className="font-bold text-lg">{name}</h4>
      <p className="text-sm text-muted-foreground">{role}</p>
    </div>
  </motion.div>
);

export default AboutPage;