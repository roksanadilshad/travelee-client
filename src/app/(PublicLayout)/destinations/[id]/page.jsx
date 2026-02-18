import DestinationDetailsCard from "@/components/Share/cards/DestinationDetailsCard";

const DestinationDetailsPage = async ({ params }) => {
  const { id } = await params;

  // fetch destination
  const res = await fetch(`http://localhost:500/destinations/${id}`, {
    cache: "no-store",
  });
  const destination = await res.json();

  if (!destination || destination.error) {
    return <div className="text-center mt-16 text-gray-500">Destination not found</div>;
  }

  return (
    <div className="max-w-11/12 mx-auto my-12 bg-white shadow-lg rounded-xl overflow-hidden">
     <DestinationDetailsCard destination={destination}/>
    
    </div>
  );
};

export default DestinationDetailsPage;
