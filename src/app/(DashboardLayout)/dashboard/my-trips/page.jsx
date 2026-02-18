"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Calendar, Star } from "lucide-react";

const trips = [
  {
    id: 1,
    destination: "Paris, France",
    date: "2026-03-20",
    status: "Completed",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1543349683-939d3e3e9174?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 2,
    destination: "Tokyo, Japan",
    date: "2026-04-15",
    status: "Upcoming",
    rating: 0,
    image:
      "https://images.unsplash.com/photo-1572950811231-7c5e327dc1d3?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 3,
    destination: "Sydney, Australia",
    date: "2026-01-10",
    status: "Completed",
    rating: 4,
    image:
      "https://images.unsplash.com/photo-1506973035872-a4e6b34e1973?auto=format&fit=crop&w=800&q=80",
  },
];

const MyTrips = () => {
  return (
    <div className="min-h-screen bg-background p-6">
      <h1 className="text-3xl font-bold text-foreground mb-8">My Trips</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {trips.map((trip) => (
          <Card
            key={trip.id}
            className="rounded-3xl shadow-lg overflow-hidden border border-border"
          >
            <div
              className="h-48 bg-cover bg-center"
              style={{ backgroundImage: `url(${trip.image})` }}
            ></div>

            <CardContent className="p-6">
              <h2 className="text-xl font-semibold text-foreground">
                {trip.destination}
              </h2>

              <div className="flex items-center gap-2 text-sm text-muted-foreground mt-2">
                <MapPin className="w-4 h-4 text-primary" /> Location
                <Calendar className="w-4 h-4 text-primary ml-2" /> {trip.date}
              </div>

              <p
                className={`mt-2 text-sm font-medium ${
                  trip.status === "Completed" ? "text-green-600" : "text-accent"
                }`}
              >
                {trip.status}
              </p>

              <div className="flex items-center mt-3 gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < trip.rating ? "text-accent" : "text-muted-foreground"
                    }`}
                  />
                ))}
              </div>

              <Button className="mt-4 w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-2xl">
                View Details
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MyTrips;
