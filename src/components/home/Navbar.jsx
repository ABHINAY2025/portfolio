import { useState, useRef, useEffect } from "react";
import useSound from "use-sound";
import Page from "../../images/page.mp3";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [play] = useSound(Page, { volume: 0.5 });
  const menuRef = useRef(null);

  const toggleMenu = () => {
    setOpen(!open);
    play();
  };

  // Close the menu if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex px-10 w-full py-8 bg-black justify-between z-10 fixed top-0 left-0 right-0">
      <div>
        <NavLink className="font-bold text-white text-xl" to="/">
          ABHINAY_MA
        </NavLink>
      </div>

      {/* Navigation Links for Desktop */}
      <nav>
        <ul className="hidden md:flex gap-20">
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
      </nav>

      {/* Mobile Menu Toggle */}
      <div
        onClick={toggleMenu}
        className="flex gap-1 md:hidden flex-col cursor-pointer"
      >
        <div className="w-8 h-1 rounded-xl bg-white"></div>
        <div className="w-8 h-1 rounded-xl bg-white"></div>
        <div className="w-8 h-1 rounded-xl bg-white"></div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div
          ref={menuRef}
          className="absolute top-0 left-0 w-full bg-black py-4 md:hidden flex flex-col items-center gap-4 z-20"
        >
          {/* Close Button */}
          <button
            onClick={toggleMenu}
            className="text-white text-2xl absolute top-4 right-4"
          >
            &times; {/* This is the close icon */}
          </button>
          <NavLink
            to="/Frames"
            className="text-white"
            onClick={toggleMenu}
          >
            Frames
          </NavLink>
          <NavLink
            to="/about"
            className="text-white"
            onClick={toggleMenu}
          >
            About Me
          </NavLink>
          <NavLink
            to="/"
            className="text-white"
            onClick={toggleMenu}
          >
            Work
          </NavLink>
          <NavLink
            to="/contact"
            className="text-white"
            onClick={toggleMenu}
          >
            Resume
          </NavLink>
        </div>
      )}
    </div>
  );
}
