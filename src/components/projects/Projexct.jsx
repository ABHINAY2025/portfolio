import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Projexct() {
  const [hovered, setHovered] = useState(null);
  const navigate = useNavigate();

  const projects = [
    {
      id: 1,
      title: "AI-Powered AR Structure Viewer",
      desc: "View famous monuments like the Taj Mahal in real surroundings using AR.",
      img: "/posters/ar-4.webp",
      route: "/projects/ar-viewer",
      tags: ["AR", "AI", "3D", "2025"],
      gradient: "from-[#d8f1ff] to-[#e0f6ff]",
    },
    {
      id: 2,
      title: "Smart Invoice Generator",
      desc: "Create professional invoices with auto-calculations and exports.",
      img: "/posters/invoice-2.png",
      route: "/projects/invoice-maker",
      tags: ["FULL-STACK", "FINTECH", "2024"],
      gradient: "from-[#ffd8f3] to-[#ffe2f8]",
    },
  ];

  return (
    <section className="w-full py-24 px-4 sm:px-8">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">

        {projects.map((p) => (
          <div key={p.id} className="flex flex-col items-center">

            {/* CARD */}
            <motion.div
              onMouseEnter={() => setHovered(p.id)}
              onMouseLeave={() => setHovered(null)}
              onClick={() => navigate(p.route)}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              viewport={{ once: true }}
              className={`
                cursor-pointer
                w-full
                max-w-[520px]
                rounded-[28px]
                bg-gradient-to-br ${p.gradient}
                shadow-[0_20px_50px_rgba(0,0,0,0.08)]
                overflow-hidden
              `}
            >
              {/* 🔥 SAME SIZE CONTAINER FOR BOTH */}
              <div className="aspect-[4/3] w-full">
                <img
                  src={p.img}
                  alt={p.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>

            {/* TEXT */}
            <div className="mt-6 max-w-[520px] text-center md:text-left">
              <h2 className="text-xl md:text-[22px] font-semibold text-black">
                {p.title}
              </h2>

              <p className="text-gray-700 text-sm md:text-[15px] mt-1">
                {p.desc}
              </p>

              {/* TAGS */}
              <div className="flex gap-2 flex-wrap mt-4 justify-center md:justify-start">
                {p.tags.map((tag) => (
                  <span
                    key={tag}
                    className="
                      text-[10px]
                      px-3 py-1
                      border border-black/10
                      rounded-full
                      text-gray-600
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
    </section>
  );
}
