"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import Link from "next/link";

export function LoginForm({ className, ...props }) {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const params = useSearchParams();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    setError("");

    try {
      const res = await signIn("credentials", {
        redirect: false,
        email: data.email,
        password: data.password,
        callbackUrl: params.get("callbackUrl") || "/",
      });

      if (res?.ok) {
        toast.success("Login successful");
        window.location.href = res.url || "/";
      } else if (res?.error) {
        setError("Invalid email or password!");
        toast.error("Invalid email or password!");
      }
    } catch (err) {
      console.error("Login Error:", err);
      setError("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    await signIn("google", {
      callbackUrl: params.get("callbackUrl") || "/",
    });
  };

  const handleGithubSignIn = async () => {
    await signIn("github", {
      callbackUrl: params.get("callbackUrl") || "/",
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={cn("flex flex-col gap-6", className)}
      {...props}
    >
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">SignIn to your account</h1>
          <p className="text-muted-foreground text-sm text-balance">
            Enter your email below to sign in to your account
          </p>
        </div>

        {error && <p className="text-red-500 text-center text-sm">{error}</p>}

        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input
            {...register("email", { required: true })}
            id="email"
            type="email"
            placeholder="m@example.com"
          />
          {errors.email && (
            <p className="text-red-500 text-sm font-medium">
              Email is required
            </p>
          )}
        </Field>

        <Field>
          <div className="flex items-center">
            <FieldLabel htmlFor="password">Password</FieldLabel>
            <a
              href="/forgot-password"
              className="ml-auto text-[#E86201] text-sm underline-offset-4 hover:underline"
            >
              Forgot your password?
            </a>
          </div>

          <div className="relative">
            <Input
              {...register("password", { required: true })}
              placeholder="********"
              id="password"
              type={showPassword ? "text" : "password"}
              className="pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute cursor-pointer inset-y-0 right-3 flex items-center text-muted-foreground"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {errors.password ? (
            <p className="text-red-500 text-sm font-medium">
              Password is required
            </p>
          ) : (
            <FieldDescription>
              Must be at least 6 characters long.
            </FieldDescription>
          )}
        </Field>

        <Field>
          <Button className="cursor-pointer" type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </Button>
        </Field>

        <FieldSeparator>Or continue with</FieldSeparator>

        <Field>
          <Button
            onClick={handleGoogleSignIn}
            className="cursor-pointer hover:bg-muted-foreground flex items-center gap-2"
            variant="outline"
            type="button"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 48 48"
              width="20"
              height="20"
            >
              <path
                fill="#FFC107"
                d="M43.6 20.5H42V20H24v8h11.3C33.7 32.9 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3 0 5.7 1.1 7.8 3l5.7-5.7C33.9 6.5 29.2 4.5 24 4.5 12.9 4.5 4 13.4 4 24.5S12.9 44.5 24 44.5 44 35.6 44 24.5c0-1.3-.1-2.7-.4-4z"
              />
              <path
                fill="#FF3D00"
                d="M6.3 14.7l6.6 4.8C14.5 16.1 18.9 13 24 13c3 0 5.7 1.1 7.8 3l5.7-5.7C33.9 6.5 29.2 4.5 24 4.5c-7.7 0-14.3 4.4-17.7 10.2z"
              />
              <path
                fill="#4CAF50"
                d="M24 44.5c5.2 0 9.9-2 13.5-5.4l-6.2-5.1C29.2 35.5 26.7 36 24 36c-5.3 0-9.7-3.1-11.3-7.6l-6.5 5C9.6 40 16.3 44.5 24 44.5z"
              />
              <path
                fill="#1976D2"
                d="M43.6 20.5H42V20H24v8h11.3c-1.1 3-3.5 5.5-6.8 6.9l6.2 5.1C38.9 36.5 44 30.9 44 24.5c0-1.3-.1-2.7-.4-4z"
              />
            </svg>
            Sign in with Google
          </Button>
          <Button
            onClick={handleGithubSignIn}
            className="cursor-pointer hover:bg-muted-foreground flex items-center gap-2"
            variant="outline"
            type="button"
          >
            {/* GitHub Icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="20"
              height="20"
              fill="currentColor"
            >
              <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.1 3.29 9.42 7.86 10.96.57.1.78-.25.78-.56v-2.17c-3.2.7-3.88-1.38-3.88-1.38-.52-1.32-1.27-1.67-1.27-1.67-1.04-.72.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.75 2.67 1.24 3.32.95.1-.74.4-1.24.73-1.53-2.55-.29-5.23-1.27-5.23-5.66 0-1.25.45-2.27 1.18-3.07-.12-.29-.51-1.47.11-3.06 0 0 .96-.31 3.15 1.17a10.9 10.9 0 0 1 5.73 0c2.18-1.48 3.14-1.17 3.14-1.17.62 1.59.23 2.77.11 3.06.73.8 1.18 1.82 1.18 3.07 0 4.4-2.69 5.37-5.25 5.65.41.36.78 1.09.78 2.2v3.26c0 .31.2.67.79.56A11.51 11.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5z" />
            </svg>
            Sign in with GitHub
          </Button>
          <FieldDescription className="text-center">
            Don&apos;t have an account?{" "}
            <Link
              href="/register"
              className="underline text-[#E86201] underline-offset-4"
            >
              Sign up
            </Link>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  );
}
