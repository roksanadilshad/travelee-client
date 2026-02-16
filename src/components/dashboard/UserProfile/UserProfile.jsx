"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, MapPin, Phone, Globe } from "lucide-react";

const UserProfile = () => {

  const user = {
    name: "Sara Ahmed",
    username: "saraahmed",
    avatar: "https://i.pravatar.cc/300?img=45", 
    bio: "Travel Enthusiast | Full Stack Developer | Exploring the world one city at a time.",
    email: "sara.ahmed@example.com",
    phone: "+880 1789 123456",
    location: "Dhaka, Bangladesh",
    website: "www.travelee-sara.com",
    stats: {
      projects: 15,
      trips: 12,
      countriesVisited: 8,
      certifications: 5,
    },
  };


  return (
    <div className="min-h-screen flex items-center justify-center py-6 md:p-6 bg-neutralBg">
      <Card className="w-full max-w-4xl p-0 shadow-xl rounded-3xl border border-border">
        <CardContent className="p-0">
          {/* Cover Section */}
          <div className="h-40 bg-primary rounded-t-3xl relative">
            <div className="absolute -bottom-16 left-8">
              <div className="h-32 w-32 overflow-hidden rounded-full border-4 border-background flex items-center justify-center shadow-lg">
                {user.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-full h-full object-cover rounded-full"
                  />
                ) : (
                  <span className="text-white text-4xl font-bold">
                    {user.username?.[0]?.toUpperCase() || "U"}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Profile Info */}
          <div className="pt-20 pb-10 px-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div>
                <h2 className="text-3xl font-bold text-foreground">
                  {user.name}
                </h2>
                <p className="text-muted-foreground mt-1">{user.bio}</p>
              </div>

              <Button className="bg-accent hover:bg-accent/90 text-accent-foreground rounded-2xl px-6 py-2 shadow-md">
                Edit Profile
              </Button>
            </div>

            {/* Contact Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10 text-sm">
              {user.email && (
                <div className="flex items-center gap-3 text-muted-foreground">
                  <Mail className="w-5 h-5 text-primary" />
                  <span>{user.email}</span>
                </div>
              )}
              {user.phone && (
                <div className="flex items-center gap-3 text-muted-foreground">
                  <Phone className="w-5 h-5 text-primary" />
                  <span>{user.phone}</span>
                </div>
              )}
              {user.location && (
                <div className="flex items-center gap-3 text-muted-foreground">
                  <MapPin className="w-5 h-5 text-primary" />
                  <span>{user.location}</span>
                </div>
              )}
              {user.website && (
                <div className="flex items-center gap-3 text-muted-foreground">
                  <Globe className="w-5 h-5 text-primary" />
                  <span>{user.website}</span>
                </div>
              )}
            </div>

            {/* About Section */}
            {user.bio && (
              <div className="mt-12">
                <h3 className="text-xl font-semibold text-secondary mb-3">
                  About Me
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {user.bio}
                </p>
              </div>
            )}

            {/* Stats Section */}
            {user.stats && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-10">
                {Object.entries(user.stats).map(([key, value]) => (
                  <div
                    key={key}
                    className="bg-muted rounded-2xl p-4 text-center"
                  >
                    <h4 className="text-2xl font-bold text-primary">{value}</h4>
                    <p className="text-sm text-muted-foreground capitalize">
                      {key.replace(/([A-Z])/g, " $1")}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserProfile;
