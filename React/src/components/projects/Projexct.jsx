import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";

export default function Projexct() {
  const [active,setactive]=useState(null)
  gsap.registerPlugin(ScrollTrigger);
  const textref = useRef();
  useGSAP(() => {
    gsap.to(".main h1", {
      transform: "translateX(-100%)",
      scrollTrigger: {
        trigger: ".main",
        scroller: "body",
        start: "top 50%",
        end: "top -100%",
        scrub: 2,
      },
    });
  });
  return (
    <>
      <div className=" flex main border-b-2 border-black  overflow-x-hidden">
        <h1
          ref={textref}
          className="translate-x-[100vw] lg:h-[100vh] md:h-[80vh] md:text-[50vh] lg:text-[60vh] text-black font-medium text-[25vh]">
          PROJECTS.
        </h1>
      </div>
    <div className="flex h-full w-full items-center justify-center">
      <div className="grid h-screen w-full  grid-cols-4 grid-rows-4 gap-4  p-2 rounded-lg shadow-lg">
      <div 
  onMouseEnter={() => setactive("one")} 
  onMouseLeave={() => setactive(false)} 
  className="col-span-2 row-span-3  overflow-hidden rounded-lg shadow-md flex items-center justify-center font-sans">
  {active=="one" ? (
    <div className="w-full h-full content-end px-4 bg-black transition-opacity duration-500 ease-in-out opacity-20">
      <div className="flex flex-col gap-3 mb-5">
        <p className="text-white text-2xl font-bold">project name</p>
        <p className="text-white text-lg">Lorem ipsum dolor sit amet consectetur adipisicing.</p>
      </div>
    </div>
  ) : (
    <div className="w-full h-full content-end px-4 bg-black transition-opacity duration-500 ease-in-out opacity-0">
      <p className="text-black">salmon</p>
    </div>
  )}
</div>
      <div 
  onMouseEnter={() => setactive("two")} 
  onMouseLeave={() => setactive(false)} 
  className="col-span-2 row-span-1  overflow-hidden rounded-lg shadow-md flex items-center justify-center font-sans">
  {active=="two" ? (
    <div className="w-full h-full content-end px-4 bg-black transition-opacity duration-500 ease-in-out opacity-20">
      <div className="flex flex-col gap-3 mb-5">
        <p className="text-white text-2xl font-bold">project name</p>
        <p className="text-white text-lg">Lorem ipsum dolor sit amet consectetur adipisicing.</p>
      </div>
    </div>
  ) : (
    <div className="w-full h-full content-end px-2 bg-black transition-opacity duration-500 ease-in-out opacity-0">
      <p className="text-black">salmon</p>
    </div>
  )}
</div>
      <div 
  onMouseEnter={() => setactive("three")} 
  onMouseLeave={() => setactive(false)} 
  className="col-span-2 row-span-4  overflow-hidden rounded-lg shadow-md flex items-center justify-center font-sans">
  {active=="three" ? (
    <div className="w-full h-full content-end px-4 bg-black transition-opacity duration-500 ease-in-out opacity-20">
      <div className="flex flex-col gap-3 mb-5">
        <p className="text-white text-2xl font-bold">project name</p>
        <p className="text-white text-lg">Lorem ipsum dolor sit amet consectetur adipisicing.</p>
      </div>
    </div>
  ) : (
    <div className="w-full h-full content-end px-4 bg-black transition-opacity duration-500 ease-in-out opacity-0">
      <p className="text-black">salmon</p>
    </div>
  )}
</div>
      <div 
  onMouseEnter={() => setactive("four")} 
  onMouseLeave={() => setactive(false)} 
  className="col-span-2 row-span-2  overflow-hidden rounded-lg shadow-md flex items-center justify-center font-sans">
  {active=="four" ? (
    <div className="w-full h-full content-end px-4 bg-black transition-opacity duration-500 ease-in-out opacity-20">
      <div className="flex flex-col gap-3 mb-5">
        <p className="text-white text-2xl font-bold">project name</p>
        <p className="text-white text-lg">Lorem ipsum dolor sit amet consectetur adipisicing.</p>
      </div>
    </div>
  ) : (
    <div className="w-full h-full content-end px-4 bg-black transition-opacity duration-500 ease-in-out opacity-0">
      <p className="text-black">salmon</p>
    </div>
  )}
</div>
      </div>
    </div>
    </>
  );
}
