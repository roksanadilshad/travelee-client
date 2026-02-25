import { LoginForm } from "@/components/Auth/LogInForm";
import Logo from "@/components/Share/Logo";
import Link from "next/link";
import { Suspense } from "react";
import { IoArrowBack } from "react-icons/io5";

export default function LoginPage() {
  return (
    <div className="grid min-h-screen lg:grid-cols-2 bg-background">
     

      {/* Right Column: Visual Section */}
      <div className="relative hidden lg:block overflow-hidden bg-zinc-900">
        {/* Subtle Overlay for better text/image contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
        
        <img
          src="https://i.pinimg.com/736x/4a/b4/89/4ab4893e2f692198de86eb99432b7183.jpg"
          className="absolute inset-0 h-full w-full object-cover opacity-80"
        />
        
        {/* Brand Quote or Value Prop */}
        <div className="absolute bottom-12 left-12 right-12 z-20">
          <blockquote className="space-y-2">
            <p className="text-lg font-medium text-white italic">
              "This platform has completely transformed how we manage our digital assets and team collaboration."
            </p>
            <footer className="text-sm text-zinc-300">— Alex Rivera, Lead Designer</footer>
          </blockquote>
        </div>
      </div>
       {/* Left Column: Form Section */}
      <div className="flex flex-col p-8 md:p-12 lg:p-16">
        {/* Navigation Header */}
        <div className="flex items-center justify-between w-full mb-12">
          <Logo />
          <Link
            href="/"
            className="group flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
          >
            <IoArrowBack className="group-hover:-translate-x-1 transition-transform" />
            Back to website
          </Link>
        </div>

        {/* Center Content Area */}
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-[400px] space-y-8">
            <div className="flex flex-col space-y-2 text-center lg:text-left">
              <h1 className="text-3xl font-bold tracking-tight">Welcome back</h1>
              <p className="text-muted-foreground text-sm">
                Enter your credentials to access your account dashboard.
              </p>
            </div>

            <Suspense 
              fallback={
                <div className="flex items-center justify-center h-48 border rounded-xl bg-muted/20 animate-pulse">
                  <p className="text-sm text-muted-foreground">Initializing secure session...</p>
                </div>
              }
            >
              <div className="bg-card shadow-sm border rounded-2xl p-2 sm:p-0 sm:border-0 sm:shadow-none">
                 <LoginForm />
              </div>
            </Suspense>

            <footer className="text-center text-xs text-muted-foreground">
              By continuing, you agree to our 
              <Link href="/terms" className="underline hover:text-primary px-1">Terms of Service</Link> 
              and 
              <Link href="/privacy" className="underline hover:text-primary px-1">Privacy Policy</Link>.
            </footer>
          </div>
        </div>
      </div>
    </div>
  );
}