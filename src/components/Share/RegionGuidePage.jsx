import Link from "next/link";
import { ArrowRight, CalendarDays, Globe2, Wallet } from "lucide-react";

export default function RegionGuidePage({ data }) {
  return (
    <div className="bg-slate-950 pt-20 text-white">
      <section className="relative overflow-hidden border-b border-slate-800">
        <div className="absolute -right-16 -top-16 h-72 w-72 rounded-full bg-[#0EA5A4]/20 blur-[120px]" />
        <div className="container mx-auto px-6 py-14 md:py-20">
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#0EA5A4]/40 bg-[#0EA5A4]/10 px-4 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-[#5EEAD4]">
            <Globe2 size={12} /> Regional Guide
          </p>
          <h1 className="max-w-4xl text-4xl font-black uppercase tracking-tight md:text-6xl">{data.title}</h1>
          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-slate-300 md:text-base">{data.subtitle}</p>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <article className="rounded-2xl border border-slate-800 bg-slate-900/50 p-4">
              <p className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-400">Countries</p>
              <p className="mt-1 text-2xl font-black text-white">{data.countriesCount}+</p>
            </article>
            <article className="rounded-2xl border border-slate-800 bg-slate-900/50 p-4">
              <p className="inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-[0.15em] text-slate-400">
                <Wallet size={11} /> Avg Budget
              </p>
              <p className="mt-1 text-2xl font-black text-white">{data.avgBudget}</p>
            </article>
            <article className="rounded-2xl border border-slate-800 bg-slate-900/50 p-4">
              <p className="inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-[0.15em] text-slate-400">
                <CalendarDays size={11} /> Ideal Duration
              </p>
              <p className="mt-1 text-2xl font-black text-white">{data.idealDuration}</p>
            </article>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-6 py-12">
        <h2 className="mb-6 text-2xl font-black uppercase tracking-tight md:text-4xl">Country List</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {data.countries.map((country) => (
            <article key={country} className="rounded-xl border border-slate-800 bg-slate-900/40 px-4 py-3">
              <p className="text-sm font-bold text-slate-200">{country}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="container mx-auto grid gap-6 px-6 pb-16 lg:grid-cols-2">
        <article className="rounded-3xl border border-slate-800 bg-slate-900/40 p-6">
          <h3 className="text-xl font-black uppercase tracking-tight">Top Trip Highlights</h3>
          <ul className="mt-4 space-y-2">
            {data.highlights.map((item) => (
              <li key={item} className="text-sm text-slate-300">
                • {item}
              </li>
            ))}
          </ul>
        </article>

        <article className="rounded-3xl border border-slate-800 bg-slate-900/40 p-6">
          <h3 className="text-xl font-black uppercase tracking-tight">Best Time To Visit</h3>
          <ul className="mt-4 space-y-2">
            {data.bestTime.map((item) => (
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
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#5EEAD4]">Need a custom route?</p>
            <h3 className="mt-2 text-2xl font-black uppercase tracking-tight md:text-3xl">
              Build your trip with Travelee tools
            </h3>
          </div>
          <div className="mt-5 flex flex-wrap gap-3 md:mt-0">
            <Link
              href="/itinerary"
              className="inline-flex items-center gap-2 rounded-2xl bg-[#0EA5A4] px-6 py-3 text-xs font-black uppercase tracking-[0.16em] text-slate-950 transition hover:bg-[#2DD4BF]"
            >
              Build Itinerary <ArrowRight size={13} />
            </Link>
            <Link
              href="/travel-guides"
              className="inline-flex items-center gap-2 rounded-2xl border border-slate-700 px-6 py-3 text-xs font-black uppercase tracking-[0.16em] text-slate-200 transition hover:border-slate-500 hover:bg-slate-900"
            >
              Read Guides
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

