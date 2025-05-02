import React from "react";
import Navbar from "./Navbar";
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";

const Contact = () => {
  return (
    <div className="bg-white min-h-screen">
      <Navbar />

      <div className="grid md:grid-cols-2 min-h-[85vh]">
        {/* Left Side with Info */}
        <div className="bg-gradient-to-br from-blue-100 to-purple-200 text-gray-800 p-10 flex flex-col justify-center">
          <h1 className="text-4xl font-bold mb-4">Let’s Connect</h1>
          <p className="mb-6 text-lg">
            We'd love to hear your ideas, feedback, or any queries you have!
            Your thoughts help us build a better budgeting experience.
          </p>

          <div className="space-y-4 text-base">
            <div className="flex items-center gap-3">
              <FaEnvelope className="text-indigo-600 text-xl" />
              <span>support@moneymapr.com</span>
            </div>
            <div className="flex items-center gap-3">
              <FaPhoneAlt className="text-indigo-600 text-xl" />
              <span>+91 98765 XXXXX</span>
            </div>
            <div className="flex items-center gap-3">
              <FaMapMarkerAlt className="text-indigo-600 text-xl" />
              <span>BIT Durg Campus, India</span>
            </div>
          </div>
        </div>

        {/* Right Side with Form */}
        <div className="p-10 flex items-center justify-center bg-white">
          <form className="w-full max-w-md bg-white p-8 rounded-xl shadow-xl space-y-6 border border-gray-200">
            <h2 className="text-2xl font-bold text-indigo-700 text-center">
              Send a Message
            </h2>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Your Name
              </label>
              <input
                type="text"
                placeholder="Your Name"
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-300"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-300"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Message
              </label>
              <textarea
                rows="4"
                placeholder="How can we help you?"
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-300"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-md transition duration-200"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
