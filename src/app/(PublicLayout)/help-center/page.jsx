import React from "react";
import Link from "next/link";
import {
  ArrowRight,
  BadgeHelp,
  BookOpen,
  CreditCard,
  Globe2,
  LifeBuoy,
  Lock,
  MapPinned,
  Search,
  ShieldCheck,
  UserCircle2,
} from "lucide-react";

const quickActions = [
  {
    title: "Account & Login Issues",
    desc: "Password reset, account access, email verification, and sign-in problems.",
    href: "/login",
    icon: UserCircle2,
  },
  {
    title: "Trips & Itinerary Help",
    desc: "Create, edit, and organize itinerary plans with better day-by-day structure.",
    href: "/itinerary",
    icon: MapPinned,
  },
  {
    title: "Destination Discovery",
    desc: "Find destination-specific guides, filters, and travel insights in one place.",
    href: "/destinations",
    icon: Globe2,
  },
  {
    title: "Privacy & Security",
    desc: "Understand data usage, account safety, and privacy controls.",
    href: "/privacy",
    icon: Lock,
  },
];

const supportTopics = [
  {
    title: "Getting Started",
    points: ["How to set up your account", "How to search destinations", "How to create your first itinerary"],
    icon: BookOpen,
  },
  {
    title: "Planning & Budgeting",
    points: ["Trip budget estimation basics", "How to compare destination cost", "Avoiding overspending mistakes"],
    icon: CreditCard,
  },
  {
    title: "Safety & Documents",
    points: ["Passport and visa checklist", "Travel insurance essentials", "Emergency planning basics"],
    icon: ShieldCheck,
  },
];

const faqs = [
  {
    q: "How do I reset my password if I cannot log in?",
    a: "Use the Forgot Password option on the login page. If the reset email does not arrive, check spam and verify your email address.",
  },
  {
    q: "Can I plan a trip before finalizing my destination?",
    a: "Yes. You can draft a plan with estimated budget and trip duration, then adjust destination and activities later.",
  },
  {
    q: "How can I reduce trip planning confusion for group travel?",
    a: "Use a shared itinerary structure, assign planning roles, and finalize budget categories early before activity booking.",
  },
  {
    q: "Where can I find practical travel preparation guides?",
    a: "Visit Travel Guides and Blog sections for checklists, budget frameworks, and destination-specific planning tips.",
  },
];

const troubleshootingSteps = [
  {
    title: "Step 1: Identify the Issue Type",
    detail:
      "Confirm whether the problem is account-related, booking/planning-related, destination data-related, or payment-related.",
  },
  {
    title: "Step 2: Re-check Required Inputs",
    detail:
      "Verify email, password, travel dates, destination filters, and budget fields before retrying your action.",
  },
  {
    title: "Step 3: Retry with Stable Connection",
    detail:
      "Use a stable internet connection and refresh once. Many temporary loading problems are caused by unstable network.",
  },
  {
    title: "Step 4: Contact Support with Context",
    detail:
      "Share screenshots, route/page URL, and steps you tried so support can resolve your issue faster.",
  },
];

const supportTimelines = [
  { channel: "General Help", firstReply: "Within 24 hours", resolution: "1-3 business days" },
  { channel: "Account Access Issues", firstReply: "Within 12 hours", resolution: "Within 24 hours" },
  { channel: "Security & Privacy Cases", firstReply: "Within 8 hours", resolution: "Priority handling" },
  { channel: "Partnership / Business Queries", firstReply: "Within 48 hours", resolution: "2-5 business days" },
];

const resources = [
  {
    title: "Travel Guides",
    desc: "Planning frameworks, checklists, and destination prep resources.",
    href: "/travel-guides",
  },
  {
    title: "Blog Knowledge Base",
    desc: "Detailed articles on itinerary logic, budgeting, and travel strategy.",
    href: "/blog",
  },
  {
    title: "Privacy Information",
    desc: "How your data is handled, stored, and protected across the platform.",
    href: "/privacy",
  },
  {
    title: "Contact Team",
    desc: "Escalate complex issues directly to support with full details.",
    href: "/contact",
  },
];

const HelpCenter = () => {
  return (
    <div className="bg-slate-950 pt-20 text-white">
      <section className="relative overflow-hidden border-b border-slate-800">
        <div className="absolute -top-14 -right-14 h-72 w-72 rounded-full bg-[#0EA5A4]/20 blur-[120px]" />
        <div className="container mx-auto px-6 py-16 md:py-24">
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#0EA5A4]/40 bg-[#0EA5A4]/10 px-4 py-1 text-[11px] font-black uppercase tracking-[0.22em] text-[#5EEAD4]">
            <LifeBuoy size={13} /> Help Center
          </p>
          <h1 className="max-w-4xl text-4xl font-black uppercase tracking-tight md:text-6xl">
            Find answers faster and plan your trip with confidence
          </h1>
          <p className="mt-5 max-w-2xl text-slate-300">
            Browse support topics, practical FAQs, and direct help options designed for travelers using Travelee.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-2xl bg-[#0EA5A4] px-6 py-3 text-xs font-black uppercase tracking-[0.2em] text-slate-950 transition hover:bg-[#2DD4BF]"
            >
              Contact Support <ArrowRight size={14} />
            </Link>
            <Link
              href="/travel-guides"
              className="inline-flex items-center gap-2 rounded-2xl border border-slate-700 px-6 py-3 text-xs font-black uppercase tracking-[0.2em] text-slate-200 transition hover:border-slate-500 hover:bg-slate-900"
            >
              Open Travel Guides
            </Link>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-6 py-12">
        <div className="rounded-3xl border border-slate-800 bg-slate-900/40 p-6 md:p-8">
          <div className="flex items-center gap-3 rounded-2xl border border-slate-700 bg-slate-950/60 px-4 py-3">
            <Search size={16} className="text-[#5EEAD4]" />
            <p className="text-sm text-slate-300">
              Search support by topic: <span className="font-bold text-slate-100">login</span>, <span className="font-bold text-slate-100">budget</span>, <span className="font-bold text-slate-100">itinerary</span>, <span className="font-bold text-slate-100">safety</span>
            </p>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-6 pb-14">
        <h2 className="mb-6 text-2xl font-black uppercase tracking-tight md:text-4xl">Quick Actions</h2>
        <div className="grid gap-5 md:grid-cols-2">
          {quickActions.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.title}
                href={item.href}
                className="group rounded-3xl border border-slate-800 bg-slate-900/40 p-6 transition hover:border-slate-600"
              >
                <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-[#0EA5A4]/15 text-[#5EEAD4]">
                  <Icon size={19} />
                </div>
                <h3 className="text-lg font-black tracking-tight">{item.title}</h3>
                <p className="mt-2 text-sm text-slate-400">{item.desc}</p>
                <span className="mt-5 inline-flex items-center gap-1 text-[11px] font-black uppercase tracking-[0.16em] text-[#5EEAD4] transition group-hover:gap-2">
                  Open <ArrowRight size={13} />
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="container mx-auto px-6 pb-14">
        <h2 className="mb-6 text-2xl font-black uppercase tracking-tight md:text-4xl">Support Topics</h2>
        <div className="grid gap-5 md:grid-cols-3">
          {supportTopics.map((topic) => {
            const Icon = topic.icon;
            return (
              <article key={topic.title} className="rounded-3xl border border-slate-800 bg-slate-900/40 p-6">
                <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-slate-800 text-[#5EEAD4]">
                  <Icon size={18} />
                </div>
                <h3 className="text-lg font-black tracking-tight">{topic.title}</h3>
                <ul className="mt-4 space-y-2">
                  {topic.points.map((p) => (
                    <li key={p} className="text-sm text-slate-400">
                      • {p}
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>
      </section>

      <section className="container mx-auto px-6 pb-16">
        <div className="rounded-3xl border border-slate-800 bg-slate-900/40 p-7 md:p-8">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-[#0EA5A4]/10 px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-[#5EEAD4]">
            <BadgeHelp size={12} /> Frequently Asked Questions
          </div>
          <div className="space-y-3">
            {faqs.map((item) => (
              <details key={item.q} className="rounded-2xl border border-slate-800 bg-slate-950/50 p-4">
                <summary className="cursor-pointer list-none text-sm font-black uppercase tracking-[0.1em] text-slate-100">
                  {item.q}
                </summary>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="container mx-auto px-6 pb-16">
        <h2 className="mb-6 text-2xl font-black uppercase tracking-tight md:text-4xl">Troubleshooting Workflow</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {troubleshootingSteps.map((item) => (
            <article key={item.title} className="rounded-2xl border border-slate-800 bg-slate-900/40 p-5">
              <h3 className="text-sm font-black uppercase tracking-[0.12em] text-slate-100">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">{item.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="container mx-auto px-6 pb-16">
        <h2 className="mb-6 text-2xl font-black uppercase tracking-tight md:text-4xl">Support Response Timeline</h2>
        <div className="overflow-x-auto rounded-3xl border border-slate-800">
          <table className="min-w-full bg-slate-900/40 text-left">
            <thead className="bg-slate-900">
              <tr>
                <th className="px-6 py-4 text-xs font-black uppercase tracking-[0.16em] text-slate-300">Request Type</th>
                <th className="px-6 py-4 text-xs font-black uppercase tracking-[0.16em] text-slate-300">First Reply</th>
                <th className="px-6 py-4 text-xs font-black uppercase tracking-[0.16em] text-slate-300">Resolution Window</th>
              </tr>
            </thead>
            <tbody>
              {supportTimelines.map((item) => (
                <tr key={item.channel} className="border-t border-slate-800">
                  <td className="px-6 py-4 text-sm font-bold text-slate-100">{item.channel}</td>
                  <td className="px-6 py-4 text-sm text-slate-300">{item.firstReply}</td>
                  <td className="px-6 py-4 text-sm text-slate-300">{item.resolution}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="container mx-auto px-6 pb-16">
        <h2 className="mb-6 text-2xl font-black uppercase tracking-tight md:text-4xl">Helpful Resources</h2>
        <div className="grid gap-5 md:grid-cols-2">
          {resources.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="group rounded-3xl border border-slate-800 bg-slate-900/40 p-6 transition hover:border-slate-600"
            >
              <h3 className="text-lg font-black tracking-tight text-slate-100">{item.title}</h3>
              <p className="mt-2 text-sm text-slate-400">{item.desc}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-[11px] font-black uppercase tracking-[0.14em] text-[#5EEAD4] transition group-hover:gap-2">
                Open Resource <ArrowRight size={13} />
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="border-t border-slate-800 bg-slate-900/40">
        <div className="container mx-auto px-6 py-12 md:flex md:items-center md:justify-between">
          <div>
            <p className="text-[11px] font-black uppercase tracking-[0.2em] text-[#5EEAD4]">Need Human Assistance?</p>
            <h3 className="mt-2 text-2xl font-black uppercase tracking-tight md:text-3xl">
              Our support team is ready to help
            </h3>
          </div>
          <Link
            href="/contact"
            className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-[#0EA5A4] px-6 py-3 text-xs font-black uppercase tracking-[0.2em] text-slate-950 transition hover:bg-[#2DD4BF] md:mt-0"
          >
            Talk To Support <ArrowRight size={14} />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HelpCenter;
