import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

import BentoCard from "./BentoCard";
import NowPlaying from "./NowPlaying";

/* ------------ Text Rotations ------------ */
const headlines = [
  "Building Experiences",
  "Creating UIs",
  "Animating Ideas",
  "Full-Stack Craft",
  "Turning Code Into Magic",
];

/* ------------ Posters ------------ */
const posters = [
  "https://static0.colliderimages.com/wordpress/wp-content/uploads/2023/09/everything-now-netflix-poster.jpg",
  "https://w0.peakpx.com/wallpaper/731/86/HD-wallpaper-jon-snow-got-poster-game-game-of-thrones-jon-snow-of-thrones.jpg",
  "https://static.toiimg.com/thumb/msid-115901762,width-400,resizemode-4/115901762.jpg",
  "https://mir-s3-cdn-cf.behance.net/project_modules/1400/f8b2ef92655071.5e505bf7132ab.png",
  "https://alternativemovieposters.com/wp-content/uploads/2017/05/chelsea_saul.jpg",
  "https://wallpapercave.com/wp/wp3050967.jpg"
];

export default function ILander({ menuOpen }) {
  const [expanded, setExpanded] = useState(false);
  const [headlineIndex, setHeadlineIndex] = useState(0);
  const [posterIndex, setPosterIndex] = useState(0);

  const containerRef = useRef(null);

  /* -------- Rotate Headlines -------- */
  useEffect(() => {
    const t = setInterval(() => {
      setHeadlineIndex((i) => (i + 1) % headlines.length);
    }, 2000);

    return () => clearInterval(t);
  }, []);

  /* -------- Auto-play Posters when expanded -------- */
  useEffect(() => {
    if (!expanded) return;

    const t = setInterval(() => {
      setPosterIndex((i) => (i + 1) % posters.length);
    }, 3500);

    return () => clearInterval(t);
  }, [expanded]);

  /* -------- Swipe Logic -------- */
  const dragEnd = (_, info) => {
    if (info.offset.x < -80) setPosterIndex((i) => (i + 1) % posters.length);
    else if (info.offset.x > 80) setPosterIndex((i) => (i - 1 + posters.length) % posters.length);
  };

  /* -------- Track viewport width -------- */
  const [vw, setVw] = useState(window.innerWidth);
  useEffect(() => {
    const resize = () => setVw(window.innerWidth);
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  /* =======================================================================
     🎯 UNIVERSAL Z-INDEX FIX
     menuOpen → ILander goes behind menu (z-5)
     expanded → ILander MUST stay above content (z-2000)
     default → z-1200
  ======================================================================= */
  let islandZ = "z-[1200]";

  if (expanded) islandZ = "z-[2000]";     // Always above content when expanded
  if (menuOpen) islandZ = "z-[5]";        // Push behind navbar slide menu


  /* =======================================================================
     📱 MOBILE + TABLET (<1024px)
  ======================================================================= */
  if (vw < 1024) {
    return (
      <>
        {/* Floating Pill (Collapsed) */}
        {!expanded && (
          <motion.div
            onClick={() => setExpanded(true)}
            className={`
              fixed top-[86px]
              ${vw < 786 ? "left-1/2 -translate-x-1/2" : "left-[calc(50%+48px)] -translate-x-1/2"}
              w-[240px] h-[44px]
              bg-white/30 backdrop-blur-xl
              rounded-full border border-white/20
              flex items-center justify-center
              ${islandZ}
              shadow-lg
            `}
          >
            <p className="text-[13px] font-semibold text-black truncate">
              {headlines[headlineIndex]}
            </p>
          </motion.div>
        )}

        {/* Bottom Sheet */}
        {expanded && (
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 80, damping: 12 }}
            className={`
              fixed bottom-0 left-0 w-full h-[82vh]
              bg-white rounded-t-3xl shadow-2xl p-6
              ${islandZ}
              overflow-y-auto
            `}
          >
            <button
              onClick={() => setExpanded(false)}
              className="absolute top-4 right-4 text-3xl text-gray-600"
            >
              ×
            </button>

            <h2 className="text-xl font-semibold text-gray-800 mb-4">Insights</h2>

            <img
              src={posters[posterIndex]}
              className="w-full h-56 object-cover rounded-2xl mb-6"
            />

            <div className="grid grid-cols-1 gap-4">
              <NowPlaying />
              <BentoCard title="🔥 Focus Time" value="2.6 hrs" />
              <BentoCard title="🚶 Steps" value="5,762" />
              <BentoCard title="⚡ Click Rate" value="89%" />
            </div>
          </motion.div>
        )}
      </>
    );
  }


  /* =======================================================================
     🖥 DESKTOP MODE (≥1024px)
  ======================================================================= */
  return (
    <motion.div
      ref={containerRef}
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
      className={`
        fixed top-10
        left-[calc(50%+48px)]
        -translate-x-1/2
        ${islandZ}
        bg-white/20 backdrop-blur-2xl
        border border-white/20
        rounded-[26px]
        shadow-[0_10px_30px_rgba(0,0,0,0.1)]
        transition-all duration-500
        overflow-hidden
        ${expanded
          ? "w-[85vw] max-w-[1400px] h-[500px] p-6"
          : "w-[260px] h-[50px] p-3"}
      `}
    >
      {!expanded && (
        <p className="text-center font-semibold text-black truncate">
          {headlines[headlineIndex]}
        </p>
      )}

      {expanded && (
        <div className="grid grid-cols-[1.2fr_2fr] gap-6 h-full">

          {/* Poster */}
          <div className="relative rounded-2xl overflow-hidden">
            <motion.div
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              onDragEnd={dragEnd}
              className="absolute inset-0"
            >
              {posters.map((src, i) => (
                <motion.img
                  key={i}
                  src={src}
                  draggable={false}
                  className="absolute inset-0 w-full h-full object-cover"
                  animate={{
                    x: posterIndex === i ? 0 : i < posterIndex ? -200 : 200,
                    opacity: posterIndex === i ? 1 : 0,
                  }}
                  transition={{ type: "spring", stiffness: 120, damping: 18 }}
                />
              ))}
            </motion.div>
          </div>

          {/* Bento Grid */}
          <div className="grid grid-cols-2 gap-4">
            <NowPlaying />
            <BentoCard title="🚶 Steps" value="5,762" />
            <BentoCard title="🔥 Focus Time" value="2.6 hrs" />
            <BentoCard title="⚡ Click Rate" value="89%" />
          </div>

        </div>
      )}
    </motion.div>
  );
}
