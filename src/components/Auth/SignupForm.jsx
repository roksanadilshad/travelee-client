"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { toast } from "react-toastify";
import axios from "axios";
import { useSearchParams } from "next/navigation";

export function SignupForm({ className, ...props }) {
  const [showPassword, setShowPassword] = useState("");
  // const [loading, setLoading] = useState(false);
  const params = useSearchParams();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // compatible password validation
  const passwordValidation = {
    required: "Password is required",
    minLength: { value: 6, message: "Password must be at least 6 characters!" },
    validate: {
      hasUpper: (v) =>
        /[A-Z]/.test(v ?? "") || "Must include at least 1 uppercase letter!",
      hasLow: (v) =>
        /[a-z]/.test(v ?? "") || "Must include at least 1 lowercase letter!",
      hasNum: (v) => /\d/.test(v ?? "") || "Must include at least 1 number!",
    },
  };

  const handleUserRegister = async (data) => {
    // setLoading(true);

    // console.log(data);

    try {
      const userData = {
        fullName: data.fullName,
        email: data.email,
        password: data.password,
        provider: "Credential",
        image: null,
      };

      await axios
        .post("http://localhost:500/user", userData)
        .then(() => {
          toast.success("Registration Successful!");
          // setLoading(false);
        })
        .catch((err) => toast.error(err));

      // User direct login
      await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: true,
        callbackUrl: params.get("callbackUrl") || "/",
      });
     
    } catch (err) {
      // setLoading(false);
      toast.error(err);
    }
  };

    const handleGoogleSignUp = async () => {
      const result = await signIn("google", {
        redirect: false,
        callbackUrl: params.get("callbackUrl") || "/",
      });

      if (result?.ok) {
        toast.success("Login successful");
      }
      if (result?.error) {
        toast.error("Something went wrong!");
      }
    };

  return (
    <form
      onSubmit={handleSubmit(handleUserRegister)}
      className={cn("flex flex-col gap-6", className)}
      {...props}
    >
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Create your account</h1>
          <p className="text-muted-foreground text-sm text-balance">
            Fill in the form below to create your account
          </p>
        </div>
        <Field>
          <FieldLabel htmlFor="name">Full Name</FieldLabel>
          <Input
            {...register("fullName", { required: true })}
            id="name"
            type="text"
            placeholder="Ratul hasan"
          />
          {errors.fullName && (
            <p className="text-red-500 text-sm font-medium">
              Full name is required
            </p>
          )}
        </Field>
        {/* <Field>
          <FieldLabel htmlFor="name">User Name</FieldLabel>
          <Input id="name" type="text" placeholder="Johndoe123" required />
        </Field> */}
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
          <FieldLabel htmlFor="password">Create Password</FieldLabel>

          <div className="relative">
            <Input
              placeholder="********"
              {...register("password", passwordValidation)}
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
              {errors.password.message}
            </p>
          ) : (
            <FieldDescription>
              Must be at least 6 characters long.
            </FieldDescription>
          )}
        </Field>

        {/* <Field>
          <FieldLabel htmlFor="confirm-password">Confirm Password</FieldLabel>
          <Input id="confirm-password" type="password" required />
          <FieldDescription>Please confirm your password.</FieldDescription>
        </Field> */}
        <Field>
          <Button type="submit" className="cursor-pointer">
            Create Account
          </Button>
        </Field>
        <FieldSeparator>Or continue with</FieldSeparator>
        <Field>
          <Button
            className="cursor-pointer hover:bg-muted-foreground flex items-center gap-2"
            variant="outline"
            onClick={handleGoogleSignUp}
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
            Sign up with Google
          </Button>

          <FieldDescription className="px-6 text-center">
            Already have an account?{" "}
            <a className="text-[#E86201]" href="/login">
              Sign in
            </a>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  );
}
