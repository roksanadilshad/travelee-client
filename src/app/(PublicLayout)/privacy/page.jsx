import React from "react";
import Link from "next/link";
import { CheckCircle2, Lock, Mail, ShieldCheck } from "lucide-react";

const policyHighlights = [
  "We collect only essential data required to provide travel planning features.",
  "Your account data is protected with standard security and access controls.",
  "We do not sell personal user data to third parties.",
  "You can request account data updates or deletion through support.",
];

const policySections = [
  {
    title: "1. Information We Collect",
    points: [
      "Account information such as name, email, and login credentials.",
      "Trip planning inputs including destination preferences, dates, and budget ranges.",
      "Technical usage details such as device/browser metadata for platform performance and security.",
    ],
  },
  {
    title: "2. How We Use Your Data",
    points: [
      "To provide personalized travel planning and destination recommendations.",
      "To improve product performance, fix issues, and optimize user experience.",
      "To communicate service updates, account notices, and support responses.",
    ],
  },
  {
    title: "3. Data Protection and Security",
    points: [
      "We implement reasonable administrative and technical safeguards to protect user data.",
      "Access to sensitive data is restricted to authorized systems and personnel only.",
      "Security monitoring and incident response procedures are maintained to reduce risk.",
    ],
  },
  {
    title: "4. Data Sharing",
    points: [
      "We may use trusted service providers for hosting, analytics, and communication support.",
      "Data is shared only when necessary for service delivery, legal compliance, or account protection.",
      "We do not provide your personal data to unrelated third-party advertisers for sale.",
    ],
  },
  {
    title: "5. User Rights",
    points: [
      "You may request correction of inaccurate personal information.",
      "You may request deletion of your account and related personal data, subject to legal obligations.",
      "You may contact support to review what account information is currently stored.",
    ],
  },
  {
    title: "6. Cookies and Tracking",
    points: [
      "Cookies may be used for login sessions, user preferences, and performance analytics.",
      "You can manage cookie preferences through browser settings.",
      "Disabling some cookies may affect certain product functionality.",
    ],
  },
  {
    title: "7. Policy Updates",
    points: [
      "This Privacy Policy may be updated when product, legal, or security requirements change.",
      "Material changes will be reflected on this page with an updated revision date.",
    ],
  },
];

const Privacy = () => {
  return (
    <div className="bg-slate-950 pt-24 text-white">
      <section className="container mx-auto px-6 pb-10">
        <div className="rounded-3xl border border-slate-800 bg-slate-900/40 p-6 md:p-8">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#0EA5A4]/30 bg-[#0EA5A4]/10 px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-[#5EEAD4]">
            <ShieldCheck size={12} /> Privacy Policy
          </div>
          <h1 className="text-3xl font-black uppercase tracking-tight md:text-5xl">Your privacy and trust matter</h1>
          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-slate-300 md:text-base">
            This policy explains what information Travelee collects, how we use it, and how we protect it while you
            use our travel planning services. Last updated: March 2, 2026.
          </p>
        </div>
      </section>

      <section className="container mx-auto px-6 pb-10">
        <div className="rounded-3xl border border-slate-800 bg-slate-900/40 p-6 md:p-8">
          <h2 className="text-xl font-black uppercase tracking-tight md:text-2xl">Key Highlights</h2>
          <ul className="mt-5 space-y-3">
            {policyHighlights.map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm text-slate-300">
                <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-[#5EEAD4]" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="container mx-auto px-6 pb-12">
        <div className="space-y-5">
          {policySections.map((section) => (
            <article key={section.title} className="rounded-3xl border border-slate-800 bg-slate-900/40 p-6 md:p-8">
              <h3 className="text-lg font-black uppercase tracking-[0.1em] text-slate-100 md:text-xl">{section.title}</h3>
              <ul className="mt-4 space-y-2">
                {section.points.map((point) => (
                  <li key={point} className="text-sm leading-relaxed text-slate-300">
                    • {point}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="container mx-auto px-6 pb-16">
        <div className="grid gap-5 md:grid-cols-2">
          <article className="rounded-3xl border border-slate-800 bg-slate-900/40 p-6">
            <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[#0EA5A4]/15 text-[#5EEAD4]">
              <Mail size={18} />
            </div>
            <h3 className="text-lg font-black tracking-tight">Privacy Requests</h3>
            <p className="mt-2 text-sm text-slate-400">
              For data correction, deletion, or account-related privacy requests, contact our support team directly.
            </p>
            <Link
              href="/contact"
              className="mt-4 inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.15em] text-[#5EEAD4] hover:text-[#2DD4BF]"
            >
              Contact Support
            </Link>
          </article>

          <article className="rounded-3xl border border-slate-800 bg-slate-900/40 p-6">
            <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-slate-800 text-slate-200">
              <Lock size={18} />
            </div>
            <h3 className="text-lg font-black tracking-tight">Related Help Resources</h3>
            <p className="mt-2 text-sm text-slate-400">
              Read practical guides and FAQs to better understand account usage, planning safety, and support processes.
            </p>
            <div className="mt-4 flex flex-wrap gap-4">
              <Link href="/help-center" className="text-xs font-black uppercase tracking-[0.15em] text-[#5EEAD4] hover:text-[#2DD4BF]">
                Help Center
              </Link>
              <Link href="/travel-guides" className="text-xs font-black uppercase tracking-[0.15em] text-[#5EEAD4] hover:text-[#2DD4BF]">
                Travel Guides
              </Link>
            </div>
          </article>
        </div>
      </section>
    </div>
  );
};

export default Privacy;
