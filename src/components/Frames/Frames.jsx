"use client";

import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { Gradient } from "stripe-gradient";
import Fotter from "../home/Fotter";

export default function Frames() {
  useEffect(() => {
    const gradient = new Gradient();
    gradient.initGradient("#gradient-canvas");
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -40 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="relative min-h-screen overflow-hidden"
    >
      {/* STRIPE GRADIENT CANVAS */}
      <canvas
        id="gradient-canvas"
        className="absolute inset-0 w-full h-full -z-10"
        data-js-darken-top
        data-transition-in
      />

      {/* CONTENT */}
      <div className="px-6 sm:px-10 md:px-20 lg:px-32 py-28">
        {/* HEADER */}
        <div className="max-w-5xl mx-auto mb-20">
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white">
            AND WHAT ELSE?
          </h1>

          <p className="text-gray-300 tracking-widest mt-6 text-sm sm:text-base">
            A PEEK INTO MY OTHER LIVES &lt;3
          </p>
        </div>

        {/* IMAGES + HEADINGS */}
        <div className="max-w-5xl mx-auto space-y-32">
          {/* IMAGE 1 */}
          <div className="space-y-6">
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-widest uppercase text-white">
              Energy that hits harder ⛩️
            </h2>
            <h3 className="text-lg font-bold text-white">
              Unleash Your Inner Power. Stay Cool. Go Beyond.
            </h3>

            <motion.img
              src="/3.png"
              alt=""
              className="w-screen object-cover
              "
            />
          </div>

          {/* IMAGE 2 */}
          <div className="space-y-6">
            <h2 className=" text-2xl font-extrabold tracking-widest uppercase text-white">
              Moments That Make Legends 🏆
            </h2> 
            <h3 className="text-lg font-bold text-white">
              Inspired by focus discipline and greatness.
            </h3>

            <motion.img
              src="/2.png"
              alt=""
              className="w-full object-cover
              "
            />
          </div>

          {/* IMAGE 3 */}
          <div className="space-y-6">
            <h2 className=" text-2xl font-extrabold tracking-widest uppercase text-white">
              Life & Memories ❤️
            </h2>
            <h3 className="text-lg font-bold text-gray-100">
              Tiny Core-Memory Moments
            </h3>

            <motion.img
              src="/1.png"
              alt=""
              className="w-full object-cover
              "
            />
          </div>
        </div>
      </div>

    </motion.div>
  );
}
