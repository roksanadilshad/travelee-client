import Link from "next/link";
import { ArrowRight, BookOpenCheck, Code2, KeyRound, Server, ShieldCheck, Workflow } from "lucide-react";

const apiModules = [
  {
    name: "Destination APIs",
    description: "Access destination metadata, discovery tags, and region-aware planning signals for travel apps.",
  },
  {
    name: "Itinerary APIs",
    description: "Create, update, and retrieve structured day-by-day itineraries for solo and group users.",
  },
  {
    name: "Budget APIs",
    description: "Estimate travel costs by region, trip length, and planning profile with configurable ranges.",
  },
  {
    name: "Support APIs",
    description: "Integrate help-center and policy references for in-app support and onboarding assistance.",
  },
];

const quickStart = [
  "Generate API credentials from your dashboard",
  "Authenticate requests with secure token headers",
  "Call test endpoints in sandbox mode",
  "Validate responses and map error codes",
  "Move to production keys after verification",
];

const standards = [
  "RESTful JSON response patterns",
  "Versioned endpoint strategy for compatibility",
  "Rate limit and retry policy guidelines",
  "Secure authentication and key rotation support",
  "Monitoring-ready status and health checks",
];

const ApiRoomPage = () => {
  return (
    <div className="bg-slate-950 pt-20 text-white">
      <section className="relative overflow-hidden border-b border-slate-800">
        <div className="absolute -top-16 -right-16 h-72 w-72 rounded-full bg-[#0EA5A4]/20 blur-[120px]" />
        <div className="container mx-auto px-6 py-14 md:py-20">
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#0EA5A4]/40 bg-[#0EA5A4]/10 px-4 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-[#5EEAD4]">
            <Code2 size={12} /> API Room
          </p>
          <h1 className="max-w-4xl text-4xl font-black uppercase tracking-tight md:text-6xl">
            Developer access for modern travel experiences
          </h1>
          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-slate-300 md:text-base">
            Integrate Travelee planning intelligence into your platform with scalable APIs for destinations, itinerary
            workflows, and budget-aware travel logic.
          </p>
        </div>
      </section>

      <section className="container mx-auto grid gap-5 px-6 py-10 md:grid-cols-3">
        <article className="rounded-2xl border border-slate-800 bg-slate-900/50 p-5">
          <p className="inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-[0.14em] text-slate-400">
            <Server size={11} /> API Status
          </p>
          <p className="mt-2 text-2xl font-black text-white">Operational</p>
        </article>
        <article className="rounded-2xl border border-slate-800 bg-slate-900/50 p-5">
          <p className="inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-[0.14em] text-slate-400">
            <Workflow size={11} /> Integration Style
          </p>
          <p className="mt-2 text-2xl font-black text-white">REST + JSON</p>
        </article>
        <article className="rounded-2xl border border-slate-800 bg-slate-900/50 p-5">
          <p className="inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-[0.14em] text-slate-400">
            <ShieldCheck size={11} /> Auth
          </p>
          <p className="mt-2 text-2xl font-black text-white">Token-Based</p>
        </article>
      </section>

      <section className="container mx-auto grid gap-6 px-6 pb-14 lg:grid-cols-2">
        <article className="rounded-3xl border border-slate-800 bg-slate-900/40 p-6">
          <h2 className="text-2xl font-black uppercase tracking-tight md:text-3xl">Available API Modules</h2>
          <div className="mt-4 space-y-3">
            {apiModules.map((module) => (
              <div key={module.name} className="rounded-2xl border border-slate-800 bg-slate-950/40 p-4">
                <h3 className="text-sm font-black uppercase tracking-[0.12em] text-slate-100">{module.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">{module.description}</p>
              </div>
            ))}
          </div>
        </article>

        <div className="space-y-6">
          <article className="rounded-3xl border border-slate-800 bg-slate-900/40 p-6">
            <h2 className="inline-flex items-center gap-2 text-xl font-black uppercase tracking-tight">
              <BookOpenCheck size={17} className="text-[#5EEAD4]" /> Quick Start
            </h2>
            <ul className="mt-4 space-y-2">
              {quickStart.map((item) => (
                <li key={item} className="text-sm text-slate-300">
                  • {item}
                </li>
              ))}
            </ul>
          </article>

          <article className="rounded-3xl border border-slate-800 bg-slate-900/40 p-6">
            <h2 className="inline-flex items-center gap-2 text-xl font-black uppercase tracking-tight">
              <KeyRound size={17} className="text-[#5EEAD4]" /> API Standards
            </h2>
            <ul className="mt-4 space-y-2">
              {standards.map((item) => (
                <li key={item} className="text-sm text-slate-300">
                  • {item}
                </li>
              ))}
            </ul>
          </article>
        </div>
      </section>

      <section className="border-t border-slate-800 bg-slate-900/40">
        <div className="container mx-auto px-6 py-12 md:flex md:items-center md:justify-between">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#5EEAD4]">Need integration support?</p>
            <h3 className="mt-2 text-2xl font-black uppercase tracking-tight md:text-3xl">
              Talk to our developer support team
            </h3>
          </div>
          <Link
            href="/contact"
            className="mt-5 inline-flex items-center gap-2 rounded-2xl bg-[#0EA5A4] px-6 py-3 text-xs font-black uppercase tracking-[0.16em] text-slate-950 transition hover:bg-[#2DD4BF] md:mt-0"
          >
            Contact API Team <ArrowRight size={13} />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default ApiRoomPage;

