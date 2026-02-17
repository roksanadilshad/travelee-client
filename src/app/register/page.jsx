import { SignupForm } from "@/components/Auth/SignupForm";
import Logo from "@/components/Share/Logo";
import { IoPlayBackOutline } from "react-icons/io5";
import Link from "next/link";

export default function SignupPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2 mx-auto container">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <div className="flex items-center gap-5 font-medium">
            <Logo></Logo>
            <Link
              className="px-4 items-center gap-2 flex py-2 text-white text-sm font-medium bg-primary hover:bg-primary/90 rounded-lg transition-colors duration-200"
              href="/"
            >
              <IoPlayBackOutline />
              Back home
            </Link>
          </div>
        </div>
        <div className="flex flex-1 mt-5 items-center justify-center">
          <div className="w-full max-w-xs">
            <SignupForm />
          </div>
        </div>
      </div>
      <div className="bg-muted relative hidden lg:block">
        <img
          src="https://i.pinimg.com/1200x/58/35/bc/5835bc42884acc1a941b765aca06fca3.jpg"
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
}
