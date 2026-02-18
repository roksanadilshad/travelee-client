"use client";

import { useSession, signOut } from "next-auth/react";
import { useCallback } from "react";

export function useAuth() {
  const { data: session, status } = useSession();

  const logout = useCallback(() => {
    signOut();
  }, []);

  return {
    user: session?.user ?? null,
    session,
    isAuthenticated: status === "authenticated",
    isLoading: status === "loading",
    logout,
  };
}
