import React from "react";
import Fotter from "../home/Fotter";
import { motion } from "framer-motion";

export default function Frames() {
  return (
    <>
      <motion.div
        initial={{ y: "-100%", opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: "100%", opacity: 0 }}
        transition={{
          type: "spring",
          stiffness: 50,
          damping: 15,
          duration: 1,
        }}
      >
        {/* PAGE WRAP */}
        <div className="min-h-screen w-full px-6 sm:px-10 md:px-20 lg:px-32 py-24 bg-[#eef3f8]">

          {/* HEADER */}
          <div className="max-w-5xl mx-auto mb-20">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-gray-800">
              AND WHAT ELSE?
            </h1>

            <p className="text-gray-500 tracking-widest mt-3 text-sm sm:text-base">
              A PEEK INTO MY OTHER LIVES &lt;3
            </p>
          </div>

          {/* STORY BLOCK 1 */}
          <div className="max-w-5xl mx-auto mb-16">
            <p className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">
              [&] I’ve been an ambassador for my favorite energy drink, Celsius.
            </p>

            {/* Images Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <img
                src="https://i.ibb.co/7zKQmZT/celsius1.jpg"
                className="w-full rounded-lg object-cover"
                alt=""
              />

              <img
                src="https://i.ibb.co/WvHMWZp/celsius2.jpg"
                className="w-full rounded-lg object-cover"
                alt=""
              />

              <img
                src="https://i.ibb.co/5F9x5wM/celsius3.jpg"
                className="w-full rounded-lg object-cover"
                alt=""
              />
            </div>
          </div>

          {/* STORY BLOCK 2 */}
          <div className="max-w-5xl mx-auto mb-16">
            <p className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">
              [&] I also build small digital experiences just for fun.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <img
                src="https://i.ibb.co/bKWk8Ht/mockup1.png"
                className="w-full rounded-lg"
                alt=""
              />

              <img
                src="https://i.ibb.co/G7sW0dq/mockup2.png"
                className="w-full rounded-lg"
                alt=""
              />

              <img
                src="https://i.ibb.co/PT0JpHP/mockup3.png"
                className="w-full rounded-lg"
                alt=""
              />
            </div>
          </div>

          {/* STORY BLOCK 3 */}
          <div className="max-w-5xl mx-auto mb-16">
            <p className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">
              [&] Sometimes life gives tiny core-memory moments too.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <img
                src="https://i.ibb.co/ZhK5fzv/memory1.jpg"
                className="w-full rounded-lg"
                alt=""
              />

              <img
                src="https://i.ibb.co/Jy9dpWz/memory2.jpg"
                className="w-full rounded-lg"
                alt=""
              />

              <img
                src="https://i.ibb.co/8z4M2h5/memory3.jpg"
                className="w-full rounded-lg"
                alt=""
              />
            </div>
          </div>

        </div>

        <Fotter />
      </motion.div>
    </>
  );
}
