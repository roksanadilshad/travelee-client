"use client";

import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import RelatedDestinationCard from "./RelatedDestinationCard";

const RelatedDestinationSlider = ({ destinations }) => {
  return (
    <div className="w-full">
      <Carousel
        showArrows={true}
        infiniteLoop={true}
        showThumbs={false}
        showStatus={false}
        autoPlay={true}
        interval={3000}
        centerMode={true}
        
        centerSlidePercentage={typeof window !== "undefined" && window.innerWidth < 768 ? 100 : 70}
        emulateTouch={true}
      >
        {destinations.map((item) => (
          <div key={item._id} className="px-2">
             <RelatedDestinationCard destination={item} />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default RelatedDestinationSlider;