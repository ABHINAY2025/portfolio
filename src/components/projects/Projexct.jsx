import { useState } from "react";
import { motion } from "framer-motion";

export default function Projexct() {
  const [active, setactive] = useState(null);

  return (
    <>
      {/* ================= TITLE ================= */}
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        viewport={{ once: true }}
        className="py-24"
      >
        <h1 className="
          text-center
          text-[12vw] md:text-[10vw] lg:text-[8vw]
          font-semibold
          tracking-tight
          text-black
        ">
          PROJECTS
        </h1>
      </motion.div>

      {/* ================= GRID ================= */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        <div
          className="
            grid min-h-screen w-full
            grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4
            gap-4 p-4
          "
        >
          {["one", "two", "three", "four"].map((id, i) => (
            <motion.div
              key={id}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              viewport={{ once: true }}
              onMouseEnter={() => setactive(id)}
              onMouseLeave={() => setactive(null)}
              className="
                col-span-1 sm:col-span-2 md:col-span-2
                relative overflow-hidden
                rounded-xl shadow-lg
                cursor-pointer
              "
            >

              {/* ================= BASE CARD BACKGROUND ================= */}
              <div
                className="
                  absolute inset-0
                  bg-gradient-to-br
                  from-indigo-500 via-fuchsia-500 to-pink-500
                  opacity-90
                "
              />

              {/* subtle grain if you want */}
              <div className="absolute inset-0 grain opacity-20" />

              {/* ================= OVERLAY ================= */}
              <div
                className={`
                  absolute inset-0
                  bg-black/75
                  transition-opacity duration-500
                  ${active === id ? "opacity-100" : "opacity-0"}
                `}
              >
                <div className="flex flex-col gap-3 p-6 justify-end h-full">
                  <p className="text-white text-2xl font-semibold">
                    Project {i + 1}
                  </p>
                  <p className="text-white/70 text-base">
                    Interactive design, animation & logic
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </>
  );
}
