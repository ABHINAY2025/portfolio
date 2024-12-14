import React from 'react';
import { FaLinkedinIn } from "react-icons/fa";
import { NavLink } from "react-router-dom";

function Fotter() {
  return (
    <>
      <div className='flex justify-between items-center bg-black '>
        <div className='w-full border-b-2 p-10 border-white flex gap-10 justify-between'>
          <div className='text-white text-lg'>ABHINAY_MA</div>
          <div className='text-white flex  flex-col  justify-between gap-7'>
            <div className='text-lg '>
              Let's work together.
            </div>
            <a href='mailto:abhinayabhi2025@gmail.com' className='font-bold text-lg text-blue-400'>
              Reach out
            </a>
          </div>
        </div>
      </div>

      <div className="flex px-10 w-full py-4 bg-black justify-between items-center z-10">
        {/* Navigation Links for Desktop and Mobile */}
        <nav className='flex justify-between w-full items-center'>
          <ul className='flex flex-col text-xl gap-10'>
            <li>
              <NavLink
                to="/Frames"
                className={({ isActive }) =>
                  isActive ? "underline underline-offset-2 text-white" : "text-white"
                }
              >
                Frames
              </NavLink>
            </li>
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
            <a href='https://www.linkedin.com/in/abhinay-ma/' target='_blank' rel="noopener noreferrer">
              <FaLinkedinIn />
            </a>
          </div>
        </nav>
      </div>
    </>
  );
}

export default Fotter;