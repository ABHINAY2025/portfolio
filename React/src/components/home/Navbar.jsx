
import { useState } from "react";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  const[open,setopen]=useState(false)
  return (
    <div className=" border-2 flex  px-10 w-full py-2  justify-between  bg-fuchsia-300 z-10 fixed ">
      <div className="">
          <NavLink to="/">
          Logo
          </NavLink>
      </div>
      {open?<div className=" relative   ">
        <nav className="md:hidden  mt-10   ">
        <ul className="flex flex-col  justify-center items-center gap-6">
          <li >
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? "underline underline-offset-2" : "text-black"
              }
            >
              home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                isActive ? "underline underline-offset-2" : "text-black"
              }
            >
              About
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                isActive ? "underline underline-offset-2" : "text-black "
              }
            >
              Contact
            </NavLink>
          </li>
        </ul>
      </nav>
      </div>:<div>{null}</div>}
      <nav className="">
        <ul className="hidden md:flex gap-20">
          <li >
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? "underline underline-offset-2" : "text-black"
              }
            >
              home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                isActive ? "underline underline-offset-2" : "text-black"
              }
            >
              About
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                isActive ? "underline underline-offset-2" : "text-black "
              }
            >
              Contact
            </NavLink>
          </li>
        </ul>
      </nav>
      <div onClick={()=>setopen(!open)} className=" flex gap-1 md:hidden flex-col">
      <div  className="w-8 h-1 rounded-xl bg-black"></div>
      <div className="w-8 h-1 rounded-xl bg-black"></div>
      <div className="w-8 h-1 rounded-xl bg-black"></div>
      </div>
    </div>
  );
}
