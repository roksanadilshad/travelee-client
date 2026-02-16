import DestinationCard from "@/components/Share/cards/DestinationCard";
import Banner from "@/components/Home/Banner";
import HowItWorks from "@/components/Home/HowItWorks";
import USP from "@/components/Home/Usp";


export default function Home() {
  return (
   <div>
    <Banner/>
    <DestinationCard></DestinationCard>
    <HowItWorks/>
    <USP/>
    
   </div>
  );
}
