"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Logo from "./Logo";
import LogInButton from "../Auth/LogInButton";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "react-toastify";



export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();

  
  //( Role ) => don't delete any routes
  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Destinations", href: "/destinations" },
    ...(user?.email
      ? [{ name: "Dashboard", href: "/dashboard/my-profile" }]
      : []),
    ...(user?.email
      ? [{ name: "Itinerary", href: "/itinerary" }]
      : []),
    { name: "Bookings", href: "/bookings" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  const isActive = (href) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/95 backdrop-blur-md shadow-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <div className="flex-shrink-0">
          <Logo />
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`text-sm font-medium transition-all duration-300 relative group ${
                  active
                    ? "text-primary font-semibold"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Desktop Buttons */}
        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <>
              <h1>{user?.name}</h1>
              <Button
                className="cursor-pointer"
                onClick={() => {
                  logout();
                  toast.success("LogOut successfull.");
                }}
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <LogInButton></LogInButton>
              <Button
                asChild
                className="bg-gradient-to-r from-accent to-orange-600 hover:from-accent/90 hover:to-orange-600/90 text-white font-semibold shadow-md hover:shadow-lg transition-all duration-200"
              >
                <Link href="/register">Sign Up</Link>
              </Button>
            </>
          )}
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="text-primary hover:bg-primary"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>

            <SheetContent
              side="right"
              className="w-70 p-4 bg-background border-l border-border/50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right duration-300"
            >
              <div className="mt-8 flex flex-col gap-6">
                {/* Mobile Nav Links */}
                <nav className="flex flex-col gap-2">
                  {navLinks.map((link) => {
                    const active = isActive(link.href);
                    return (
                      <Link
                        key={link.name}
                        href={link.href}
                        onClick={() => setIsOpen(false)}
                        className={`text-base font-medium px-4 py-2 rounded-lg transition-all duration-200 ${
                          active
                            ? "bg-primary/20 text-primary font-semibold"
                            : "text-foreground hover:bg-primary/5"
                        }`}
                      >
                        {link.name}
                      </Link>
                    );
                  })}
                </nav>

                {/* Mobile Buttons */}
                <div className="mt-4 border-t border-border/50 pt-6 flex flex-col gap-3">
                  {user ? (
                    <>
                      <h1>{user?.name}</h1>
                      <Button
                        className="cursor-pointer"
                        onClick={() => {
                          logout();
                          toast.success("LogOut successfull.");
                        }}
                      >
                        Logout
                      </Button>
                    </>
                  ) : (
                    <>
                      <LogInButton></LogInButton>
                      <Button
                        asChild
                        className="w-full bg-gradient-to-r from-accent to-orange-600 hover:from-accent/90 hover:to-orange-600/90 text-white font-semibold"
                        onClick={() => setIsOpen(false)}
                      >
                        <Link href="/register">Sign Up</Link>
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
