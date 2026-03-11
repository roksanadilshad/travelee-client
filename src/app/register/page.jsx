import { SignupForm } from "@/components/Auth/SignupForm";
import Logo from "@/components/Share/Logo";
import Link from "next/link";
import { Suspense } from "react";
import { IoArrowBack } from "react-icons/io5";

export default function SignupPage() {
  return (
    <div className="">
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
    </div>
  );
}