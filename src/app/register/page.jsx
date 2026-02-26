import { SignupForm } from "@/components/Auth/SignupForm";
import Logo from "@/components/Share/Logo";
import Link from "next/link";
import { Suspense } from "react";
import { IoArrowBack } from "react-icons/io5";

export default function SignupPage() {
  return (
    <div className="grid min-h-screen lg:grid-cols-2 bg-background">
      {/* Left Column: Form Section */}
      <div className="flex flex-col p-8 md:p-12 lg:p-16">
        {/* Navigation Header */}
        <div className="flex items-center justify-between w-full mb-10">
          <Logo />
          <Link
            href="/"
            className="group flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
          >
            <IoArrowBack className="group-hover:-translate-x-1 transition-transform" />
            Back home
          </Link>
        </div>

        {/* Center Content Area */}
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-[420px] space-y-8">
           
            <Suspense 
              fallback={
                <div className="flex flex-col items-center justify-center h-64 border border-dashed rounded-2xl bg-muted/10 animate-pulse">
                  <div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin mb-4" />
                  <p className="text-sm text-muted-foreground">Preparing your workspace...</p>
                </div>
              }
            >
              <div className="bg-card">
                 <SignupForm />
              </div>
            </Suspense>

            <p className="text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link href="/login" className="font-semibold text-primary hover:underline underline-offset-4">
                Sign in
              </Link>
            </p>
          </div>
        </div>

        {/* Minimal Footer */}
        <footer className="mt-8 text-center lg:text-left text-[11px] uppercase tracking-widest text-muted-foreground/60 font-medium">
          © 2026 YourBrand Inc. Secure Cloud Infrastructure.
        </footer>
      </div>

      {/* Right Column: Visual Section */}
      <div className="relative hidden lg:block overflow-hidden bg-zinc-900">
        {/* Brand Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-black/60 z-10" />
        
        <img
          src="https://i.pinimg.com/736x/05/21/1c/05211c0cd785a3210643e68b5153b578.jpg"
          className="absolute inset-0 h-full w-full object-cover scale-105 hover:scale-100 transition-transform duration-10000 ease-linear opacity-90"
        />
        
        {/* Floating Feature Card */}
        <div className="absolute bottom-16 left-12 z-20 max-w-md p-8 backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl shadow-2xl">
          <div className="flex items-center gap-4 mb-4">
            <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center border border-primary/30 text-primary">
              <span className="font-bold">✨</span>
            </div>
            <h3 className="text-white font-semibold text-lg">Start for free</h3>
          </div>
          <p className="text-white leading-relaxed text-sm">
            Access our full suite of tools with a 14-day trial. No credit card required. Setup takes less than 2 minutes.
          </p>
        </div>
      </div>
    </div>
  );
}