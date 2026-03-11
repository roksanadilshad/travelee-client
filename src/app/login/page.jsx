import { LoginForm } from "@/components/Auth/LogInForm";
import Logo from "@/components/Share/Logo";
import Link from "next/link";
import { Suspense } from "react";
import { IoArrowBack } from "react-icons/io5";

export default function LoginPage() {
  return (
    <div className="">
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