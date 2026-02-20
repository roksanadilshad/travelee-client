"use client";

import React from "react";
import { useSession } from "next-auth/react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, MapPin, Phone, Globe } from "lucide-react";

const MyProfile = () => {
  const { data: session } = useSession();

  const user = session?.user;

  // if (!user) {
  //   return <div className="p-10 text-center">Loading...</div>;
  // }

  return (
    <div className="min-h-screen flex  justify-center">
      <Card className="w-full p-0 max-w-4xl shadow-xl rounded-3xl border border-border">
        <CardContent className="p-0">
          <div className="h-40 bg-primary rounded-t-3xl relative">
            <div className="absolute -bottom-16 left-8">
              <div className="w-32 h-32 rounded-full border-4 border-background bg-secondary flex items-center justify-center text-white text-4xl font-bold shadow-lg">
                {user?.name?.charAt(0)}
              </div>
            </div>
          </div>

          <div className="pt-20 pb-10 px-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div>
                <h2 className="text-3xl font-bold text-foreground">
                  {user?.name}
                </h2>
                <p className="text-muted-foreground mt-1">
                  {user?.role || "User"}
                </p>
              </div>

              <Button>Edit Profile</Button>
            </div>

            <div className="mt-10 text-sm space-y-4">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary" />
                <span>{user?.email}</span>
              </div>

              {/* {user.phone && (
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-primary" />
                  <span>{user.phone}</span>
                </div>
              )} */}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MyProfile;
