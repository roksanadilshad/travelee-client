import DestinationDetailsCard from "@/components/Share/cards/DestinationDetailsCard";

import RelatedDestinationSlider from "@/components/Share/RelatedDestinationSlider";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";

const DestinationDetailsPage = async ({ params }) => {
  const { id } = await params;

  // fetch destination
  const res = await fetch(`https://travelee-server.vercel.app/destinations/${id}`, {
    cache: "no-store",
  });
  const destination = await res.json();

  // fetch related destinations
  const relatedRes = await fetch(
    `https://travelee-server.vercel.app/destinations/${id}/related`,
    { cache: "no-store" },
  );
  const relatedDestinations = await relatedRes.json();

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
          <button className="mt-4 bg-primary text-white px-4 py-2 flex items-center rounded-lg hover:bg-amber-700 transition">
            <ArrowLeft className="w-5 h-5" /> Destinations
          </button>
        </Link>
      </span>

      {/* Related Destinations */}

      {relatedDestinations && relatedDestinations.length > 0 && (
        <div className="w-11/12 mx-auto">
          <div className="mt-12 bg-white shadow-lg rounded-xl ">
            <div className="my-12">
              <h2 className="text-3xl pt-8 font-semibold mb-6 text-center">
                Related Destinations
              </h2>

              <div className="px-4 py-8">
                <RelatedDestinationSlider destinations={relatedDestinations} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DestinationDetailsPage;
