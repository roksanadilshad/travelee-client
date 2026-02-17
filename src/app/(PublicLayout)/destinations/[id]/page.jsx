import DestinationDetailsCard from "@/components/Share/cards/DestinationDetailsCard";

export default async function DestinationDetailPage({ params }) {
  const { id } = await params;

  const res = await fetch(`http://localhost:500/destinations/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    return <p>Destination not found</p>;
  }

  const destination = await res.json();

  return (
    <div className="w-11/12 mx-auto">
      <DestinationDetailsCard destination={destination} />
    </div>
  );
}
