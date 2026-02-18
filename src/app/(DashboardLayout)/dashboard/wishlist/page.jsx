"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Calendar } from "lucide-react";

const wishlistItems = [
  {
    id: 1,
    destination: "Bali, Indonesia",
    note: "Beach vacation 🌴",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 2,
    destination: "Santorini, Greece",
    note: "Romantic getaway 💙",
    image:
      "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 3,
    destination: "Kyoto, Japan",
    note: "Cherry blossom season 🌸",
    image:
      "https://images.unsplash.com/photo-1549692520-acc6669e2f0c?auto=format&fit=crop&w=800&q=80",
  },
];

const Wishlist = () => {
  return (
    <div className="min-h-screen bg-background p-6">
      <h1 className="text-3xl font-bold text-foreground mb-8">My Wishlist</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {wishlistItems.map((item) => (
          <Card
            key={item.id}
            className="rounded-3xl shadow-lg overflow-hidden border border-border"
          >
            <div
              className="h-48 bg-cover bg-center"
              style={{ backgroundImage: `url(${item.image})` }}
            ></div>

            <CardContent className="p-6">
              <h2 className="text-xl font-semibold text-foreground">
                {item.destination}
              </h2>
              <p className="text-sm text-muted-foreground mt-2">{item.note}</p>

              <div className="flex justify-between mt-4 items-center">
                <Button className="bg-accent text-accent-foreground hover:bg-accent/90 rounded-2xl px-4 py-2 shadow-sm">
                  View Trip
                </Button>
                <Button className="bg-destructive text-accent-foreground hover:bg-destructive/90 rounded-2xl px-4 py-2 shadow-sm">
                  Remove
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
