// eslint-disable-next-line no-unused-vars
import { useGSAP } from '@gsap/react';
import Projexct from '../projects/Projexct';
import Fotter from './Fotter';
import gsap from "gsap";
import abhinay from "../../images/abhinay.jpg"

export default function First() {

    useGSAP(
        () => {
            gsap.from('.rightbig', { x: 200, duration:2, ease: "elastic.out(0.5,0.4)",}); 
            gsap.from('.rightsmall', { y: -200, duration:2, ease: "elastic.out(0.5,0.4)",}); 
            gsap.from('.leftbig', { x: -200, duration:2, ease: "elastic.out(0.5,0.4)",}); 
            gsap.from('.leftsmall', { y: 200, duration:2, ease: "elastic.out(0.5,0.4)",}); 
            // gsap.from('.middle', { y: 300, duration:2, ease: "elastic.out(0.5,0.2)",}); 
        },  
    ); 
  return (
    <>
    <div className="flex w-full h-screen  items-center justify-center ">
        <div className="flex gap-6">
        <div className=" flex justify-between flex-col">
          <div className="w-60 h-56 border-2 rounded-2xl border-black animation leftbig">2</div>
          <div className="w-60 h-20 border-2 rounded-2xl border-black leftsmall">1</div>
        </div>
        <div className="border-2 border-black w-60 h-80 flex overflow-hidden items-center middle justify-center rounded-2xl">2</div>
        <div className=" flex justify-between  flex-col">
          <div className=" w-60 h-20 border-2 border-black rounded-2xl rightsmall">5</div>
          <div className="w-60 h-56 border-2 border-black rounded-2xl rightbig">4</div>
        </div>
        </div>
        </div>
        <Projexct/>
        <Fotter/>
    </>
  )
}
