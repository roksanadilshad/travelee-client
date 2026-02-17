import { LoginForm } from "@/components/Auth/LogInForm";
import Logo from "@/components/Share/Logo";
import { GalleryVerticalEnd } from "lucide-react";
import Link from "next/link";
import { IoPlayBackOutline } from "react-icons/io5";



export default function LoginPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <Logo></Logo>
          <Link
            className="px-4 items-center gap-2 flex py-2 text-white text-sm font-medium bg-primary hover:bg-primary/90 rounded-lg transition-colors duration-200"
            href="/"
          >
            <IoPlayBackOutline />
            Back home
          </Link>
        </div>
        <div className="flex flex-1 mt-5 items-center justify-center">
          <div className="w-full max-w-xs">
            <LoginForm />
          </div>
        </div>
      </div>
      <div className="bg-muted relative hidden lg:block">
        <img
          src="https://i.pinimg.com/736x/48/b1/2e/48b12e5214dbb3f4bf124b4091194d47.jpg"
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
}
