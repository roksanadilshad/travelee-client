"use client";
import { useSession, signOut } from "next-auth/react";
import { useCallback } from "react";

export function useAuth() {
  const { data: session, status, update } = useSession();

  const logout = useCallback(() => {
    signOut({ callbackUrl: "/login" });
  }, []);

  // Session user object theke status check
  const isBlocked = session?.user?.status === "blocked";

  return {
    user: session?.user ?? null,
    token: session?.accessToken ?? null,
    session,
    update,
    // Blocked user kakhonoi authenticated hobe na
    isAuthenticated: status === "authenticated" && !isBlocked,
    isBlocked,
    isLoading: status === "loading",
    logout,
  };
}