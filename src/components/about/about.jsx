
import Fotter from "../home/fotter"
import gsap from "gsap"
import { useGSAP } from '@gsap/react';
import Resume from "../../resume/IBM.pdf";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import priview from "../../images/priview.png"
import abhinay from "../../images/abhinay.jpg"

export default function about() {
    gsap.registerPlugin(ScrollTrigger);
    useGSAP(
        ()=>{
        gsap.from('#text', { y: 1000, duration:1}); 
        gsap.from('.who', {
             y: 1000, 
             duration:0.6,
            scrollTrigger:{
            trigger:"#text-who",
            scroller:"body",
            markers:true,
            start:"top 50%",
            end:"top -60%"
        }}); 
        gsap.from('.resume', {
             x: -1000, 
             duration:0.6,
            scrollTrigger:{
            trigger:"#resume",
            scroller:"body",
            markers:true,
            start:"top 50%",
            end:"top -60%"
        }}); 
        gsap.from('.overlay', {
             y: 800,
            stagger:0.4,
            scrollTrigger: {
                trigger: "#overlay ",
                scroller: "body",
                markers: true,
                start: "top 50%",
                end: "top -100%",
              }
        }); 
    })
  return (
    <>
    <div className="h-[100vh] overflow-hidden bg-fuchsia-300 flex justify-center items-center">
        <div className="h-[61vh] overflow-hidden flex justify-center items-center">
            <h1 id="text" className="text-[13vh] text-black">About.</h1>
        </div>
    </div>
    <div>
        <div id="overlay" className=" overflow-hidden relative">
            <img className="w-full brightness-50" src={abhinay} alt="" />
            <div className="text-xl w-40 overflow-hidden absolute top-[30%] text-white font-bold left-[4%]"><p className=" overlay  h-10 overflow-hidden">it's so great</p> <p className="h-10 overlay overflow-hidden">to meet</p> <p className="h-10 overlay overflow-hidden">you,i'm</p>   <p className="h-10 overflow-hidden overlay">abhi:]</p></div> 
        </div> 
    </div>
    <div>
        <div id="text-who" className="flex flex-col bg-fuchsia-300 gap-8 p-10 ">
            <div className="h-10 overflow-hidden">
        <h1  className="text-4xl who">Who am i ?</h1>
            </div>
            <div className="h-24 overflow-hidden">
        <p className="who">Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi excepturi repellendus nemo temporibus perspiciatis, suscipit quo ex, quaerat, illo dicta in? Ut, veritatis! Quaerat vitae assumenda, non voluptate, quae consequatur modi animi temporibus explicabo deleniti consectetur rem neque officia atque nostrum. Ut quaerat similique dicta, eligendi molestias harum enim dolorum alias at tenetur magni?</p> 
            </div>
        </div>
    </div>
    <div id="resume" className="p-20 flex bg-fuchsia-300 flex-col justify-center items-center gap-5 ">
        <div className="overflow-hidden">
        <img className="w-80 resume rounded-lg" src={priview} alt="resume preview" />
        </div>
        <a className="border-2 w-48 flex justify-center bg-blue-300 border-black p-2 rounded-lg" href={Resume} download="hello">Downlode Resume</a>  
        </div>
    <Fotter/>
    </>
  )
}
