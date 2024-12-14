
import Fotter from '../home/Fotter'
import { useGSAP } from "@gsap/react";
import gsap from 'gsap';
import Experience from './Experience';
import { motion } from "framer-motion";

export default function contact() {
    useGSAP(()=>{
        gsap.from(".head",{
            x:-1000,
        duration:1
        })
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
  }}
>
    <div>
        <div className=' h-[90vh] p-20  flex flex-col  justify-center items-center'>
            <div className='w-full flex justify-between items-center'>
            <h1 className='text-[10vh] italic head font-bold '>Resume.</h1>
            <button className='border-2 border-black w-52 p-4 hover:bg-blue-200'>Download Resume</button>
            </div>
            <div className='w-full pt-20'>
                <h1 className='border-gray-500 py-5 text-3xl font-light italic  border-y-2'>
                Experience
                </h1>
            </div>
        </div>
    </div>
        <Experience/>
        <Fotter/>
    </motion.div>
    </>
  )
}
