import Image from "next/image";
import React from "react";

const DestinationCard = () => {
  // ----------------------------->>>>
  const fakeDestinations = [
    {
      id: "1",
      image:
        "https://images.contentstack.io/v3/assets/blt06f605a34f1194ff/blt652fe43425222b58/676451b8ccead143f23f2e91/iStock-847408280-Header_Mobile.jpg?fit=crop&disable=upscale&auto=webp&quality=60&crop=smart",
      name: "Paris",
      country: "France",
      city: "Paris",
      description:
        "Paris is known as the city of lights — beautiful streets, cafes, art and history!",
      avgBudget: 150000,
      bestSeason: "Spring",
      popularityScore: 4.9,
    },
    {
      id: "2",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQa3oBjEKx2nOE-JMxKQhZiEvl4xAH2KSHgkw&s",
      name: "Tokyo",
      country: "Japan",
      city: "Tokyo",
      description:
        "Tokyo offers a mix of tradition and technology — temples, sushi and neon lights!",
      avgBudget: 180000,
      bestSeason: "Autumn",
      popularityScore: 4.7,
    },
    {
      id: "3",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRj5K5IMVpjZ2okJjXzZnIgnFNQKeWafFfqg&s",
      name: "Sydney",
      country: "Australia",
      city: "Sydney",
      description:
        "Sydney is famous for its harbour, Opera House and stunning beaches!",
      avgBudget: 170000,
      bestSeason: "Summer",
      popularityScore: 4.6,
    },
    {
      id: "5",
      image:
        "https://tourismmedia.italia.it/is/image/mitur/20220127150143-colosseo-roma-lazio-shutterstock-756032350-1?wid=1600&hei=900&fit=constrain,1&fmt=webp",
      name: "Rome",
      country: "Italy",
      city: "Rome",
      description:
        "Rome is full of history — Colosseum, fountains, pasta and old streets!",
      avgBudget: 130000,
      bestSeason: "Spring",
      popularityScore: 4.8,
    },
  ];

  const destination = fakeDestinations[0];

  // ------------------------------->>>>

  return (
    <div className="max-w-sm bg-white rounded-lg shadow-md hover:shadow-xl transition duration-300">
      <div className="relative w-full h-48">
        <Image
          src={destination.image}
          alt={destination.name}
          fill={true}
          className="object-cover rounded-t-lg"
        />
      </div>

      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-900">
          {destination.name}, {destination.country}
        </h3>

        <p className="text-sm text-gray-600">{destination.city}</p>

        <p className="mt-2 text-gray-700 text-sm line-clamp-2">
          {destination.description}
        </p>

        <div className="flex justify-between items-center mt-3">
          <span className="text-green-600 font-semibold">
            💰 {destination.avgBudget}
          </span>

          <span className="text-yellow-500 font-semibold">
            ⭐ {destination.popularityScore}
          </span>
        </div>

        <button className="mt-3 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600">
          View Details
        </button>
      </div>
    </div>
  );
};

export default DestinationCard;
