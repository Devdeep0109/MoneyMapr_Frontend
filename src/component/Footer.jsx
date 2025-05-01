import React from "react";
import { Github, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="w-full bg-white text-gray-700 mt-16">
      <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col sm:flex-row justify-between items-center">
        {/* Logo or Brand Name */}
        <div className="text-2xl font-bold text-purple-700  sm:mb-0">
          MoneyMapr
        </div>

        {/* Footer Navigation */}
        <div className="flex flex-wrap gap-4 justify-center text-sm font-medium">
          <a href="/" className="hover:text-purple-800 transition">
            Home
          </a>
          <a href="/about" className="hover:text-purple-800 transition">
            About
          </a>
          <a href="/contact" className="hover:text-purple-800 transition">
            Contact
          </a>
        </div>

        {/* Social Icons */}
        <div className="flex space-x-4 mt-1 sm:mt-0">
          <a
            href="https://github.com/Devdeep0109"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-purple-800 transition"
          >
            <Github />
          </a>
          <a
            href="https://linkedin.com/in/your-profile"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-purple-800 transition"
          >
            <Linkedin />
          </a>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center text-xs text-gray-500 py-4">
        © {new Date().getFullYear()} MoneyMapr. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
