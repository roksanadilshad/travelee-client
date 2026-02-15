"use client";

import Link from "next/link";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

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
      <div className="container mx-auto px-4 py-12">
        {/* Top Section */}
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand */}
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-xl font-bold">TravelX</h2>
            <p className="text-sm text-muted-foreground max-w-sm">
              Explore the world with ease. Discover amazing destinations, book
              trips, and make unforgettable memories.
            </p>

            {/* Social Icons */}
            <div className="flex gap-3">
              <Link
                href="#"
                className="p-2 rounded-full hover:bg-muted transition"
              >
                <Facebook className="h-4 w-4" />
              </Link>
              <Link
                href="#"
                className="p-2 rounded-full hover:bg-muted transition"
              >
                <Twitter className="h-4 w-4" />
              </Link>
              <Link
                href="#"
                className="p-2 rounded-full hover:bg-muted transition"
              >
                <Instagram className="h-4 w-4" />
              </Link>
              <Link
                href="#"
                className="p-2 rounded-full hover:bg-muted transition"
              >
                <Linkedin className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="mb-4 text-sm font-semibold">Company</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="hover:text-foreground transition"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold">Support</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="hover:text-foreground transition"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold">Explore</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {footerLinks.explore.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="hover:text-foreground transition"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <div className="mt-10 border-t pt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h4 className="text-sm font-semibold">Subscribe to newsletter</h4>
            <p className="text-xs text-muted-foreground">
              Get travel tips and special offers.
            </p>
          </div>

          <div className="flex w-full md:w-auto gap-2">
            <Input
              type="email"
              placeholder="Enter your email"
              className="max-w-xs"
            />
            <Button>Subscribe</Button>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-8 border-t pt-6 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} TravelX. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
