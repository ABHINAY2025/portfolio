
import Fotter from '../home/fotter'
import { useGSAP } from "@gsap/react";
import gsap from 'gsap';

export default function contact() {
    useGSAP(()=>{
        gsap.from(".head",{
            y:1000,
        duration:1
        })
    })
  return (
    <>
     <div className='h-[100vh] flex bg-fuchsia-300 justify-center items-center '>
        <div className=' flex justify-center items-center h-[40vh]  overflow-hidden '>
            <h1 className='text-[10vh] px-4 head'>Let's chat.</h1>
        </div>
        </div> 
        <div>
            <div className='flex justify-center bg-fuchsia-300 '><h1 className='text-4xl'>Get in Touch</h1></div>
            <div className='flex flex-col bg-fuchsia-300 p-8 gap-8'>
                <input type="text" className='w-full border-b-2 bg-transparent placeholder-black border-gray-500 py-4 px-2 outline-blue-300 '  placeholder='Name'/>
                <input type="text" className='w-full border-b-2 bg-transparent placeholder-black   border-gray-500 py-4 px-2 outline-blue-300 ' placeholder='Your Email' />
                <input type="text" className='w-full border-b-2 bg-transparent placeholder-black border-gray-500 py-4 px-2 outline-blue-300 ' placeholder='Your Name' />
                <button className='border-2 border-black py-2 w-24 ' type='submit'>submit</button>
            </div>
        </div>
        <Fotter/>
    </>
  )
}
