"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Eye, EyeOff, Camera, Loader2 } from "lucide-react";
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
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  
  const params = useSearchParams();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      image: null,
      phone: ""
    }
  });

  // Watch the image field to handle UI states
  const uploadedImageUrl = watch("image");

  // --- Image Upload Handler ---
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Local Preview
    setImagePreview(URL.createObjectURL(file));
    setIsUploading(true);

    const formData = new FormData();
    formData.append("image", file);

    try {
      const API_KEY = process.env.NEXT_PUBLIC_API_IMAGEBB;
      const res = await axios.post(`https://api.imgbb.com/1/upload?key=${API_KEY}`, formData);
      
      if (res.data.success) {
        setValue("image", res.data.data.url);
        toast.success("Profile picture uploaded!");
      }
    } catch (err) {
      toast.error("Image upload failed");
      setImagePreview(null);
    } finally {
      setIsUploading(false);
    }
  };

  const passwordValidation = {
    required: "Password is required",
    minLength: { value: 6, message: "Password must be at least 6 characters!" },
    validate: {
      hasUpper: (v) => /[A-Z]/.test(v ?? "") || "Must include at least 1 uppercase letter!",
      hasLow: (v) => /[a-z]/.test(v ?? "") || "Must include at least 1 lowercase letter!",
      hasNum: (v) => /\d/.test(v ?? "") || "Must include at least 1 number!",
    },
  };

  const handleUserRegister = async (data) => {
    setLoading(true);
    try {
      const userData = {
        fullName: data.fullName,
        email: data.email,
        password: data.password,
        phone: data.phone, // Added phone
        image: data.image, // Added ImgBB URL
        provider: "Credential",
      };

      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://travelee-server.vercel.app";
      
      await axios.post(`${apiUrl}/user`, userData);
      toast.success("Registration Successful!");

      await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: true,
        callbackUrl: params.get("callbackUrl") || "/",
      });
      
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || "Something went wrong";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignUp = () => signIn("google", { callbackUrl: params.get("callbackUrl") || "/" });
  const handleGithubSignIn = () => signIn("github", { callbackUrl: params.get("callbackUrl") || "/" });

  return (
    <form
      onSubmit={handleSubmit(handleUserRegister)}
      className={cn("flex flex-col gap-6", className)}
      {...props}
    >
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center mb-4">
          <h1 className="text-2xl font-bold">Create your account</h1>
          <p className="text-muted-foreground text-sm">Join the Travelee community</p>
        </div>

        {/* --- Profile Image Upload Section --- */}
        <div className="flex flex-col items-center justify-center gap-3 mb-4">
          <div className="relative group">
            <div className="w-24 h-24 rounded-full border-2 border-dashed border-primary/30 bg-muted flex items-center justify-center overflow-hidden transition-all group-hover:border-primary/60">
              {imagePreview ? (
                <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
              ) : (
                <Camera className="w-8 h-8 text-muted-foreground" />
              )}
              {isUploading && (
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <Loader2 className="w-6 h-6 text-white animate-spin" />
                </div>
              )}
            </div>
            <input 
              type="file" 
              accept="image/*" 
              className="absolute inset-0 opacity-0 cursor-pointer" 
              onChange={handleImageChange}
              disabled={isUploading}
            />
          </div>
          <p className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground">Profile Picture (Optional)</p>
        </div>

        <Field>
          <FieldLabel htmlFor="name">Full Name</FieldLabel>
          <Input {...register("fullName", { required: "Full name is required" })} id="name" placeholder="Ratul Hasan" />
          {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName.message}</p>}
        </Field>

        {/* --- Phone Number Field --- */}
        <Field>
          <FieldLabel htmlFor="phone">Phone Number</FieldLabel>
          <div className="flex gap-2">
            <select className="bg-muted border rounded-md px-2 text-xs font-medium outline-none focus:ring-1 focus:ring-primary">
              <option value="+880">+880 (BD)</option>
              <option value="+1">+1 (US)</option>
            </select>
            <Input 
              {...register("phone", { required: "Phone number is required" })} 
              id="phone" 
              type="tel" 
              placeholder="017XXXXXXXX" 
              className="flex-1"
            />
          </div>
          {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
        </Field>

        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input {...register("email", { required: "Email is required" })} id="email" type="email" placeholder="m@example.com" />
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
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
              className="absolute inset-y-0 right-3 flex items-center text-muted-foreground"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {errors.password ? (
            <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
          ) : (
            <FieldDescription>Min 6 chars, uppercase, lowercase, and number.</FieldDescription>
          )}
        </Field>

        <Field className="pt-2">
          <Button type="submit" className="w-full font-bold h-11" disabled={loading || isUploading}>
            {loading ? "Creating Account..." : "Create Account"}
          </Button>
        </Field>

        <FieldSeparator>Or continue with</FieldSeparator>

        <div className="grid grid-cols-2 gap-4">
          <Button variant="outline" onClick={handleGoogleSignUp} type="button" className="gap-2">
            <svg viewBox="0 0 48 48" width="18" height="18">
               <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.9 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3 0 5.7 1.1 7.8 3l5.7-5.7C33.9 6.5 29.2 4.5 24 4.5 12.9 4.5 4 13.4 4 24.5S12.9 44.5 24 44.5 44 35.6 44 24.5c0-1.3-.1-2.7-.4-4z" />
               <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.5 16.1 18.9 13 24 13c3 0 5.7 1.1 7.8 3l5.7-5.7C33.9 6.5 29.2 4.5 24 4.5c-7.7 0-14.3 4.4-17.7 10.2z" />
               <path fill="#4CAF50" d="M24 44.5c5.2 0 9.9-2 13.5-5.4l-6.2-5.1C29.2 35.5 26.7 36 24 36c-5.3 0-9.7-3.1-11.3-7.6l-6.5 5C9.6 40 16.3 44.5 24 44.5z" />
               <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-1.1 3-3.5 5.5-6.8 6.9l6.2 5.1C38.9 36.5 44 30.9 44 24.5c0-1.3-.1-2.7-.4-4z" />
            </svg>
            Google
          </Button>
          <Button variant="outline" onClick={handleGithubSignIn} type="button" className="gap-2">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
              <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.1 3.29 9.42 7.86 10.96.57.1.78-.25.78-.56v-2.17c-3.2.7-3.88-1.38-3.88-1.38-.52-1.32-1.27-1.67-1.27-1.67-1.04-.72.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.75 2.67 1.24 3.32.95.1-.74.4-1.24.73-1.53-2.55-.29-5.23-1.27-5.23-5.66 0-1.25.45-2.27 1.18-3.07-.12-.29-.51-1.47.11-3.06 0 0 .96-.31 3.15 1.17a10.9 10.9 0 0 1 5.73 0c2.18-1.48 3.14-1.17 3.14-1.17.62 1.59.23 2.77.11 3.06.73.8 1.18 1.82 1.18 3.07 0 4.4-2.69 5.37-5.25 5.65.41.36.78 1.09.78 2.2v3.26c0 .31.2.67.79.56A11.51 11.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5z" />
            </svg>
            GitHub
          </Button>
        </div>

        <p className="text-center text-sm text-muted-foreground mt-4">
          Already have an account?{" "}
          <a className="text-primary font-bold hover:underline" href="/login">
            Sign in
          </a>
        </p>
      </FieldGroup>
    </form>
  );
}