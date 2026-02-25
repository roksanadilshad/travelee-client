"use client";

import React from "react";
import { useSession } from "next-auth/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Mail, 
  MapPin, 
  Phone, 
  Calendar, 
  Edit3, 
  ShieldCheck, 
  ExternalLink 
} from "lucide-react";

const MyProfile = () => {
  const { data: session } = useSession();
  const user = session?.user;

  // Professional Skeleton/Loading State
  if (!session) {
    return (
      <div className="max-w-4xl mx-auto mt-10 space-y-4 animate-pulse">
        <div className="h-40 bg-muted rounded-3xl w-full" />
        <div className="h-20 bg-muted rounded-xl w-1/2" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background/50 py-12 px-4">
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Main Profile Header Card */}
        <Card className="overflow-hidden border-none shadow-2xl bg-card rounded-3xl">
          {/* Banner with subtle pattern */}
          <div className="h-48 bg-primary relative overflow-hidden">
             <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
             <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          </div>

          <CardContent className="relative pt-0 pb-8 px-8">
            {/* Avatar positioning */}
            <div className="absolute -top-16 left-8 flex items-end gap-6">
              <div className="relative group">
                <div className="w-32 h-32 rounded-2xl border-4 border-card bg-secondary flex items-center justify-center text-secondary-foreground text-4xl font-bold shadow-xl overflow-hidden">
                  {user?.image ? (
                    <img src={user.image} alt={user.name || "User"} className="object-cover w-full h-full" />
                  ) : (
                    <span>{user?.name?.charAt(0)}</span>
                  )}
                </div>
                <button className="absolute bottom-2 right-2 p-1.5 bg-primary text-primary-foreground rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
                  <Edit3 size={14} />
                </button>
              </div>
            </div>

            {/* Action Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between pt-20 gap-4">
              <div>
                <div className="flex items-center gap-3">
                  <h2 className="text-3xl font-extrabold tracking-tight text-foreground">
                    {user?.name}
                  </h2>
                  <Badge variant="secondary" className="rounded-full px-3 py-1 bg-primary/10 text-primary border-none">
                    <ShieldCheck className="w-3 h-3 mr-1" />
                    {user?.role || "Member"}
                  </Badge>
                </div>
                <p className="text-muted-foreground flex items-center gap-2 mt-1">
                  <Mail className="w-4 h-4" /> {user?.email}
                </p>
              </div>

              <div className="flex gap-3">
                <Button variant="outline" className="rounded-xl">
                  View Public Profile
                </Button>
                <Button className="rounded-xl shadow-lg shadow-primary/20">
                  <Edit3 className="w-4 h-4 mr-2" /> Edit Profile
                </Button>
              </div>
            </div>

            <Separator className="my-8 opacity-50" />

            {/* Information Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                  Contact Information
                </h3>
                <div className="space-y-4">
                  <InfoRow icon={<Phone />} label="Phone" value={user?.phone || "Not provided"} />
                  <InfoRow icon={<MapPin />} label="Location" value="Bangladesh" />
                  <InfoRow icon={<Calendar />} label="Joined" value="January 2026" />
                </div>
              </div>

              {/* <div className="space-y-6">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                  Account Statistics
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <StatCard label="Visited Destinations" value="12" />
                  <StatCard label="Completed" value="98%" />
                </div>
              </div> */}
            </div>
          </CardContent>
        </Card>

        {/* Security / Settings Quick Access */}
        {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <QuickLink title="Security Settings" description="Update your password" />
          <QuickLink title="Notification Prefs" description="Manage alerts" />
          <QuickLink title="Linked Accounts" description="Manage OAuth" />
        </div> */}
      </div>
    </div>
  );
};

/* Helper Components to keep code clean */
/* Helper Components converted to plain JavaScript */
const InfoRow = ({ icon, label, value }) => (
  <div className="flex items-center gap-4 group">
    <div className="p-2 rounded-lg bg-muted text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary transition-colors">
      {React.cloneElement(icon, { size: 18 })}
    </div>
    <div>
      <p className="text-[10px] uppercase font-bold text-muted-foreground/60 leading-none mb-1">{label}</p>
      <p className="text-sm font-medium">{value}</p>
    </div>
  </div>
);

const StatCard = ({ label, value }) => (
  <div className="p-4 rounded-2xl bg-muted/30 border border-border/50">
    <p className="text-2xl font-bold">{value}</p>
    <p className="text-xs text-muted-foreground uppercase font-semibold mt-1">{label}</p>
  </div>
);

// const QuickLink = ({ title, description }) => (
//   <Card className="p-4 cursor-pointer hover:bg-muted/50 transition-colors border-dashed border-2 flex items-center justify-between group">
//     <div>
//       <h4 className="text-sm font-semibold">{title}</h4>
//       <p className="text-xs text-muted-foreground">{description}</p>
//     </div>
//     <ExternalLink size={16} className="text-muted-foreground group-hover:text-primary transition-colors" />
//   </Card>

// );

export default MyProfile;