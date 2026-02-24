
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
import { Suspense } from "react";
import TacticalLoader from "../loading";


export default function Home() {
  return (
   <div>
    <Banner/>
    <TrendingNow/>
    <SmartBuilderTeaser/>
    <Suspense fallback={<TacticalLoader/>}>

    <CategorizedExploration/>
    </Suspense>
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
