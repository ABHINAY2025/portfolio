import { useState } from "react";
import useSound from "use-sound";
import Page from "../../images/page.mp3";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [play] = useSound(Page, { volume: 0.5 });  

  const toggleMenu = () => {
    setOpen(!open);  
    play();  
  };
  return (
    <div className="flex px-10 w-full py-8 bg-black justify-between z-10 fixed">
      <div>
        <NavLink className="font-bold text-white" to="/">
          ABHINAY_MA
        </NavLink>
      </div>
      <nav>
        <ul className="hidden md:flex gap-20">
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
      </nav>
      
      {/* Mobile Menu Toggle */}
      <div onClick={toggleMenu} className="flex gap-1 md:hidden flex-col cursor-pointer">
        <div className="w-8 h-1 rounded-xl bg-white"></div>
        <div className="w-8 h-1 rounded-xl bg-white"></div>
        <div className="w-8 h-1 rounded-xl bg-white"></div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="absolute bottom-full left-0 w-full bg-black py-4 md:hidden flex flex-col items-center gap-4">
          <NavLink to="/about" className="text-white" onClick={toggleMenu}>
            About Me
          </NavLink>
          <NavLink to="/" className="text-white" onClick={toggleMenu}>
            Work
          </NavLink>
          <NavLink to="/contact" className="text-white" onClick={toggleMenu}>
            Resume
          </NavLink>
        </div>
      )}
    </div>
  );
}
