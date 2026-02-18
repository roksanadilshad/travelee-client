"use client";
import React from "react";
import { Button } from "../ui/button";
import { signIn } from "next-auth/react";

const LogInButton = () => {
  return (
    <Button
      variant="ghost"
      onClick={() => signIn()}
      className="px-4 py-2 text-white cursor-pointer text-sm font-medium bg-primary hover:bg-primary/90 rounded-lg transition-colors duration-200"
    >
      Sign In
    </Button>
  );
};

export default LogInButton;
