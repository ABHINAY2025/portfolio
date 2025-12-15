import { motion } from "framer-motion";
import { useState } from "react";
// import CustomCursor from "../CustomCursor";


export default function Projexct() {
  const [hovered, setHovered] = useState(null);

  const projects = [
    {
      id: 1,
      title: "SoFi for Small Businesses",
      desc: "A redesigned expense management platform for SMBs.",
      img: "https://static0.colliderimages.com/wordpress/wp-content/uploads/2023/09/everything-now-netflix-poster.jpg",
      tags: ["PRODUCT DESIGN", "FULL PROCESS", "2024"],
      gradient: "from-[#d8f1ff] to-[#e0f6ff]",
    },
    {
      id: 2,
      title: "Apple Services",
      desc: "Component systems and tools for design teams.",
      img: "https://mir-s3-cdn-cf.behance.net/project_modules/1400/f8b2ef92655071.5e505bf7132ab.png",
      tags: ["PRODUCT DESIGN", "DESIGN SYSTEMS", "2025"],
      gradient: "from-[#ffd8f3] to-[#ffe2f8]",
    },
    {
      id: 3,
      title: "E-Wallet Dashboard",
      desc: "A financial dashboard concept for digital payments.",
      img: "https://wallpapercave.com/wp/wp3050967.jpg",
      tags: ["UI/UX", "DASHBOARD", "FINTECH"],
      gradient: "from-[#e3ffd8] to-[#f0ffe5]",
    },
    {
      id: 4,
      title: "Creative Storyboard",
      desc: "A cinematic storyboard exploration.",
      img: "https://alternativemovieposters.com/wp-content/uploads/2017/05/chelsea_saul.jpg",
      tags: ["ART DIRECTION", "CONCEPT DESIGN"],
      gradient: "from-[#ffe7d8] to-[#fff0e5]",
    },
  ];

  return (
    
    <div className="w-full py-28 px-4 sm:px-8 md:px-12 lg:px-16 xl:px-24">
     {/* <CustomCursor hovered={hovered} /> */}
      {/* GRID LAYOUT — 2 PER ROW */}
      <div
  className="
    grid
    grid-cols-1 
    md:grid-cols-2 
    gap-12 
    lg:gap-16 
    xl:gap-20
    w-full
  "
>

        {projects.map((p) => (
          <div key={p.id} className="relative">

            {/* CARD */}
<motion.div
  onMouseEnter={() => setHovered(p.id)}
  onMouseLeave={() => setHovered(null)}
  initial={{ opacity: 0, y: 50 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.7, ease: "easeOut" }}
  viewport={{ once: true }}
  className={`
    w-full rounded-[32px]
    bg-gradient-to-br ${p.gradient}
    shadow-[0_20px_60px_rgba(0,0,0,0.08)]
  `}
>
  <img
    src={p.img}
    className="
      rounded-[28px] 
      w-full 
      h-[330px] md:h-[380px] lg:h-[420px]
      object-cover 
    "
  />
</motion.div>
            {/* TEXT */}
            <div className="mt-6">
              <h2 className="text-2xl md:text-[26px] font-semibold text-black">
                {p.title}
              </h2>

              <p className="text-gray-700 text-sm md:text-base mt-1">
                {p.desc}
              </p>

              {/* TAGS */}
              <div className="flex gap-2 flex-wrap mt-3">
                {p.tags.map((tag) => (
                  <span
                    key={tag}
                    className="
                      text-[10px] md:text-xs 
                      px-3 py-1 border rounded-md 
                      text-gray-700
                    "
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}
