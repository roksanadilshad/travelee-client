import DestinationCard from "@/components/Share/cards/DestinationCard";
import Banner from "@/components/Home/Banner";
import HowItWorks from "@/components/Home/HowItWorks";
import USP from "@/components/Home/Usp";
import Testimonials from "@/components/Home/Testimonials";
import CTA from "@/components/Home/Cta";


export default function Home() {
  return (
   <div>
    <Banner/>
    <DestinationCard></DestinationCard>
    <HowItWorks/>
    <Testimonials/>
    <USP/>
    <CTA/>
    
   </div>
  );
}
