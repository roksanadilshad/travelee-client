"use client";

import React, { useState } from "react";
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import axios from "axios";


const ForgotPasswordFun = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");


  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setMessage("");
    setError("");

    try {
      const res = await axios.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/user/forgot-password`,
        { email },
      );

      if (res.status === 200) {
        setMessage("If this email exists, a reset link has been sent.");
        setEmail("");
      }
    } catch (err) {
      setError(
        err?.response?.data?.message || "Server error. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-5xl mx-auto p-6 border rounded-lg shadow-md space-y-4"
    >
      <Field>
        <FieldLabel htmlFor="fieldgroup-email">Enter Email</FieldLabel>

        <Input
          id="fieldgroup-email"
          type="email"
          placeholder="name@example.com"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
        />

        <FieldDescription>Forgot your password?</FieldDescription>
      </Field>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
      >
        {loading ? "Sending..." : "Send Reset Link"}
      </button>

      {message && (
        <p className="text-green-600 text-sm text-center">{message}</p>
      )}

      {error && <p className="text-red-600 text-sm text-center">{error}</p>}
    </form>
  );
};

export default ForgotPasswordFun;
