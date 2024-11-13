import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";

export default function Projexct() {
  gsap.registerPlugin(ScrollTrigger);
  const textref = useRef();
  useGSAP(() => {
    gsap.to(".main h1", {
      transform: "translateX(-100%)",
      scrollTrigger: {
        trigger: ".main ",
        scroller: "body",
        markers: true,
        start: "top 50%",
        end: "top -100%",
        scrub: 2,
      },
    });
  });


  return (
    <>
      <div className=" flex main bg-fuchsia-400 overflow-x-hidden">
        <h1
          ref={textref}
          className="translate-x-[100vw] lg:h-[100vh] md:h-[80vh] md:text-[50vh] lg:text-[60vh] text-white font-medium text-[25vh]">
          PROJECTS.
        </h1>
      </div>
      <div className="h-screen overflow-scroll  overflow-x-hidden  overflow-y-hidden bg-fuchsia-300 ">
        <div className="flex flex-col p-4 lg:flex-row    md:px-20 justify-center gap-4 items-center h-screen">
        <div className="border-2  border-black w-full h-[100vh] lg:h-[50vh] flex justify-center items-center transition-transform duration-500 cursor-pointer">
          <a href="https://abhinay2025.github.io/projext-4/">1</a>
        </div>
        <div className="border-2  border-black w-full h-[100vh] lg:h-[50vh] flex justify-center items-center transition-transform duration-500 cursor-pointer">2</div>
        <div className="border-2  border-black w-full h-[100vh] lg:h-[50vh] flex justify-center items-center transition-transform duration-500 cursor-pointer">3</div>
        </div>
      </div>
    </>
  );
}
