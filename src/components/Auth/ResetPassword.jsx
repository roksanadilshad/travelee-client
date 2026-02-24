"use client";

import React, { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";

const ResetPassword = () => {
  const params = useSearchParams();
  const token = useMemo(() => params.get("token") || "", [params]);

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [msg, setMsg] = useState("");
    const [err, setErr] = useState("");
    const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");
    setErr("");

    if (!token) return setErr("Token missing.");
    if (password.length < 6)
      return setErr("Password must be at least 6 characters.");
    if (password !== confirm) return setErr("Passwords do not match.");

    try {
      const res = await axios.post(
        "http://localhost:500/user/reset-password",
        {
          token,
          newPassword: password,
        },
      );
      setMsg(res.data.message);
      setPassword("");
        setConfirm("");
        if (res.status === 200) { 
            router.push("/login")
        }
    } catch (error) {
      setErr(error?.response?.data?.message || "Server error");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">Reset Password</h1>

      <input
        type="password"
        placeholder="New password"
        className="border p-2 w-full mb-3"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <input
        type="password"
        placeholder="Confirm password"
        className="border p-2 w-full mb-3"
        value={confirm}
        onChange={(e) => setConfirm(e.target.value)}
      />

      <button className="bg-black text-white px-4 py-2 w-full">
        Update Password
      </button>

      {msg && <p className="text-green-600 mt-3">{msg}</p>}
      {err && <p className="text-red-600 mt-3">{err}</p>}
    </form>
  );
};

export default ResetPassword;
