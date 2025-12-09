import Projexct from "../projects/Projexct";
import Fotter from "./Fotter";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { motion } from "framer-motion";

import img1 from "../../images/profile1.jpg";
import img2 from "../../images/profile1.jpg";
import img3 from "../../images/profile1.jpg";
import img4 from "../../images/profile1.jpg";

export default function Home() {

  useGSAP(() => {
    gsap.from(".reveal", {
      opacity: 0,
      y: 80,
      duration: 1,
      stagger: 0.3,
      ease: "power3.out",
    });
  });

  return (
    <>
      {/* ✅ SKY BLUE + BABY PINK WAVE BACKGROUND */}
      <div
        className="fixed inset-0 -z-10 grain"
        style={{
          background: `
            radial-gradient(1100px at 20% 12%, rgba(135,210,255,0.95), transparent 60%),
            radial-gradient(900px at 82% 22%, rgba(255,165,205,0.85), transparent 65%),
            radial-gradient(1100px at 55% 82%, rgba(115,195,255,0.9), transparent 65%),
            linear-gradient(180deg, #87cefa 0%, #ffd2e6 100%)
          `,
          filter: "blur(0px)",   // ✅ smaller blur = visible waves
        }}
      />

      {/* ================= HERO ================= */}
      <motion.div
        initial={{ y: "-100%", opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 50, damping: 15 }}
      >
        <section
          className="
            relative 
            min-h-screen
            flex flex-col items-center justify-center
            p-6
            text-white
          "
        >
          <div className="relative z-10 max-w-5xl text-center">

            <h1
              className="
                reveal
                text-[6vh] md:text-[10vh]
                leading-tight font-serif
                flex flex-wrap justify-center items-center
                gap-x-4 gap-y-3
                drop-shadow-[0_0_18px_rgba(255,255,255,0.35)]
              "
            >
              <span className="text-black">“My career</span>

              <img
                src={img1}
                alt=""
                className="w-24 aspect-video object-cover rounded-xl border border-white/30 shadow-xl translate-y-[4px]"
              />

              <span className="text-black">break didn’t</span>

              <img
                src={img2}
                alt=""
                className="w-24 aspect-video object-cover rounded-xl border border-white/30 shadow-xl translate-y-[4px]"
              />

              <span className="text-black">break my</span>

              <img
                src={img3}
                alt=""
                className="w-24 aspect-video object-cover rounded-xl border border-white/30 shadow-xl translate-y-[4px]"
              />

              <span className="text-black">career</span>

              <img
                src={img4}
                alt=""
                className="w-24 aspect-video object-cover rounded-xl border border-white/30 shadow-xl translate-y-[4px]"
              />

              <span className="text-black">.”</span>
            </h1>

            <p className="reveal mt-6 italic text-black/90">
              — Abhinay_Ma
            </p>

            <p className="reveal mt-2 text-black/70">
              Full-Stack Developer · Building ideas into reality
            </p>

          </div>
        </section>
   

      {/* ================= OTHER SECTIONS ================= */}
      <Projexct />
        
      <Fotter />
       </motion.div>
    </>
  );
}
