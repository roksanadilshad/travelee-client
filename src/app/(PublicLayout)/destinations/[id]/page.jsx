import DestinationDetailsCard from "@/components/Share/cards/DestinationDetailsCard";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

const DestinationDetailsPage = async ({ params }) => {
  const { id } = await params;

  // fetch destination
  const res = await fetch(`http://localhost:500/destinations/${id}`, {
    cache: "no-store",
  });
  const destination = await res.json();

  if (!destination || destination.error) {
    return (
      <div className="text-center mt-16 text-gray-500">
        Destination not found
      </div>
    );
  }

  return (
    <div className="w-11/12 mx-auto">
      <div className="mt-12 bg-white shadow-lg rounded-xl overflow-hidden">
        {/* Destination Details Card */}

        <DestinationDetailsCard destination={destination} />
      </div>

      {/* back to Destinations btn */}

      <span className="flex justify-center my-8">
        <Link href="/destinations">
          <button className="mt-4 bg-orange-500 text-white px-4 py-2 flex items-center rounded-lg hover:bg-amber-700 transition">
            <ArrowLeft className="w-5 h-5" /> Destinations
          </button>
        </Link>
      </span>


    </div>
  );
};

export default DestinationDetailsPage;
