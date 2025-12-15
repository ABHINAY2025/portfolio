import React from "react";
import { NavLink } from "react-router-dom";
import { FaLinkedinIn, FaGithub, FaInstagram, FaXTwitter } from "react-icons/fa6";
import { motion, AnimatePresence } from "framer-motion";

const captions = [
  "Made with ❤️ and clean code.",
  "Handcrafted in React.",
  "Engineered with elegance.",
  "Powered by imagination.",
];

// 💫 Smooth scroll text component
function SmoothScrollText({ captions }) {
  const [index, setIndex] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setIndex((i) => (i + 1) % captions.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative overflow-hidden h-8 w-full">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -30, opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="absolute left-12 right-0 text-gray-700 text-base sm:text-lg md:text-xl text-left sm:text-center"
        >
          {captions[index]}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="w-full mt-10 pt-14 pb-7 bg-gradient-to-br from-blue-200 via-pink-200 to-purple-200">

      {/* GRID STRUCTURE */}
      <div className="container mx-auto px-6 sm:px-10 grid grid-cols-1 md:grid-cols-3 gap-12 items-start">

        {/* LEFT SECTION — Animated Text */}
        <div className="flex flex-col justify-center md:items-start items-center">
          <SmoothScrollText captions={captions} />
        </div>

        {/* CENTER SECTION — NAVIGATION */}
        <div className="flex flex-col items-center text-center">
          <h3 className="text-gray-800 font-semibold text-sm tracking-wide mb-3">
            NAVIGATIONS
          </h3>

          <ul className="flex flex-col gap-2 text-base text-gray-900 text-left font-light">
            <li><NavLink className="hover:text-blue-700 transition" to="/">HOME</NavLink></li>
            <li><NavLink className="hover:text-blue-700 transition" to="/about">ABOUT</NavLink></li>
            <li><NavLink className="hover:text-blue-700 transition" to="/blog">BLOG</NavLink></li>
            <li><NavLink className="hover:text-blue-700 transition" to="/lab">LAB</NavLink></li>
            <li><NavLink className="hover:text-blue-700 transition" to="/newsroom">NEWSROOM</NavLink></li>
            <li><NavLink className="hover:text-blue-700 transition" to="/contact">CONTACT</NavLink></li>
          </ul>
        </div>

        {/* RIGHT SECTION — CONTACT + SOCIAL ICONS */}
        <div className="flex flex-col items-center md:items-end text-center md:text-right">

          <a
            href="mailto:abhinayabhi2025@gmail.com"
            className="text-blue-700 text-sm font-semibold hover:text-blue-900 transition"
          >
            Reach Out
          </a>

          {/* SOCIAL ICONS */}
          <div className="flex flex-row gap-5 mt-4">

            <a
              href="https://www.linkedin.com/in/abhinay-ma/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-800 text-2xl hover:text-blue-600 transition transform hover:scale-110"
            >
              <FaLinkedinIn />
            </a>

            <a
              href="https://github.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-800 text-2xl hover:text-black transition transform hover:scale-110"
            >
              <FaGithub />
            </a>

            <a
              href="https://instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-800 text-2xl hover:text-pink-600 transition transform hover:scale-110"
            >
              <FaInstagram />
            </a>

            <a
              href="https://twitter.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-800 text-2xl hover:text-blue-400 transition transform hover:scale-110"
            >
              <FaXTwitter />
            </a>

          </div>

        </div>

      </div>

    </footer>
  );
}
