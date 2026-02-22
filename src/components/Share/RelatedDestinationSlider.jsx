"use client";

import React, { useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import RelatedDestinationCard from "./RelatedDestinationCard";

const RelatedDestinationSlider = ({ destinations }) => {
  const [slidePercentage, setSlidePercentage] = useState(70);
console.log(destinations.length);
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setSlidePercentage(100);
      } else {
        setSlidePercentage(70);
      }
    };

    handleResize(); // run on mount
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="w-full">
      <Carousel
        showArrows
        infiniteLoop
        showThumbs={false}
        showStatus={false}
        autoPlay
        interval={3000}
        centerMode
        centerSlidePercentage={slidePercentage}
        emulateTouch
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