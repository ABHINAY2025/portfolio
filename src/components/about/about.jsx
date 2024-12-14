import Fotter from "../home/Fotter";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Resume from "../../resume/IBM.pdf";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import priview from "../../images/priview.png";
import abhinay from "../../images/abhinay.jpg";
import { motion } from "framer-motion"; // Import framer-motion

export default function About() {
  gsap.registerPlugin(ScrollTrigger);

  useGSAP(() => {
    gsap.from("#text", { x: -1000, duration: 1.3 });
    gsap.from(".who", {
      y: 1000,
      duration: 0.6,
      scrollTrigger: {
        trigger: "#text-who",
        scroller: "body",
        start: "top 50%",
        end: "top -60%",
      },
    });
    gsap.from(".resume", {
      x: -1000,
      duration: 0.6,
      scrollTrigger: {
        trigger: "#resume",
        scroller: "body",
        start: "top 50%",
        end: "top -60%",
      },
    });
    gsap.from(".overlay", {
      y: 800,
      stagger: 0.4,
      scrollTrigger: {
        trigger: "#overlay",
        scroller: "body",
        start: "top 50%",
        end: "top -100%",
      },
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
          stiffness: 50, // Controls how stiff the spring is
          damping: 15, // Controls bounce resistance
          duration: 1, // Overall animation duration
        }}
      >
        <div>
          {/* Header Section */}
          <div className="main h-[100vh] overflow-hidden flex p-4 md:p-10 items-center">
            <div className="overflow-hidden flex border-b-2 border-black w-full items-center">
              <h1
                id="text"
                className="text-[10vh] md:text-[13vh] font-bold italic px-2 text-black text-center"
              >
                About Me.
              </h1>
            </div>
          </div>

          {/* Main Content */}
          <div>
            <div
              id="overlay"
              className="w-full flex flex-col lg:flex-row gap-10 lg:gap-28 p-4 md:p-10"
            >
              {/* Image Section */}
              <div className="h-64 lg:h-screen flex justify-center lg:justify-start">
                <img
                  className="object-cover w-full lg:w-[30vw] rounded-lg"
                  src={abhinay}
                  alt="Abhinay"
                />
              </div>

              {/* Text Content */}
              <div className="w-full lg:w-[50%] flex flex-col gap-8">
                <div className="flex flex-col justify-center items-center gap-4 md:gap-6">
                  <h1 className="font-bold text-3xl md:text-5xl text-center">
                    Hey Hey
                  </h1>
                  <p className="text-md md:text-lg font-semibold text-gray-400 text-center">
                    Happy you're Here :)
                  </p>
                </div>
                <div className="w-full">
                  <p className="text-justify text-sm md:text-lg leading-relaxed">
                    My passion for design has always been a driving force in my
                    life. When I was younger, I dreamt of becoming a fashion
                    designer, dragging my sketches with me from place to place,
                    I was always drawing something for someone I loved. When it
                    came time to choose a career path, it was a no brainer to
                    pursue design, so here I am.
                  </p>
                  <p className="text-justify mt-5 text-sm md:text-lg leading-relaxed">
                    My passion for design has always been a driving force in my
                    life. When I was younger, I dreamt of becoming a fashion
                    designer, dragging my sketches with me from place to place,
                    I was always drawing something for someone I loved.
                  </p>
                  <p className="text-justify mt-5 text-sm md:text-lg leading-relaxed">
                    When it came time to choose a career path, it was a no
                    brainer to pursue design, so here I am.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <Fotter />
        </div>
      </motion.div>
    </>
  );
}
