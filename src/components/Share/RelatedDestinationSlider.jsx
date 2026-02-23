"use client";

import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import DestinationCard from "./cards/DestinationCard";
import { useEffect, useState } from "react";

const RelatedDestinationSlider = ({ destinations }) => {
  const [percentage, setPercentage] = useState(30);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;

      if (width < 768) {
        setPercentage(100);
      } else if (width >= 768 && width <= 1024) {
        setPercentage(50);
      } else {
        setPercentage(30);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="w-full">
      <Carousel
        showArrows={true}
        infiniteLoop={true}
        showThumbs={false}
        showStatus={false}
        autoPlay={true}
        interval={2000}
        centerMode={true}
        centerSlidePercentage={percentage}
        emulateTouch={true}
        stopOnHover={false}
        swipeable={true}
      >
        {destinations.map((item) => (
          <div key={item._id} className="px-2">
           
            <DestinationCard destination={item}></DestinationCard>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default RelatedDestinationSlider;
