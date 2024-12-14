import Projexct from "../projects/Projexct";
import Fotter from "./Fotter";
import gsap from "gsap";
import Gif from "../../images/icons.gif";
import { useGSAP } from '@gsap/react';
import { motion } from "framer-motion";

export default function Home() {
  useGSAP(() => {
    gsap.from('#text', { y: 1000, duration: 1, stagger: 0.8 });
  });

  return (
    <>
      <motion.div
        initial={{ y: "-100%", opacity: 0 }}  // Start the page above the screen
        animate={{ y: 0, opacity: 1 }}  // Animate it to its normal position
        exit={{ y: "100%", opacity: 0 }}  // Exit by moving it off the screen to the bottom
        transition={{
          type: "spring", // Use spring animation for elasticity
          stiffness: 50, // Controls how stiff the spring is (higher = less bouncy)
          damping: 15,    // Controls how much the spring resists the bounce (higher = less bounce)
          duration: 1,    // Controls the overall duration of the animation
        }}
      >
        <div className="h-screen p-8 flex flex-col md:flex-row gap-8 justify-center items-center bg-orange-50">
          {/* Content Section */}
          <div className="flex flex-col justify-center items-center w-full md:w-[53vw] overflow-hidden gap-5">
            <div className="overflow-hidden flex flex-col items-center justify-center">
              <h1 id="text" className="text-[5vh] sm:text-[10vh] mt-40 text-center text-black font-semibold">
                Abhinay_Ma
              </h1>
              <h1 id="text" className="text-[4vh] sm:text-[3vh] text-center text-black italic">
                Frontend & Backend Expertise
              </h1>
            </div>
            <div id="text" className="text-xl sm:text-2xl text-center">
              <p className="leading-relaxed">
                Driven by the opportunity to bring your design visions to life, I love crafting practical,
                purposeful, and seamless design solutions that build trust and bridge the gap between ideas and reality.
              </p>
            </div>
            <img id="text" className="transform rotate-90 w-16 sm:w-10 mx-auto" src={Gif} alt="error" />
          </div>
        </div>
      </motion.div>
      <Projexct />
      <Fotter />
    </>
  );
}
