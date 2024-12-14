import Fotter from "../home/Fotter";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Experience from "./Experience";
import { motion } from "framer-motion";
import Resume from "../../resume/IBM.pdf";

export default function Contact() {
  useGSAP(() => {
    gsap.from(".head", {
      x: -1000,
      duration: 1,
    });
  });

  return (
    <>
      <motion.div
        initial={{ y: "-100%", opacity: 0 }} // Start the page above the screen
        animate={{ y: 0, opacity: 1 }} // Animate it to its normal position
        exit={{ y: "100%", opacity: 0 }} // Exit by moving it off the screen to the bottom
        transition={{
          type: "spring", // Use spring animation for elasticity
          stiffness: 50, // Controls how stiff the spring is (higher = less bouncy)
          damping: 15, // Controls how much the spring resists the bounce
          duration: 1, // Controls the overall duration of the animation
        }}
      >
        <div>
          {/* Main Container */}
          <div className="pt-32 md:pt-40 lg:pt-60 px-6 md:px-10 lg:px-20 flex flex-col justify-center items-center">
            {/* Heading and Download Section */}
            <div className="w-full flex flex-col md:flex-row justify-between items-center gap-6">
              <h1 className="text-5xl md:text-7xl lg:text-[10vh] italic head font-bold">
                Resume.
              </h1>
              <a
                href={Resume}
                download
                className="border-2 border-black w-full md:w-52 text-center p-4 rounded-lg hover:bg-blue-300 transition duration-200"
              >
                Download Resume
              </a>
            </div>

            {/* Experience Section */}
            <div className="w-full pt-10 md:pt-20">
              <h1 className="border-gray-500 py-5 text-2xl md:text-3xl font-light italic border-y-2">
                Experience
              </h1>
            </div>
          </div>

          {/* Experience Component */}
          <Experience />
        </div>

        {/* Footer */}
        <Fotter />
      </motion.div>
    </>
  );
}
