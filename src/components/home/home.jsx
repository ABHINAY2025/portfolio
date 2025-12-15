import Projexct from "../projects/Projexct";
import Fotter from "./Fotter";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { motion } from "framer-motion";

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
      {/* BACKGROUND */}
      <div
        className="fixed inset-0 grain -z-[1]"
        style={{
          background: `
            radial-gradient(1100px at 20% 12%, rgba(135,210,255,0.95), transparent 60%),
            radial-gradient(900px at 82% 22%, rgba(255,165,205,0.85), transparent 65%),
            radial-gradient(1100px at 55% 82%, rgba(115,195,255,0.9), transparent 65%),
            linear-gradient(180deg, #87cefa 0%, #ffd2e6 100%)
          `,
        }}
      />

      {/* MAIN CONTENT */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
      >

        {/* ================= HERO ================= */}
{/* ================= BEAUTIFUL INTRO SECTION ================= */}
<section
  className="
    w-full 
    pt-28 md:pt-36
    pb-20
    flex flex-col items-center justify-center
    text-center
  "
>
  {/* NAME */}
  <h1
    className="
      text-[12vw] sm:text-[10vw] md:text-[7vw] lg:text-[5vw]
      font-extrabold text-[#000]
      tracking-tight
    "
  >
    ABHINAY_MA
  </h1>

  {/* ROLE */}
<p
  className="
    mt-4 
    text-xs sm:text-sm md:text-base 
    tracking-[0.15em]
    text-black
  "
  style={{ fontFamily: "Sora, sans-serif" }}
>
  FULL-STACK DEVELOPER 
  <span className="text-white drop-shadow-[0_0_4px_rgba(255,255,255,0.8)]"> ✦ </span>
  AI ENTHUSIAST
  <span className="text-white drop-shadow-[0_0_4px_rgba(255,255,255,0.8)]"> ✦ </span>
  MICROSERVICES
</p>

{/* CURRENT EXPERIENCE */}
<div className="mt-4 flex items-center gap-4">

  {/* TEXT + RED COMPANY NAME (LARGE + CLICKABLE) */}
  <a
    href="https://fisecglobal.net/"
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center gap-3"
  >
    <p
      className="
        text-[14px] sm:text-base md:text-lg
        text-gray-700 tracking-wide
      "
    >
      CURRENTLY WORKING AT
      <span className="font-medium text-red-600 ml-2">
        FISEC GLOBAL
      </span>
    </p>

    {/* LOGO (CLICKABLE + BIGGER) */}
    <img
      src="/src/images/FISEC-LOGO.svg"
      alt="Fisec Global"
      className="h-8 sm:h-10 md:h-12 object-contain opacity-100"
    />
  </a>

</div>


</section>


        {/* OTHER SECTIONS */}
        <Projexct />
        <Fotter />
      </motion.div>
    </>
  );
}
