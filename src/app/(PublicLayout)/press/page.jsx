import Link from "next/link";
import { ArrowRight, CalendarDays, Globe2, Newspaper, Radio, Users2 } from "lucide-react";

const pressReleases = [
  {
    title: "Travelee Launches Smart Regional Planning Guides",
    date: "March 2026",
    summary:
      "Travelee introduced regional destination pages with structured country lists, seasonal guidance, and budget-ready planning signals.",
  },
  {
    title: "New Help Center and Privacy Experience Goes Live",
    date: "February 2026",
    summary:
      "A redesigned support and privacy system now provides faster issue resolution paths and clearer policy communication.",
  },
  {
    title: "Travel Journal Expansion for Practical Planning Content",
    date: "January 2026",
    summary:
      "The Travelee Blog now includes deeper editorial tracks on budget systems, destination intelligence, and group trip coordination.",
  },
];

const mediaResources = [
  "Company overview and mission summary",
  "Official logo usage package",
  "Product screenshots and UI previews",
  "Founder and leadership profile notes",
  "Press contact and response SLA details",
];

const PressPage = () => {
  return (
    <div className="bg-slate-950 pt-20 text-white">
      <section className="relative overflow-hidden border-b border-slate-800">
        <div className="absolute -top-16 -right-16 h-72 w-72 rounded-full bg-[#0EA5A4]/20 blur-[120px]" />
        <div className="container mx-auto px-6 py-14 md:py-20">
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#0EA5A4]/40 bg-[#0EA5A4]/10 px-4 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-[#5EEAD4]">
            <Newspaper size={12} /> Press Room
          </p>
          <h1 className="max-w-4xl text-4xl font-black uppercase tracking-tight md:text-6xl">
            Travelee Press and Media Information
          </h1>
          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-slate-300 md:text-base">
            Access official announcements, product updates, and media-ready information about Travelee. For interviews,
            coverage requests, and partnership media inquiries, contact our press team directly.
          </p>
        </div>
      </section>

      <section className="container mx-auto grid gap-5 px-6 py-10 md:grid-cols-3">
        <article className="rounded-2xl border border-slate-800 bg-slate-900/50 p-5">
          <p className="text-[10px] font-black uppercase tracking-[0.14em] text-slate-400">Coverage Markets</p>
          <p className="mt-2 text-2xl font-black text-white">Global</p>
        </article>
        <article className="rounded-2xl border border-slate-800 bg-slate-900/50 p-5">
          <p className="inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-[0.14em] text-slate-400">
            <Users2 size={11} /> Audience Focus
          </p>
          <p className="mt-2 text-2xl font-black text-white">Travel Planners</p>
        </article>
        <article className="rounded-2xl border border-slate-800 bg-slate-900/50 p-5">
          <p className="inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-[0.14em] text-slate-400">
            <Globe2 size={11} /> Update Frequency
          </p>
          <p className="mt-2 text-2xl font-black text-white">Monthly</p>
        </article>
      </section>

      <section className="container mx-auto grid gap-6 px-6 pb-14 lg:grid-cols-3">
        <article className="rounded-3xl border border-slate-800 bg-slate-900/40 p-6 lg:col-span-2">
          <h2 className="text-2xl font-black uppercase tracking-tight md:text-3xl">Recent Announcements</h2>
          <div className="mt-5 space-y-4">
            {pressReleases.map((item) => (
              <div key={item.title} className="rounded-2xl border border-slate-800 bg-slate-950/40 p-4">
                <p className="inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-[0.14em] text-[#5EEAD4]">
                  <CalendarDays size={11} /> {item.date}
                </p>
                <h3 className="mt-2 text-lg font-black tracking-tight text-slate-100">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">{item.summary}</p>
              </div>
            ))}
          </div>
        </article>

        <article className="rounded-3xl border border-slate-800 bg-slate-900/40 p-6">
          <h2 className="inline-flex items-center gap-2 text-xl font-black uppercase tracking-tight">
            <Radio size={17} className="text-[#5EEAD4]" /> Media Kit Includes
          </h2>
          <ul className="mt-4 space-y-2">
            {mediaResources.map((item) => (
              <li key={item} className="text-sm text-slate-300">
                • {item}
              </li>
            ))}
          </ul>
        </article>
      </section>

      <section className="border-t border-slate-800 bg-slate-900/40">
        <div className="container mx-auto px-6 py-12 md:flex md:items-center md:justify-between">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#5EEAD4]">Press Contact</p>
            <h3 className="mt-2 text-2xl font-black uppercase tracking-tight md:text-3xl">
              Request media support from Travelee
            </h3>
          </div>
          <Link
            href="/contact"
            className="mt-5 inline-flex items-center gap-2 rounded-2xl bg-[#0EA5A4] px-6 py-3 text-xs font-black uppercase tracking-[0.16em] text-slate-950 transition hover:bg-[#2DD4BF] md:mt-0"
          >
            Contact Press Team <ArrowRight size={13} />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default PressPage;

