"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, LogOut, User, Compass, Briefcase, Phone, Info } from "lucide-react";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { 
  Sheet, 
  SheetContent, 
  SheetTrigger, 
  SheetTitle, 
  SheetDescription 
} from "@/components/ui/sheet"; // Fixed Import
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import Logo from "./Logo";
import LogInButton from "../Auth/LogInButton";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "react-toastify";
import LanguageToggle from "../Home/LanguageToggle";

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/", icon: <Compass className="w-4 h-4" /> },
    { name: "Destinations", href: "/destinations", icon: <Compass className="w-4 h-4" /> },
    ...(user?.email ? [{ name: "Dashboard", href: "/dashboard/my-profile" }] : []),
    ...(user?.email ? [{ name: "Itinerary", href: "/itinerary" }] : []),
    ...(user?.email ? [{ name: "Bookings", href: "/dashboard/my-trips" }] : []),
    { name: "About", href: "/about", icon: <Info className="w-4 h-4" /> },
    { name: "Contact", href: "/contact", icon: <Phone className="w-4 h-4" /> },
  ];

  const isActive = (href) => href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header 
      className={`fixed top-0 z-50 w-full transition-all duration-300 border-b ${
        scrolled 
          ? "border-border/60 bg-background/80 backdrop-blur-xl py-2 shadow-sm" 
          : "border-transparent bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between px-6 ">
        
        {/* Logo Section */}
        <div className="flex-shrink-0 transition-transform duration-300 hover:scale-105">
          <Link href='/'>
            <Logo variant="nav"/>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center bg-muted/20 backdrop-blur-md border border-border/40 rounded-full px-2 py-1">
          {navLinks.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
  key={link.name}
  href={link.href}
  className={`px-5 py-2 text-sm font-semibold transition-all duration-300 relative rounded-full ${
    active
      ? "text-primary bg-background shadow-sm"
      : `${
          scrolled
            ? "text-foreground hover:text-primary"
            : "text-white hover:text-gray-200"
        } hover:bg-background/50`
  }`}
>
  {link.name}
  {active && (
    <motion.div 
      layoutId="activeNav"
      className="absolute inset-0 border-2 border-primary/10 rounded-full -z-10"
    />
  )}
</Link>
            );
          })}
        </nav>

        <div className="hidden lg:block">
          <LanguageToggle />
        </div>

        {/* Action Buttons */}
        <div className="hidden lg:flex items-center gap-4">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full border border-border/50 p-0 overflow-hidden">
                  <Avatar>
                    <AvatarImage src={user?.image} />
                    <AvatarFallback className="bg-primary text-secondary font-bold">
                      {user?.name?.charAt(0) || "U"}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 mt-2 rounded-2xl p-2" align="end">
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-primary text-sm font-bold leading-none">{user?.name}</p>
                    <p className="text-xs text-gray-300 leading-none ">{user?.email}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/dashboard/my-profile" className="cursor-pointer text-primary rounded-lg">
                    <User className="mr-2 text-accent h-4 w-4" /> Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                  className="focus:bg-destructive/10 focus:text-destructive cursor-pointer text-primary rounded-lg"
                  onClick={() => { logout(); toast.success("Signed out successfully"); }}
                >
                  <LogOut className="mr-2 text-accent h-4 w-4" /> Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-2">
              <LogInButton />
              <Button
                asChild
                className="rounded-full bg-[#FF6B6B] hover:bg-[#ff5252] text-white font-bold px-6 shadow-lg shadow-[#FF6B6B]/20 transition-all active:scale-95"
              >
                <Link href="/register">Sign Up</Link>
              </Button>
            </div>
          )}
        </div>

        {/* Mobile Toggle */}
        <div className="lg:hidden flex items-center gap-3">
            {user && (
                <span className="text-xs font-bold text-slate-500">{user.name.split(' ')[0]}</span>
            )}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="rounded-xl border-border/50">
                    <Menu className="h-5 w-5 text-primary" />
                </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[300px] border-l-0 bg-background/95 backdrop-blur-2xl">
                    {/* ACCESSIBILITY FIX START */}
                    <div className="sr-only">
                        <SheetTitle>Navigation Menu</SheetTitle>
                        <SheetDescription>Access your account and site navigation</SheetDescription>
                    </div>
                    {/* ACCESSIBILITY FIX END */}

                    <div className="flex flex-col h-full py-6">
                        <div className="flex items-center justify-between mb-8 px-2">
                         <Link href='/' onClick={() => setIsOpen(false)}>
                            <Logo variant="footer"/>
                         </Link>
                        </div>
                        
                        <nav className="flex flex-col gap-2">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                onClick={() => setIsOpen(false)}
                                className={`flex items-center gap-4 px-4 py-3 rounded-2xl text-base font-bold transition-all ${
                                    isActive(link.href)
                                    ? "bg-primary text-white shadow-lg shadow-primary/20"
                                    : "text-slate-600 hover:bg-slate-100"
                                }`}
                            >
                                {link.name}
                            </Link>
                        ))}
                        </nav>

                        <div className="mt-auto pt-6 border-t border-border/50 flex flex-col gap-4">
                            <div className="px-2">
                              <LanguageToggle/>
                            </div>
                            {!user ? (
                                <div className="flex flex-col gap-3">
                                    <LogInButton />
                                    <Button asChild className="w-full rounded-2xl bg-[#FF6B6B] py-6 font-bold">
                                        <Link href="/register">Create Account</Link>
                                    </Button>
                                </div>
                            ) : (
                                <Button 
                                    variant="destructive" 
                                    className="w-full rounded-2xl py-6 text-white font-bold"
                                    onClick={() => { logout(); setIsOpen(false); }}
                                >
                                    <LogOut className="mr-2 h-4 w-4" /> Logout
                                </Button>
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