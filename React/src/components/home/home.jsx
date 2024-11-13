import Projexct from "../projects/Projexct"
import Footer from './footer';
import gsap from "gsap"
import { useGSAP } from '@gsap/react';
export default function home() {
    useGSAP(()=>{
        gsap.from('#text', { y: 1000, duration:1,stagger:0.8}); 
    })
  return (
    <>
      <div className="h-screen p-8 md:flex flex gap-4  bg-fuchsia-300  items-center">
        <div className=" flex flex-col overflow-hidden gap-5 ">
        <div className=' overflow-hidden'>
        <h1 id="text" className=" text-[7vh] text-black font-bold ">Nice to <span>see you.</span></h1>
        </div>
        <div id="text" className="text-lg">
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde assumenda, expedita laborum ullam numquam reiciendis?</p>
        </div>
        </div>
      </div>
      <Projexct/>
    <Footer/>
    </>
  )
}
