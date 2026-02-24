
import Banner from "@/components/Home/Banner";
import HowItWorks from "@/components/Home/HowItWorks";
import USP from "@/components/Home/Usp";
import Testimonials from "@/components/Home/Testimonials";
import CTA from "@/components/Home/Cta";
import TrendingNow from "@/components/Home/TrendingCarousel";
import SmartBuilderTeaser from "@/components/Home/SmartBuilderTeaser";
import CategorizedExploration from "@/components/Home/CategorizedExploration";
import BudgetEstimator from "@/components/Home/BudgetEstimator";
import ReviewFeed from "@/components/Home/ReviewFeed";
import WeatherBlock from "@/components/Home/WeatherBlock";
import TripRoomPreview from "@/components/Home/TripRoomPreview";
import LanguageToggle from "@/components/Home/LanguageToggle";


export default function Home() {
  return (
   <div>
    <Banner/>
    <TrendingNow/>
    <SmartBuilderTeaser/>
    <CategorizedExploration/>
    <BudgetEstimator/>
    <ReviewFeed/>
    <WeatherBlock/>
    <TripRoomPreview/>
    {/* <LanguageToggle/> */}
    {/* <HowItWorks/>
    <Testimonials/>
    <USP/>
    <CTA/> */}
    
   </div>
  );
}
