import Fotter from "../home/Fotter";
import gsap from "gsap";
import { useGSAP } from '@gsap/react';
import Resume from "../../resume/IBM.pdf";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import priview from "../../images/priview.png";
import abhinay from "../../images/abhinay.jpg";
import { motion } from "framer-motion";  // Import framer-motion

export default function About() {
  gsap.registerPlugin(ScrollTrigger);
  useGSAP(() => {
    gsap.from('#text', { x:-1000, duration: 1.3});
    gsap.from('.who', {
      y: 1000,
      duration: 0.6,
      scrollTrigger: {
        trigger: "#text-who",
        scroller: "body",
        markers: true,
        start: "top 50%",
        end: "top -60%"
      }
    });
    gsap.from('.resume', {
      x: -1000,
      duration: 0.6,
      scrollTrigger: {
        trigger: "#resume",
        scroller: "body",
        markers: true,
        start: "top 50%",
        end: "top -60%"
      }
    });
    gsap.from('.overlay', {
      y: 800,
      stagger: 0.4,
      scrollTrigger: {
        trigger: "#overlay",
        scroller: "body",
        markers: true,
        start: "top 50%",
        end: "top -100%",
      }
    });
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
<div>   
      <div className=" main h-[100vh] overflow-hidden flex p-10  items-center">
        <div className=" overflow-hidden flex border-b-2 border-black w-full  items-center">
          <h1 id="text" className="text-[13vh] font-bold italic px-2 text-black">About Me.</h1>
        </div>
      </div>
      <div>
        <div id="overlay" className=" w-full flex  gap-28 p-10">
            <div className=" h-screen">
          <img className="" src={abhinay} alt="" />
            </div>
          <div className=" w-[50%]  flex flex-col gap-10 ">
            <div className=" flex flex-col justify-center items-center gap-6 ">
            <h1  className=" font-bold text-5xl">Hey Hey</h1>
            <p className=" text-lg font-semibold text-gray-400">Happy you're Here:)</p>
            </div>
            <div className="w-[90%]">
                <p className=" text-justify text-lg">My passion for design has always been a driving force in my life. When I was younger, I dreamt of becoming a fashion designer, dragging my sketches with me from place to place, I was always drawing something for someone I loved. When it came time to choose a career path, it was a no brainer to pursue design, so here I am.</p>
                <p className=" text-justify mt-5 text-lg">My passion for design has always been a driving force in my life. When I was younger, I dreamt of becoming a fashion designer, dragging my sketches with me from place to place, I was always drawing something for someone I loved. When it came time to choose a career path, it was a no brainer to pursue design, so here I am.</p>
                <p className=" text-justify mt-5 text-lg">My passion for design has always been a driving force in my life. When I was younger, I dreamt of becoming a fashion designer, dragging my sketches with me from place to place, I was always drawing something for someone I loved. When it came time to choose a career path, it was a no brainer to pursue design, so here I am.</p>
            </div>
          </div>
        </div>
      </div>
      <Fotter />
      </div>
      </motion.div>
      </>
  );
}
