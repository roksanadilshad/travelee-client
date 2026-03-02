import React from "react";
import Link from "next/link";
import {
  AlertTriangle,
  ArrowRight,
  Backpack,
  CalendarDays,
  CheckCircle2,
  Compass,
  CreditCard,
  Globe2,
  MapPinned,
  PlaneTakeoff,
  ShieldCheck,
  Timer,
} from "lucide-react";

const tripFramework = [
  {
    title: "1) Define Trip Goal",
    description:
      "Start with purpose: relaxation, food exploration, adventure, family time, or business extension. A clear goal helps you choose the right city, budget, and activity density.",
    icon: Compass,
  },
  {
    title: "2) Lock Budget Range",
    description:
      "Set a realistic range for flights, stays, local transport, meals, and entry tickets. Keep 15-20% emergency buffer so your plan stays stress-free.",
    icon: CreditCard,
  },
  {
    title: "3) Build Day-by-Day Plan",
    description:
      "Group places by neighborhood, keep travel time in mind, and avoid overbooking each day. A balanced plan gives better experience than an overloaded checklist.",
    icon: CalendarDays,
  },
  {
    title: "4) Prepare Documents & Safety",
    description:
      "Check visa rules, passport validity, insurance, local emergency numbers, and medical essentials. Keep digital and physical copies of critical docs.",
    icon: ShieldCheck,
  },
];

const destinationPlaybooks = [
  {
    region: "Southeast Asia",
    bestFor: "Budget trips, food tours, islands",
    timing: "Nov - Mar",
    highlights: "Bangkok, Bali, Ho Chi Minh City, Kuala Lumpur",
    tip: "Use night markets and local transport cards to reduce daily costs.",
  },
  {
    region: "Europe",
    bestFor: "Museums, architecture, rail travel",
    timing: "Apr - Jun, Sep - Oct",
    highlights: "Rome, Barcelona, Prague, Amsterdam",
    tip: "Book train passes early and choose city cards for attraction bundles.",
  },
  {
    region: "Middle East",
    bestFor: "Luxury stays, desert experiences, short city breaks",
    timing: "Oct - Mar",
    highlights: "Dubai, Abu Dhabi, Doha, Muscat",
    tip: "Prioritize indoor and evening activities during warmer days.",
  },
  {
    region: "Americas",
    bestFor: "Nature routes, road trips, mixed climates",
    timing: "Depends on country and season",
    highlights: "Mexico City, New York, Vancouver, Cusco",
    tip: "Check domestic transfer times carefully for wide-distance itineraries.",
  },
];

const budgetReference = [
  {
    profile: "Budget Explorer",
    stay: "$20 - $60/night",
    food: "$10 - $25/day",
    transport: "$5 - $20/day",
    notes: "Hostels, public transport, local food spots.",
  },
  {
    profile: "Balanced Traveler",
    stay: "$60 - $140/night",
    food: "$25 - $60/day",
    transport: "$15 - $40/day",
    notes: "3-star hotels, mixed dining, app cabs + metro.",
  },
  {
    profile: "Premium Comfort",
    stay: "$140 - $320/night",
    food: "$60 - $150/day",
    transport: "$40 - $120/day",
    notes: "4/5-star stays, private transfers, curated experiences.",
  },
];

const smartChecklist = [
  "Passport validity (at least 6 months) and visa status confirmed",
  "Flight baggage rules, transit policy, and terminal details checked",
  "Hotel address saved offline with check-in/check-out notes",
  "Local SIM/eSIM plan ready for maps and emergency contact",
  "Payment mix prepared: card + local cash + backup card",
  "Essential medicine, adapters, and weather-based outfit packed",
  "Share itinerary with family/friends and keep emergency contacts",
  "Travel insurance activated with policy number accessible",
];

const safetyNotes = [
  {
    title: "Avoid First-Day Overload",
    detail:
      "After landing, keep the first day light. Fatigue and navigation confusion are common causes of avoidable mistakes.",
  },
  {
    title: "Protect Money In Layers",
    detail:
      "Carry only daily spend cash, keep backup card separate, and enable app notifications for every transaction.",
  },
  {
    title: "Use Verified Transport",
    detail:
      "Prefer licensed taxis, ride apps, or official metro/bus lines. Save your accommodation route in offline maps.",
  },
  {
    title: "Keep Local Emergency Info",
    detail:
      "Save embassy contact, local emergency numbers, and nearest hospital locations before starting daily activities.",
  },
];

const faqs = [
  {
    question: "How many days are ideal for an international city trip?",
    answer:
      "For first-time visits, 4-6 days is usually the best range. It gives enough time for key attractions, one flexible day, and local exploration without rushing.",
  },
  {
    question: "What is the best way to avoid overspending?",
    answer:
      "Lock a daily spending cap, pre-book major costs (flight, hotel, intercity transport), and track spending by category each evening.",
  },
  {
    question: "Should I plan every hour of the trip?",
    answer:
      "No. Keep 70% structured and 30% flexible. This balance protects your must-do experiences while allowing spontaneous discoveries.",
  },
  {
    question: "What should I prioritize when traveling with family?",
    answer:
      "Choose fewer locations, shorter transfer times, and child/senior-friendly timing. Comfort and pacing should be prioritized over attraction count.",
  },
];

const TravelGuides = () => {
  return (
    <div className="bg-slate-950 text-white pt-20">
      <section className="container mx-auto px-6 py-16">
        <div className="mb-8 flex items-center gap-3">
          <PlaneTakeoff className="text-[#5EEAD4]" size={20} />
          <h2 className="text-2xl font-black uppercase tracking-tight md:text-4xl">Travel Planning Framework</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {tripFramework.map((item) => {
            const Icon = item.icon;
            return (
              <article key={item.title} className="rounded-3xl border border-slate-800 bg-slate-900/40 p-7">
                <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#0EA5A4]/15 text-[#5EEAD4]">
                  <Icon size={21} />
                </div>
                <h3 className="text-xl font-black tracking-tight">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-300 md:text-base">{item.description}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="container mx-auto px-6 pb-16">
        <div className="mb-8 flex items-center gap-3">
          <MapPinned className="text-[#5EEAD4]" size={20} />
          <h2 className="text-2xl font-black uppercase tracking-tight md:text-4xl">Regional Playbooks</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {destinationPlaybooks.map((item) => (
            <article key={item.region} className="rounded-3xl border border-slate-800 bg-slate-900/40 p-7">
              <p className="text-[11px] font-black uppercase tracking-[0.2em] text-[#5EEAD4]">{item.region}</p>
              <h3 className="mt-3 text-xl font-black tracking-tight">{item.bestFor}</h3>
              <p className="mt-3 text-sm text-slate-300">
                <span className="font-bold text-slate-100">Best Timing:</span> {item.timing}
              </p>
              <p className="mt-2 text-sm text-slate-300">
                <span className="font-bold text-slate-100">Suggested Cities:</span> {item.highlights}
              </p>
              <p className="mt-4 rounded-2xl border border-slate-800 bg-slate-950/60 p-4 text-sm leading-relaxed text-slate-300">
                <span className="font-bold text-slate-100">Pro Tip:</span> {item.tip}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="container mx-auto px-6 pb-16">
        <div className="mb-8 flex items-center gap-3">
          <CreditCard className="text-[#5EEAD4]" size={20} />
          <h2 className="text-2xl font-black uppercase tracking-tight md:text-4xl">Budget Reference (Daily)</h2>
        </div>
        <div className="overflow-x-auto rounded-3xl border border-slate-800">
          <table className="min-w-full bg-slate-900/40 text-left">
            <thead className="bg-slate-900">
              <tr>
                <th className="px-6 py-4 text-xs font-black uppercase tracking-[0.16em] text-slate-300">Profile</th>
                <th className="px-6 py-4 text-xs font-black uppercase tracking-[0.16em] text-slate-300">Stay</th>
                <th className="px-6 py-4 text-xs font-black uppercase tracking-[0.16em] text-slate-300">Food</th>
                <th className="px-6 py-4 text-xs font-black uppercase tracking-[0.16em] text-slate-300">Transport</th>
                <th className="px-6 py-4 text-xs font-black uppercase tracking-[0.16em] text-slate-300">Notes</th>
              </tr>
            </thead>
            <tbody>
              {budgetReference.map((item) => (
                <tr key={item.profile} className="border-t border-slate-800">
                  <td className="px-6 py-4 text-sm font-bold text-slate-100">{item.profile}</td>
                  <td className="px-6 py-4 text-sm text-slate-300">{item.stay}</td>
                  <td className="px-6 py-4 text-sm text-slate-300">{item.food}</td>
                  <td className="px-6 py-4 text-sm text-slate-300">{item.transport}</td>
                  <td className="px-6 py-4 text-sm text-slate-300">{item.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="container mx-auto grid gap-6 px-6 pb-16 lg:grid-cols-2">
        <article className="rounded-3xl border border-slate-800 bg-slate-900/40 p-7">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-[#0EA5A4]/10 px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-[#5EEAD4]">
            <Backpack size={13} /> Smart Checklist
          </div>
          <ul className="space-y-3">
            {smartChecklist.map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm text-slate-300">
                <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-[#5EEAD4]" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </article>

        <article className="rounded-3xl border border-slate-800 bg-slate-900/40 p-7">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-amber-500/10 px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-amber-300">
            <AlertTriangle size={13} /> Safety Notes
          </div>
          <div className="space-y-4">
            {safetyNotes.map((item) => (
              <div key={item.title} className="rounded-2xl border border-slate-800 bg-slate-950/50 p-4">
                <h4 className="text-sm font-black uppercase tracking-[0.12em] text-slate-100">{item.title}</h4>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">{item.detail}</p>
              </div>
            ))}
          </div>
        </article>
      </section>

      <section className="container mx-auto px-6 pb-16">
        <div className="mb-8 flex items-center gap-3">
          <Timer className="text-[#5EEAD4]" size={20} />
          <h2 className="text-2xl font-black uppercase tracking-tight md:text-4xl">Frequently Asked Questions</h2>
        </div>
        <div className="space-y-4">
          {faqs.map((item) => (
            <details key={item.question} className="rounded-2xl border border-slate-800 bg-slate-900/40 p-5">
              <summary className="cursor-pointer list-none text-sm font-black uppercase tracking-[0.12em] text-slate-100">
                {item.question}
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-slate-300">{item.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="border-t border-slate-800 bg-slate-900/40">
        <div className="container mx-auto px-6 py-12 md:flex md:items-center md:justify-between">
          <div>
            <p className="text-[11px] font-black uppercase tracking-[0.24em] text-[#5EEAD4]">Need Tailored Support?</p>
            <h3 className="mt-2 text-2xl font-black uppercase tracking-tight md:text-3xl">
              Get help building your exact trip blueprint
            </h3>
          </div>
          <Link
            href="/contact"
            className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-[#0EA5A4] px-6 py-3 text-xs font-black uppercase tracking-[0.2em] text-slate-950 transition hover:bg-[#2DD4BF] md:mt-0"
          >
            Talk To Travel Team <ArrowRight size={15} />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default TravelGuides;
