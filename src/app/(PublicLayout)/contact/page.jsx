import React from 'react';
import { MdOutlineEmail } from "react-icons/md";
import { FaPhone } from "react-icons/fa6";
import { MdLocationPin } from "react-icons/md";

const ContactPage = () => {
    return (
        <section className="w-full flex justify-center py-20 px-3 bg-gradient-to-r from-[#f6f9fc] to-[#fff3e8]">
            <div className="w-11/12 max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-10 items-center">

                {/* Left Content */}
                <div>
                    <span className="inline-block mb-3 rounded-full bg-blue-100 px-4 py-1 text-sm font-medium text-blue-600">
                        Contact Us
                    </span>

                    <h2 className="text-3xl md:text-5xl font-extrabold leading-tight">
                        Let’s plan your next <br />
                        <span className="text-orange-500">adventure together</span>
                    </h2>

                    <p className="mt-4 text-gray-600 text-base md:text-lg max-w-md">
                        Have a question or need help planning your trip?
                        Our team is here to guide you every step of the way.
                    </p>

                    <div className="mt-6 space-y-3 text-gray-700">
                        <p className="flex items-center gap-2">
                            <MdOutlineEmail className="text-orange-500" />
                            support@travelee.com
                        </p>

                        <p className="flex items-center gap-2">
                            <FaPhone className="text-orange-500" />
                            +880 1234 567 890
                        </p>

                        <p className="flex items-center gap-2">
                            <MdLocationPin className="text-orange-500" />
                            Dhaka, Bangladesh
                        </p>
                    </div>
                </div>

                {/* Right Form Card */}
                <div className="bg-white rounded-3xl shadow-xl p-6 md:p-8">
                    <h3 className="text-xl font-bold mb-4">
                        Send us a message
                    </h3>

                    <form className="space-y-4">
                        <input
                            type="text"
                            placeholder="Your Name"
                            className="w-full rounded-xl border px-4 py-3 outline-none focus:ring-2 focus:ring-orange-400"
                        />

                        <input
                            type="email"
                            placeholder="Your Email"
                            className="w-full rounded-xl border px-4 py-3 outline-none focus:ring-2 focus:ring-orange-400"
                        />

                        <textarea
                            rows="4"
                            placeholder="Your Message"
                            className="w-full rounded-xl border px-4 py-3 outline-none focus:ring-2 focus:ring-orange-400"
                        />

                        <button
                            type="submit"
                            className="w-full rounded-full bg-orange-500 py-3 font-semibold text-white hover:bg-orange-600 transition"
                        >
                            Send Message
                        </button>
                    </form>
                </div>

            </div>
        </section>
    );
};

export default ContactPage;