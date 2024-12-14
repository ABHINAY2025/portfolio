import Projexct from "../projects/Projexct"
import Fotter from "./Fotter"
import gsap from "gsap"
import Gif from "../../images/icons.gif"
import { useGSAP } from '@gsap/react';
import { motion } from "framer-motion";
export default function home() {
    useGSAP(()=>{
        gsap.from('#text', { y: 1000, duration:1,stagger:0.8}); 
    })
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
  }}>
      <div className=" h-screen p-8 md:flex flex gap-4 justify-center bg-orange-50  items-center">
        <div className=" flex flex-col justify-center items-center w-[53vw] overflow-hidden gap-5 ">
        <div className=' overflow-hidden flex flex-col items-center justify-center'>
        <h1 id="text" className=" text-[8vh] content-center text-black font-semibold ">Abhinay_Ma</h1>
        <h1 id="text" className=" text-[3vh] text-black italic ">Frontend & Backend Expertise</h1>
        </div>
        <div id="text" className="text-2xl content-center">
            <p className=" text-center">Driven by the opportunity to bring your design visions to life, I love crafting practical, purposeful, and seamless design solutions that build trust and bridge the gap between ideas and reality.</p>
        </div>
        <img id="text" className="transform rotate-90 w-10 " src={Gif} alt="errer" />
        </div>
      </div>
    </motion.div>
      <Projexct/>
    <Fotter/>
    </>
  )
}
