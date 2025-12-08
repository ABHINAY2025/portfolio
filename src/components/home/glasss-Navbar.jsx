import { useState, useRef, useEffect } from "react";
import useSound from "use-sound";
import Page from "../../images/page.mp3";
import { NavLink, useLocation } from "react-router-dom";
import "../styles/grain.css";

export default function Navbar() {
  const [hovered, setHovered] = useState(false);
  const [open, setOpen] = useState(false);

  const [play] = useSound(Page, { volume: 0.5 });

  const location = useLocation();

  const navItems = [
    { to: "/Frames", label: "Frames" },
    { to: "/about", label: "About Me" },
    { to: "/", label: "Work" },
    { to: "/contact", label: "Resume" },
  ];

  const activeTab =
    navItems.find((item) => item.to === location.pathname)?.label || "Work";

  const menuRef = useRef(null);

  const toggleMenu = () => {
    setOpen(!open);
    play();
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
className={`
  fixed top-5 left-1/2 -translate-x-1/2
  z-50

  flex items-center justify-center
  
  bg-white/[0.08]
  backdrop-blur-[28px]
  backdrop-saturate-150
  border border-white/15

  grain
  rounded-[50px]

  shadow-[0_6px_20px_rgba(255,255,255,0.15),_0_0_0_1px_rgba(255,255,255,0.08),_inset_0_1px_2px_rgba(255,255,255,0.12)]

  transition-all
  duration-[950ms]
  ease-[cubic-bezier(0.22,1,0.36,1)]

  ${
    hovered
      ? "w-[82vw] max-w-4xl h-[84px] px-12 gap-12"
      : "w-[220px] h-[48px] px-8 gap-0"
  }
`}

    >
      
{/* Collapsed */}
{!hovered && (
  <span className="text-black font-bold tracking-wider text-lg">
    {activeTab}
  </span>
)}

{/* Expanded */}
{hovered && (
  <div
    className={`flex items-center gap-72 transition-all duration-[500ms] ease-out
      ${hovered ? "scale-100 opacity-100" : "scale-95 opacity-0"}
    `}
  >
    <NavLink className="text-black  font-bold" to="/">
      ABHINAY_MA
    </NavLink>

    <ul className="hidden md:flex gap-10 text-black font-bold/80">
      {navItems.map(i => (
        <NavLink
          key={i.label}
          to={i.to}
          className={({ isActive }) =>
            `transition-all hover:scale-105
            ${isActive ? "text-blcak font-bold underline underline-offset-8" : "text-blcak font-bold/60"}`
          }
        >
          {i.label}
        </NavLink>
      ))}
    </ul>
  </div>
)}


      {/* Mobile Icon (unchanged behavior) */}
      <div
        onClick={toggleMenu}
        className="
          md:hidden ml-auto
          flex flex-col gap-1 cursor-pointer 
          bg-white/10 backdrop-blur-xl 
          p-2 rounded-xl border border-white/10
        "
      >
        <div className="w-6 h-[2px] bg-white rounded"></div>
        <div className="w-4 h-[2px] bg-white rounded"></div>
        <div className="w-6 h-[2px] bg-white rounded"></div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div
          ref={menuRef}
          className="
            fixed top-0 left-0 w-full h-screen z-40
            bg-black/40 backdrop-blur-xl 
            flex flex-col items-center justify-center 
            gap-8 text-blcak font-bold text-2xl
          "
        >
          <button
            className="absolute top-6 right-6 text-blcak font-bold text-4xl"
            onClick={toggleMenu}
          >
            &times;
          </button>

          {navItems.map((item) => (
            <NavLink
              key={item.label}
              to={item.to}
              onClick={toggleMenu}
            >
              {item.label}
            </NavLink>
          ))}
        </div>
      )}
    </div>
  );
}
