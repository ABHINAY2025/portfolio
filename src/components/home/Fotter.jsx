
import React from 'react'
import { FaLinkedinIn } from "react-icons/fa"
import { useState } from "react";
import { NavLink } from "react-router-dom";

function Fotter() {
  const [open, setOpen] = useState(false);
  return (
    <>
    <div className='justify-between flex bg-black items-center p-8'>
      <div className='bg-black w-full border-b-2 p-10 border-white flex justify-between '>
        <div className='text-white text-lg'>ABHINAY_MA</div>
        <div className='text-white flex justify-between gap-7'>
          <div className='text-lg'>
        lets work together.
          </div>
        <a href='abhinayabhi2025@gmail.com' className='font-bold text-lg text-blue-400'>Reachout</a>
        </div>
      </div>
      </div>
      <div>
    <div className="flex px-10 w-full py-4 bg-black justify-between items-center z-10   bottom-0">
      {/* Navigation Links for Desktop */}
      <nav className='flex  justify-between w-full items-center'>
        <ul className={`hidden md:flex text-xl flex-col gap-10`}>
          <li>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                isActive ? "underline underline-offset-2 text-white" : "text-white"
              }
            >
              About Me
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? "underline underline-offset-2 text-white" : "text-white"
              }
            >
              Work
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                isActive ? "underline underline-offset-2 text-white" : "text-white"
              }
            >
              Resume
            </NavLink>
          </li>
        </ul>
        <div className='text-white text-4xl'>
        <a href='https://www.linkedin.com/in/abhinay-ma/' target='_balnk'>
        <FaLinkedinIn/>
        </a>
        </div>
      </nav>

      {/* Hamburger Icon for Mobile */}
      <div onClick={() => setOpen(!open)} className="md:hidden flex flex-col gap-1 cursor-pointer">
        <div className="w-8 h-1 rounded-xl bg-white"></div>
        <div className="w-8 h-1 rounded-xl bg-white"></div>
        <div className="w-8 h-1 rounded-xl bg-white"></div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="absolute bottom-full left-0 w-full bg-black py-4 md:hidden flex flex-col items-center gap-4">
          <NavLink
            to="/about"
            className="text-white"
            onClick={() => setOpen(false)}
          >
            About Me
          </NavLink>
          <NavLink
            to="/"
            className="text-white"
            onClick={() => setOpen(false)}
          >
            Work
          </NavLink>
          <NavLink
            to="/contact"
            className="text-white"
            onClick={() => setOpen(false)}
          >
            Resume
          </NavLink>
        </div>
      )}
    </div>
      </div>
    </>
  )
}

export default Fotter
