"use client";

import Link from "next/link";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Logo from "./Logo";

const footerLinks = {
  company: [
    { name: "About Us", href: "/about" },
    { name: "Careers", href: "/careers" },
    { name: "Blog", href: "/blog" },
  ],
  support: [
    { name: "Help Center", href: "/help" },
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms & Conditions", href: "/terms" },
  ],
  explore: [
    { name: "Destinations", href: "/destinations" },
    { name: "Bookings", href: "/bookings" },
    { name: "Travel Guides", href: "/guides" },
  ],
};

export default function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-4 py-14">
        {/* Top Section */}
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand */}
          <div className="lg:col-span-2 space-y-5">
            <Logo />

            <p className="text-sm text-muted-foreground max-w-sm leading-relaxed">
              Discover breathtaking destinations, seamless bookings, and curated
              travel experiences designed for modern explorers.
            </p>

            {/* Social Icons */}
            <div className="flex gap-3">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                <Link
                  key={i}
                  href="#"
                  className="p-2 rounded-full border border-border 
                         hover:bg-primary/10 
                         hover:text-primary 
                         transition-all duration-300"
                >
                  <Icon className="h-4 w-4" />
                </Link>
              ))}
            </div>
          </div>

          {/* Links Section */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="mb-4 text-sm font-semibold text-primary capitalize">
                {title}
              </h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="hover:text-primary transition-colors duration-200"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter */}
        <div className="mt-14 border-t pt-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <h4 className="text-sm font-semibold text-primary">
              Subscribe to our newsletter
            </h4>
            <p className="text-xs text-muted-foreground">
              Get exclusive travel deals and insider tips.
            </p>
          </div>

          <div className="flex w-full md:w-auto gap-3">
            <Input
              type="email"
              placeholder="Enter your email"
              className="max-w-xs focus-visible:ring-primary"
            />
            <Button>Subscribe</Button>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-10 border-t pt-6 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} Travelee. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
