import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

import BentoCard from "./BentoCard";
import NowPlaying from "./NowPlaying";

/* ---------------- DATA ---------------- */

const words = [
  "Building Experiences",
  "Creating UIs",
  "Animating Ideas",
  "Full-Stack Craft",
  "Turning Code Into Magic",
];

const posters = [
  "https://static0.colliderimages.com/wordpress/wp-content/uploads/2023/09/everything-now-netflix-poster.jpg",
  "https://w0.peakpx.com/wallpaper/731/86/HD-wallpaper-jon-snow-got-poster-game-game-of-thrones-jon-snow-of-thrones.jpg",
  "https://static.toiimg.com/thumb/msid-115901762,width-400,resizemode-4/115901762.jpg",
  "https://mir-s3-cdn-cf.behance.net/project_modules/1400/f8b2ef92655071.5e505bf7132ab.png",
  "https://alternativemovieposters.com/wp-content/uploads/2017/05/chelsea_saul.jpg",
  "https://wallpapercave.com/wp/wp3050967.jpg",
  "https://pbs.twimg.com/media/GR9WRruXQAARXqv?format=jpg",
  "https://m.media-amazon.com/images/I/71o1aRN1FJL.jpg",
  "https://boldoutline.in/wp-content/uploads/2018/06/netflix-cover-770x385.jpg",
  "https://streambly.com.au/sites/default/files/article_images/money_heist_5_poster.jpeg"
];

export default function ILander() {

  const [headlineIndex, setHeadlineIndex] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const [posterIndex, setPosterIndex] = useState(0);

  const containerRef = useRef(null);

  /* -------- Headline Swap -------- */
  useEffect(() => {
    const t = setInterval(() => {
      setHeadlineIndex(i => (i + 1) % words.length);
    }, 2000);
    return () => clearInterval(t);
  }, []);

  /* -------- Poster Autoplay -------- */
  useEffect(() => {
    if (!expanded) return;

    const t = setInterval(() => {
      setPosterIndex(i => (i + 1) % posters.length);
    }, 3500);

    return () => clearInterval(t);
  }, [expanded]);

  /* -------- Drag Snap -------- */
  const dragEnd = (_, info) => {
    if (info.offset.x < -80) {
      setPosterIndex(i => (i + 1) % posters.length);
    }
    else if (info.offset.x > 80) {
      setPosterIndex(i => (i - 1 + posters.length) % posters.length);
    }
  };

  return (
<motion.div
  ref={containerRef}
  initial={{ x: "-50%" }}
  animate={{ x: "-50%" }}

  onMouseEnter={() => setExpanded(true)}
  onMouseLeave={() => setExpanded(false)}

  className={`
    fixed top-10 left-[calc(50%+48px)] z-[90]
    grain backdrop-blur-[30px] bg-white/20
    border border-white/20
    rounded-[26px] md:rounded-[36px]
    shadow-[0_10px_30px_rgba(255,255,255,0.18)]
    transition-all duration-[850ms]
    ease-[cubic-bezier(0.22,1,0.36,1)]
    overflow-hidden

    ${expanded
      ? `
        w-[92vw] max-w-[1500px]
        h-[min(75vh,560px)]
        px-4 md:px-10 lg:px-12
        py-4 md:py-8
        overflow-y-auto
      `
      : `
        w-[230px] md:w-[260px]
        h-[46px] md:h-[52px]
        px-4 md:px-6
        py-2 md:py-2.5
      `
    }
  `}
>
      {/* COLLAPSED */}
      {!expanded && (
        <div className="text-center font-semibold text-black">
          {words[headlineIndex]}
        </div>
      )}

      {/* EXPANDED */}
      {expanded && (

        <div className="
          grid h-full
          grid-cols-1 lg:grid-cols-[1.2fr_2fr]
          gap-4 md:gap-8
        ">

          {/* ================= IMAGE CAROUSEL ================= */}
          <div className="
            relative
            min-h-[280px]
            sm:min-h-[340px]
            lg:h-full
            bg-white/20 backdrop-blur-xl
            border border-white/20
            rounded-2xl overflow-hidden
            cursor-grab active:cursor-grabbing
          ">

            <motion.div
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              onDragEnd={dragEnd}
              className="absolute inset-0"
            >

              {posters.map((img, i) => (
                <motion.img
                  key={i}
                  src={img}
                  draggable={false}
                  className="absolute inset-0 w-full h-full object-cover"

                  animate={{
                    x:
                      posterIndex === i
                        ? 0
                        : i < posterIndex ? -200 : 200,
                    opacity: posterIndex === i ? 1 : 0,
                    scale: posterIndex === i ? 1 : 1.04,
                  }}

                  transition={{
                    type: "spring",
                    stiffness: 130,
                    damping: 18
                  }}
                />
              ))}
            </motion.div>

          </div>

          {/* ================= RIGHT BENTO GRID ================= */}

          <div className="
            grid grid-cols-1 sm:grid-cols-2
            gap-4 md:gap-6
            h-full
          ">

            {/* COLUMN 1 */}
            <div className="grid grid-rows-[7fr_3fr] gap-4 md:gap-6">
              <NowPlaying />
              <BentoCard title="🔥 Focus Time" value="2.6 hrs" />
            </div>

            {/* COLUMN 2 */}
            <div className="grid grid-rows-[3fr_7fr] gap-4 md:gap-6">
              <BentoCard title="🚶 Steps" value="5,762" />
              <BentoCard title="⚡ Click Rate" value="89%" />
            </div>

          </div>

        </div>
      )}

      {/* NEON UNDERGLOW */}
      <div
        className="
          pointer-events-none
          absolute bottom-0 left-1/2 -translate-x-1/2
          w-[70%] sm:w-[80%]
          h-[35px] sm:h-[50px]
          rounded-full blur-[30px]
          bg-[#00f0ff]
          opacity-70
        "
      />

    </motion.div>
  );
}
