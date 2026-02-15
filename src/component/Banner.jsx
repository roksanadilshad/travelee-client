import React from 'react';
import { FaSearch } from "react-icons/fa";
import { TiWorld } from "react-icons/ti";
import { FaPlane } from "react-icons/fa6";

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
                    <div className="mt-6 bg-white rounded-2xl shadow-lg p-3">
                        <div className="flex flex-col md:flex-row md:items-center gap-3">

                            {/* Input */}
                            <div className="flex items-center bg-gray-100 md:bg-transparent rounded-full px-4 py-2 flex-1">
                                <FaSearch className="text-gray-500 mr-2" />
                                <input
                                    type="text"
                                    placeholder="Where do you want to go?"
                                    className="flex-1 bg-transparent outline-none text-gray-700"
                                />
                            </div>

                            {/* Button */}
                            <button
                                className="w-full md:w-auto bg-orange-500 hover:bg-orange-600 
                text-white font-semibold px-6 py-2.5 rounded-full transition duration-300"
                            >
                                Plan Your Adventure
                            </button>
                        </div>
                    </div>

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