import React from "react";
import { FaLinkedinIn } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";

function Fotter() {
  return (
    <footer className="relative min-h-[30vh] overflow-hidden">

      {/* ================= BASE BACKGROUND ================= */}
      <div
        className="absolute inset-0 -z-20"
        style={{
          background:
            "linear-gradient(135deg,#8fd3ff 0%,#bcd8ff 45%,#f3c2dd 100%)"
        }}
      />

      {/* ================= WAVES ================= */}
      <div className="absolute bottom-0 left-0 w-full h-[85%] overflow-hidden -z-10 grain">
        {/* ↑ increased from 30% → 45% */}

        <svg
          viewBox="0 0 1440 450"
          preserveAspectRatio="none"
          className="absolute bottom-0 w-[130%] h-full left-[-15%]"
          /* ↑ scale up for bigger curves */
        >

          {/* BACK WAVE */}
          <motion.path
            d="
              M0,130
              C180,40 360,220 620,180
              C880,140 1080,280 1280,220
              C1380,200 1420,220 1440,210
              L1440,450 L0,450 Z"
            fill="rgba(140,215,255,0.90)"
            animate={{ x: [0, -70, 0] }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />

          {/* MIDDLE WAVE */}
          <motion.path
            d="
              M0,220
              C200,160 400,340 680,300
              C960,260 1160,380 1340,320
              C1400,300 1430,310 1440,305
              L1440,450 L0,450 Z"
            fill="rgba(255,180,215,0.85)"
            animate={{ x: [0, 110, 0] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />

          {/* FRONT WAVE */}
          <motion.path
            d="
              M0,300
              C200,260 420,380 700,360
              C980,340 1160,420 1340,390
              C1400,380 1425,395 1440,392
              L1440,450 L0,450 Z"
            fill="rgba(180,225,255,0.95)"
            animate={{ x: [0, -140, 0] }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />

        </svg>
      </div>

      {/* ================= FOOTER CONTENT ================= */}

      <div className="relative z-20">

        {/* TOP INFO BAR */}
        <div className="p-10 flex justify-between items-center border-b border-white/40">
          <div className="text-white text-lg tracking-wide">
            ABHINAY_MA
          </div>

          <div className="flex flex-col gap-4">
            <p className="text-white text-lg">
              Let's work together.
            </p>
            <a
              href="mailto:abhinayabhi2025@gmail.com"
              className="text-blue-300 font-semibold hover:text-blue-200"
            >
              Reach out
            </a>
          </div>
        </div>

        {/* NAV + SOCIAL */}
        <div className="flex justify-between items-end p-10">

          <ul className="flex flex-col gap-5 text-white text-lg">
            <li><NavLink to="/Frames">Frames</NavLink></li>
            <li><NavLink to="/about">About Me</NavLink></li>
            <li><NavLink to="/">Work</NavLink></li>
            <li><NavLink to="/contact">Resume</NavLink></li>
          </ul>

          <a
            href="https://www.linkedin.com/in/abhinay-ma/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white text-4xl hover:text-blue-200"
          >
            <FaLinkedinIn />
          </a>

        </div>

      </div>

    </footer>
  );
}

export default Fotter;
