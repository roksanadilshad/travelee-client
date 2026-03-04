import React from "react";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  CalendarDays,
  ChevronRight,
  Clock3,
  Compass,
  DollarSign,
  Globe,
  Map,
  Tag,
  TrendingUp,
  Users,
} from "lucide-react";

const categories = [
  { label: "Travel Strategy", href: "/blog?category=strategy", icon: TrendingUp },
  { label: "Destination Intel", href: "/blog?category=destination-intel", icon: Globe },
  { label: "Budget Planning", href: "/blog?category=budget-planning", icon: DollarSign },
  { label: "Team Trips", href: "/blog?category=team-trips", icon: Users },
  { label: "Trip Safety", href: "/blog?category=safety", icon: Compass },
];

const featuredPost = {
  title: "How AI Is Changing Travel Planning in 2026",
  excerpt:
    "From smart itineraries to cost prediction, modern planning systems are helping travelers decide faster with less uncertainty.",
  category: "Travel Strategy",
  date: "Feb 18, 2026",
  readTime: "6 min read",
  href: "/blog/ai-travel-planning-2026",
  image:
    "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1600&q=80",
};

const latestPosts = [
  {
    title: "Building a 5-Day Europe Plan With Real Budget Limits",
    excerpt:
      "Map flights, stays, transport, and activities into a practical spending range before you book anything.",
    category: "Budget Planning",
    date: "Feb 11, 2026",
    readTime: "5 min read",
    href: "/blog/europe-plan-budget-limits",
    image:
      "https://images.unsplash.com/photo-1471623432079-b009d30b6729?auto=format&fit=crop&w=1400&q=80",
  },
  {
    title: "Tokyo vs Seoul: Which City Fits Your Travel Style?",
    excerpt:
      "Compare pace, food culture, cost, neighborhoods, and transport to choose your next city wisely.",
    category: "Destination Intel",
    date: "Feb 04, 2026",
    readTime: "7 min read",
    href: "/blog/tokyo-vs-seoul-travel-style",
    image:
      "https://images.unsplash.com/photo-1542051841857-5f90071e7989?auto=format&fit=crop&w=1400&q=80",
  },
  {
    title: "How To Plan Group Trips Without Coordination Chaos",
    excerpt: "A framework for shared decisions, budget visibility, and fewer planning conflicts in group travel.",
    category: "Team Trips",
    date: "Jan 27, 2026",
    readTime: "4 min read",
    href: "/blog/plan-group-trips",
    image:
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1400&q=80",
  },
  {
    title: "City Transit Hacks: Save Time in Unfamiliar Places",
    excerpt: "Use transit passes, zone logic, and timing windows to avoid expensive and slow travel days.",
    category: "Travel Strategy",
    date: "Jan 21, 2026",
    readTime: "6 min read",
    href: "/blog/city-transit-hacks",
    image:
      "https://images.unsplash.com/photo-1474487548417-781cb71495f3?auto=format&fit=crop&w=1400&q=80",
  },
  {
    title: "First-Time International Travel Checklist",
    excerpt: "Documents, money setup, safety prep, and planning rules every first-time traveler should follow.",
    category: "Trip Safety",
    date: "Jan 15, 2026",
    readTime: "8 min read",
    href: "/blog/first-time-travel-checklist",
    image:
      "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?auto=format&fit=crop&w=1400&q=80",
  },
  {
    title: "How To Build a Relaxed 3-Day City Itinerary",
    excerpt: "Plan city blocks, meal windows, and flexible slots for a trip that feels smooth, not rushed.",
    category: "Travel Strategy",
    date: "Jan 09, 2026",
    readTime: "5 min read",
    href: "/blog/relaxed-3-day-itinerary",
    image:
      "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=1400&q=80",
  },
];

const quickGuides = [
  { title: "Budget Calculator Blueprint", href: "/travel-guides", meta: "Tooling + templates" },
  { title: "Visa & Documents Essentials", href: "/travel-guides", meta: "Pre-departure safety" },
  { title: "Family Trip Planning System", href: "/travel-guides", meta: "Low-stress planning" },
  { title: "Solo Travel Decision Checklist", href: "/travel-guides", meta: "Confidence + safety" },
];

const editorialSeries = [
  {
    name: "Smart City Breaks",
    description: "Short, high-impact itineraries for 2-4 day trips with realistic pace and transport logic.",
    href: "/blog?series=smart-city-breaks",
  },
  {
    name: "Budget Systems",
    description: "Actionable breakdowns for trip costing, overspending control, and category-based tracking.",
    href: "/blog?series=budget-systems",
  },
  {
    name: "Group Coordination",
    description: "Role distribution, decision frameworks, and communication rules for group travel planning.",
    href: "/blog?series=group-coordination",
  },
];

const faqItems = [
  {
    question: "How often is Travelee Blog updated?",
    answer: "New guides are added weekly, with seasonal destination updates and planning frameworks every month.",
  },
  {
    question: "Are these guides beginner-friendly?",
    answer: "Yes. Every article is written for practical use, with clear steps and examples you can apply immediately.",
  },
  {
    question: "Do you cover family and group travel separately?",
    answer: "Yes. We provide separate planning models for solo, couple, family, and multi-friend trips.",
  },
];

const PostCard = ({ post }) => (
  <article className="group overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/40 transition hover:border-slate-600">
    <div className="h-52 overflow-hidden">
      <img src={post.image} alt={post.title} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
    </div>
    <div className="p-6">
      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-teal-400">{post.category}</p>
      <h4 className="mt-2 text-lg font-black leading-snug tracking-tight text-white">{post.title}</h4>
      <p className="mt-3 text-sm leading-relaxed text-slate-400">{post.excerpt}</p>
      <div className="mt-4 flex items-center justify-between text-[11px] font-bold uppercase tracking-[0.12em] text-slate-500">
        <span className="inline-flex items-center gap-1.5">
          <CalendarDays size={11} />
          {post.date}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <Clock3 size={11} />
          {post.readTime}
        </span>
      </div>
      <Link
        href={post.href}
        className="mt-5 inline-flex items-center gap-1.5 text-[11px] font-black uppercase tracking-[0.16em] text-teal-300 transition hover:gap-2"
      >
        Read Article <ChevronRight size={13} />
      </Link>
    </div>
  </article>
);

const Blog = () => {
  return (
    <div className="bg-slate-950 pt-20 text-white">
      <section className="container mx-auto px-6 py-10">
        <div className="max-w-4xl">
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-teal-800/60 bg-teal-950/30 px-4 py-1 text-[11px] font-black uppercase tracking-[0.2em] text-teal-300">
            <BookOpen size={12} /> Travelee Journal
          </p>
          <h1 className="text-4xl font-black uppercase tracking-tight md:text-6xl">
            Practical travel insights for planning better trips
          </h1>
          <p className="mt-4 max-w-2xl text-slate-300">
            Explore destination breakdowns, budget frameworks, planning systems, and field-tested strategies for solo, family,
            and group travel.
          </p>
        </div>
      </section>

      <section className="container mx-auto px-6 pb-8">
        <div className="flex flex-wrap gap-2">
          {categories.map(({ label, href, icon: Icon }) => (
            <Link
              key={label}
              href={href}
              className="inline-flex items-center gap-2 rounded-full border border-slate-700 px-4 py-2 text-[11px] font-black uppercase tracking-[0.18em] text-slate-300 transition hover:border-teal-500 hover:text-teal-300"
            >
              <Icon size={11} /> {label}
            </Link>
          ))}
        </div>
      </section>

      <section className="container mx-auto px-6 pb-14">
        <Link href={featuredPost.href} className="group block overflow-hidden rounded-[2rem] border border-slate-800 bg-slate-900/40 transition hover:border-slate-600">
          <div className="grid md:grid-cols-2">
            <div className="h-72 overflow-hidden md:h-full">
              <img
                src={featuredPost.image}
                alt={featuredPost.title}
                className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
              />
            </div>
            <div className="p-8 md:p-12">
              <p className="text-[10px] font-black uppercase tracking-[0.25em] text-teal-400">Featured Story</p>
              <h2 className="mt-4 text-2xl font-black leading-tight tracking-tight md:text-4xl">{featuredPost.title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-300 md:text-base">{featuredPost.excerpt}</p>
              <div className="mt-5 flex flex-wrap items-center gap-4 text-[11px] font-bold uppercase tracking-[0.14em] text-slate-500">
                <span className="inline-flex items-center gap-1.5">
                  <CalendarDays size={12} />
                  {featuredPost.date}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Clock3 size={12} />
                  {featuredPost.readTime}
                </span>
              </div>
              <span className="mt-6 inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.18em] text-teal-400 transition group-hover:gap-3">
                Read Full Article <ArrowRight size={13} />
              </span>
            </div>
          </div>
        </Link>
      </section>

      <section className="container mx-auto px-6 pb-20">
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Map size={18} className="text-teal-400" />
            <h3 className="text-xl font-black uppercase tracking-tight md:text-3xl">Latest Articles</h3>
          </div>
          <Link
            href="/blog/archive"
            className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-[0.2em] text-slate-400 transition hover:text-teal-300"
          >
            View Archive <ChevronRight size={14} />
          </Link>
        </div>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {latestPosts.map((post) => (
            <PostCard key={post.title} post={post} />
          ))}
        </div>
      </section>

      <section className="container mx-auto px-6 pb-20">
        <div className="grid gap-6 lg:grid-cols-3">
          <article className="rounded-3xl border border-slate-800 bg-slate-900/40 p-7 lg:col-span-2">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-teal-950/30 px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-teal-300">
              <Tag size={12} /> Editorial Series
            </div>
            <h4 className="text-2xl font-black tracking-tight md:text-3xl">Deep-dive tracks for focused readers</h4>
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-300 md:text-base">
              Follow structured article series designed for specific travel goals. Each track builds from foundations to advanced
              decision-making so you can plan with confidence.
            </p>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {editorialSeries.map((item) => (
                <Link key={item.name} href={item.href} className="rounded-2xl border border-slate-700 bg-slate-950/40 p-4 transition hover:border-teal-700">
                  <h5 className="text-sm font-black uppercase tracking-[0.12em] text-white">{item.name}</h5>
                  <p className="mt-2 text-xs leading-relaxed text-slate-400">{item.description}</p>
                </Link>
              ))}
            </div>
          </article>

          <article className="rounded-3xl border border-slate-800 bg-slate-900/40 p-7">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-slate-300">
              <Compass size={12} /> Quick Guides
            </div>
            <ul className="space-y-4">
              {quickGuides.map((guide) => (
                <li key={guide.title}>
                  <Link href={guide.href} className="group block rounded-xl border border-slate-700 bg-slate-950/30 p-3 transition hover:border-teal-700">
                    <p className="text-sm font-bold text-slate-100 transition group-hover:text-teal-300">{guide.title}</p>
                    <p className="mt-1 text-[11px] text-slate-400">{guide.meta}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </article>
        </div>
      </section>

      <section className="container mx-auto px-6 pb-20">
        <div className="rounded-3xl border border-slate-800 bg-slate-900/40 p-8">
          <h4 className="text-2xl font-black uppercase tracking-tight md:text-3xl">Frequently Asked Questions</h4>
          <div className="mt-5 space-y-3">
            {faqItems.map((item) => (
              <details key={item.question} className="rounded-2xl border border-slate-800 bg-slate-950/40 p-4">
                <summary className="cursor-pointer list-none text-sm font-black uppercase tracking-[0.12em] text-slate-100">
                  {item.question}
                </summary>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-slate-800 bg-slate-900/40">
        <div className="container mx-auto px-6 py-12 md:flex md:items-center md:justify-between">
          <div>
            <p className="text-[11px] font-black uppercase tracking-[0.2em] text-teal-300">Weekly Travel Brief</p>
            <h4 className="mt-2 text-2xl font-black uppercase tracking-tight md:text-3xl">
              Get new travel frameworks in your inbox
            </h4>
          </div>
          <Link
            href="/contact"
            className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-teal-500 px-6 py-3 text-xs font-black uppercase tracking-[0.2em] text-slate-950 transition hover:bg-teal-400 md:mt-0"
          >
            Subscribe / Contact <ArrowRight size={14} />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Blog;
