import React from "react";
import Link from "next/link";
import { ArrowRight, BriefcaseBusiness, Clock3, Globe2, Sparkles, Users } from "lucide-react";

const focusAreas = [
  {
    title: "AI Trip Intelligence",
    description:
      "Build smarter planning systems that personalize destinations, budgeting, and timing for each traveler.",
    icon: Sparkles,
  },
  {
    title: "Collaborative Planning",
    description:
      "Design real-time group travel tools so families and friends can plan together without chaos.",
    icon: Users,
  },
  {
    title: "Global Destination Layer",
    description:
      "Expand trusted destination data, experiences, and routing coverage for travelers worldwide.",
    icon: Globe2,
  },
];

const openings = [
  {
    title: "Senior Frontend Engineer (Next.js)",
    team: "Product Engineering",
    location: "Remote / Dhaka",
    type: "Full-time",
    experience: "3+ years",
    href: "/contact",
  },
  {
    title: "Backend Engineer (Node.js, APIs)",
    team: "Platform",
    location: "Remote / Hybrid",
    type: "Full-time",
    experience: "3+ years",
    href: "/contact",
  },
  {
    title: "Product Designer (Travel UX)",
    team: "Design",
    location: "Remote",
    type: "Full-time",
    experience: "2+ years",
    href: "/contact",
  },
  {
    title: "Growth & Partnerships Specialist",
    team: "Business",
    location: "Remote / Field",
    type: "Full-time",
    experience: "2+ years",
    href: "/contact",
  },
];

const benefits = [
  "Flexible work culture with async collaboration",
  "Learning budget for courses and conferences",
  "Performance bonus and meaningful equity potential",
  "Direct ownership of product outcomes",
];

const hiringProcess = [
  "Intro call to understand fit and motivation",
  "Role-focused technical or portfolio review",
  "Team conversation on collaboration and impact",
  "Final discussion and offer",
];

const Careers = () => {
  return (
    <div className="bg-slate-950 text-white">
      <section className="relative overflow-hidden border-b border-slate-800">
        <div className="absolute -top-16 -right-16 h-72 w-72 rounded-full bg-[#0EA5A4]/20 blur-[110px]" />
        <div className="container mx-auto px-6 py-24 md:py-32">
          <div className="max-w-4xl">
            <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#0EA5A4]/40 bg-[#0EA5A4]/10 px-4 py-1 text-[11px] font-black uppercase tracking-[0.25em] text-[#5EEAD4]">
              Careers At Travelee
            </p>
            <h1 className="text-4xl font-black uppercase tracking-tight md:text-6xl">
              Help us build the operating system for smarter travel
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-slate-300 md:text-lg">
              Travelee is creating an intelligent travel platform where people can discover destinations,
              plan itineraries, estimate budgets, and collaborate in real time. Join us to shape how modern
              trips are planned.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="#open-roles"
                className="inline-flex items-center gap-2 rounded-2xl bg-[#0EA5A4] px-6 py-3 text-xs font-black uppercase tracking-[0.2em] text-slate-950 transition hover:bg-[#2DD4BF]"
              >
                See Open Roles <ArrowRight size={16} />
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 rounded-2xl border border-slate-700 px-6 py-3 text-xs font-black uppercase tracking-[0.2em] text-slate-200 transition hover:border-slate-500 hover:bg-slate-900"
              >
                Learn About Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-6 py-20">
        <div className="mb-10 flex items-center gap-3">
          <div className="h-2 w-2 rounded-full bg-[#0EA5A4]" />
          <h2 className="text-xl font-black uppercase tracking-[0.25em] text-slate-300 md:text-2xl">
            What You Will Work On
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {focusAreas.map((item) => {
            const Icon = item.icon;
            return (
              <article key={item.title} className="rounded-3xl border border-slate-800 bg-slate-900/50 p-7">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#0EA5A4]/10 text-[#5EEAD4]">
                  <Icon size={22} />
                </div>
                <h3 className="text-lg font-black tracking-tight">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-400">{item.description}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section id="open-roles" className="container mx-auto px-6 pb-16">
        <div className="mb-8 flex items-center justify-between gap-4">
          <h2 className="text-2xl font-black uppercase tracking-tight md:text-4xl">Open Positions</h2>
          <div className="hidden items-center gap-2 rounded-full border border-slate-700 px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-300 md:flex">
            <BriefcaseBusiness size={14} /> Apply via contact
          </div>
        </div>

        <div className="space-y-4">
          {openings.map((job) => (
            <article
              key={job.title}
              className="rounded-3xl border border-slate-800 bg-slate-900/40 p-6 transition hover:border-[#0EA5A4]/60"
            >
              <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
                <div>
                  <h3 className="text-xl font-black tracking-tight">{job.title}</h3>
                  <p className="mt-1 text-sm text-slate-400">{job.team}</p>
                  <div className="mt-4 flex flex-wrap gap-2 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-300">
                    <span className="rounded-full border border-slate-700 px-3 py-1">{job.location}</span>
                    <span className="rounded-full border border-slate-700 px-3 py-1">{job.type}</span>
                    <span className="rounded-full border border-slate-700 px-3 py-1">{job.experience}</span>
                  </div>
                </div>

                <Link
                  href={job.href}
                  className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2 text-xs font-black uppercase tracking-[0.15em] text-slate-950 transition hover:bg-[#0EA5A4] hover:text-white"
                >
                  Apply Now <ArrowRight size={14} />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="container mx-auto grid gap-8 px-6 pb-24 md:grid-cols-2">
        <article className="rounded-[2rem] border border-slate-800 bg-slate-900/50 p-8">
          <h3 className="text-xl font-black uppercase tracking-tight">Why Join Travelee</h3>
          <ul className="mt-5 space-y-3">
            {benefits.map((item) => (
              <li key={item} className="text-sm text-slate-300">
                • {item}
              </li>
            ))}
          </ul>
        </article>

        <article className="rounded-[2rem] border border-slate-800 bg-slate-900/50 p-8">
          <h3 className="text-xl font-black uppercase tracking-tight">Hiring Process</h3>
          <ol className="mt-5 space-y-3">
            {hiringProcess.map((step, idx) => (
              <li key={step} className="flex items-start gap-3 text-sm text-slate-300">
                <span className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#0EA5A4]/20 text-[11px] font-black text-[#5EEAD4]">
                  {idx + 1}
                </span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </article>
      </section>

      <section className="border-t border-slate-800 bg-slate-900/40">
        <div className="container mx-auto px-6 py-12 md:flex md:items-center md:justify-between">
          <div>
            <p className="text-[11px] font-black uppercase tracking-[0.25em] text-[#5EEAD4]">Not seeing your role?</p>
            <h3 className="mt-2 text-2xl font-black uppercase tracking-tight md:text-3xl">Send us your profile anyway</h3>
          </div>
          <Link
            href="/contact"
            className="mt-6 inline-flex items-center gap-2 rounded-2xl border border-[#0EA5A4]/50 px-6 py-3 text-xs font-black uppercase tracking-[0.2em] text-[#5EEAD4] transition hover:bg-[#0EA5A4] hover:text-slate-950 md:mt-0"
          >
            Contact Hiring Team <Clock3 size={15} />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Careers;
