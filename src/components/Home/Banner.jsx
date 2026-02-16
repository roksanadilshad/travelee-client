import React from 'react';
import { FaSearch } from "react-icons/fa";
import { TiWorld } from "react-icons/ti";
import { FaPlane } from "react-icons/fa6";
import Search from '../Share/Search';

const Banner = () => {
    return (
        <section className="w-full bg-gradient-to-r from-[#e6f0f5] to-[#f7e8d8] py-16">
            <div className="w-11/12 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">

                {/* Left Content */}
                <div>
                    <p className="text-sm bg-blue-100 text-blue-600 inline-block px-3 py-1 rounded-full mb-4">
                        <span><FaPlane /></span> Your next adventure starts here
                    </p>

                    <h1 className="text-3xl text-black sm:text-4xl md:text-5xl font-extrabold leading-tight">
                        Discover the world,
                        <span className="text-orange-500">
                            one trip at a time
                        </span>
                    </h1>

                    <p className="mt-4 text-gray-600 text-base md:text-lg">
                        Handpicked destinations, smart planning tools, and unforgettable
                        experiences — start your journey today.
                    </p>

                    {/* 🔥 Search Box */}
                   <Search/>

                    {/* Stats */}
                    <div className="mt-6 flex items-center gap-8 text-sm text-gray-600">
                        <div>
                            <span className="font-bold text-black">3K+</span> Happy Travelers
                        </div>
                        <div>
                            <span className="font-bold text-black">2,000+</span> Destinations
                        </div>
                    </div>
                </div>

                {/* Right Image */}
                <div className="relative">
                    <img
                        src="https://i.ibb.co.com/tPHZnng5/baner.jpg"
                        alt="Travel"
                        className="rounded-3xl shadow-2xl w-full h-[400px] object-cover"
                    />
                </div>

            </div>
        </section>


    );
};

export default Banner;