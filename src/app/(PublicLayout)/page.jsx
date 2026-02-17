
import Banner from "@/components/Home/Banner";
import HowItWorks from "@/components/Home/HowItWorks";
import USP from "@/components/Home/Usp";
import Testimonials from "@/components/Home/Testimonials";
import CTA from "@/components/Home/Cta";


export default function Home() {
  return (
   <div>
    <Banner/>
    
    <HowItWorks/>
    <Testimonials/>
    <USP/>
    <CTA/>
    
   </div>
  );
}
