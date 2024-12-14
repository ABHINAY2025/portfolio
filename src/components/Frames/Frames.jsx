import React from 'react'
import Fotter from '../home/Fotter'
import Imges from './Imges'
import { motion } from "framer-motion";  // Import framer-motion

function Frames() {
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
    <div className='h-screen w-full   py-32 px-10'>
     <Imges/>
    </div>
    </motion.div>
   </>
  )
}

export default Frames