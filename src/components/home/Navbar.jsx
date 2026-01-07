import { useState } from "react";
import { NavLink } from "react-router-dom";
import RightDecor from "./RightDecor";

export default function Navbar({ setMenuOpen }) {
  const [open, setOpen] = useState(false);

  const navItems = [
    { to: "/", label: "HOME" },
    { to: "/about", label: "ABOUT" },
    { to: "/blog", label: "BLOG" },
    { to: "/SssneakPeek", label: "A Sssneak Peek" },
    { to: "/newsroom", label: "NEWSROOM" },
    { to: "/contact", label: "CONTACT" },
  ];

  const toggleMenu = () => {
    const newState = !open;
    setOpen(newState);
    if (setMenuOpen) setMenuOpen(newState);
  };

  return (
    <>
      {/* =======================================================
            DESKTOP SIDEBAR (md+)
      ======================================================= */}
      {/* =======================================================
      DESKTOP SIDEBAR (md+)
======================================================= */}
<aside
  className="
    hidden md:flex
    fixed left-0 top-0 z-[999]
    h-screen w-24 bg-white border-r border-gray-200
    flex flex-col items-center
  "
>
  {/* TOP: LOGO */}
  <div className="pt-6">
    <NavLink to="/" className="block">
      <div
        className="
          w-20 h-20 rounded-full shadow-xl
          bg-gradient-to-br from-[#0b1028] via-[#24319d] to-[#f7b7d2]
          relative overflow-hidden flex items-center justify-center
        "
      >
        <div className="absolute inset-0 grain opacity-40" />
        <span
          className="relative z-10 text-white text-[30px]"
          style={{ fontFamily: "Allura, cursive" }}
        >
          MA
        </span>
      </div>
    </NavLink>
  </div>

  {/* CENTER SECTION — NAME + ROLE */}
<div className="flex-1 flex flex-col text-black items-center justify-around space-y-16">
  
  {/* NAME */}
  <div className="flex">
    <span
      className="
        -rotate-90
        uppercase font-bold text-black text-md
        tracking-[0.3em] opacity-60
      "
    >
      ABHINAY_MA
    </span>
  </div>

  {/* ROLE */}
  <div className="flex">
    <span
      className="
        -rotate-90
        uppercase font-bold text-black text-md
        tracking-[0.3em] opacity-40
      "
    >
      DEVELOPER
    </span>
  </div>

</div>


  {/* BOTTOM — HAMBURGER */}
  <div className="pb-6">
    <button
      onClick={toggleMenu}
      className="relative w-12 h-12 flex items-center justify-center"
    >
      <span
        className={`
          absolute bg-black rounded-full transition-all duration-500
          ${open ? "w-[3px] h-9 rotate-[20deg] -translate-x-[6px]" : "w-8 h-[2px] -translate-y-2"}
        `}
      />
      <span
        className={`
          absolute bg-black rounded-full transition-all duration-500
          ${open ? "w-[3px] h-9 -rotate-[20deg] translate-x-[6px]" : "w-8 h-[2px] translate-y-2"}
        `}
      />
      <span
        className={`
          absolute bg-black rounded-full transition-all duration-500
          ${open ? "w-[16px] translate-y-[5px] -translate-x-[2px]" : "w-8 translate-y-0 h-[3px]"}
        `}
      />
    </button>
  </div>
</aside>

      {/* =======================================================
            MOBILE TOP NAVBAR (below md)
      ======================================================= */}
      <div
        className="
          md:hidden fixed top-0 left-0 z-[999]
          w-full h-20 bg-white border-b border-gray-200
          flex items-center justify-between px-6
        "
      >
        {/* MOBILE LOGO */}
        <NavLink to="/" className="block">
          <div className="
            w-14 h-14 rounded-full shadow-md
            bg-gradient-to-br from-[#0b1028] via-[#24319d] to-[#f7b7d2]
            relative overflow-hidden flex items-center justify-center
          ">
            <div className="absolute inset-0 grain opacity-40" />
            <span
              className="relative z-10 text-white text-[22px]"
              style={{ fontFamily: "Allura, cursive" }}
            >
              MA
            </span>
          </div>
        </NavLink>

        {/* MOBILE HAMBURGER */}
        <button
          onClick={toggleMenu}
          className="relative w-10 h-10 flex items-center justify-center"
        >
          <span className={`
            absolute bg-black rounded-full transition-all duration-500
            ${open ? "w-[3px] h-8 rotate-[20deg] -translate-x-[4px]" : "w-8 h-[2px] -translate-y-2"}
          `}/>
          <span className={`
            absolute bg-black rounded-full transition-all duration-500
            ${open ? "w-[3px] h-8 -rotate-[20deg] translate-x-[4px]" : "w-8 h-[2px] translate-y-2"}
          `}/>
          <span className={`
            absolute bg-black rounded-full transition-all duration-500
            ${open ? "w-[14px] translate-y-[16px]" : "w-8 translate-y-0 h-[3px]"}
          `}/>
        </button>
      </div>

      {/* =======================================================
            SLIDE-OUT MENU PANEL (Mobile + Desktop)
      ======================================================= */}
      <div
        className={`
          fixed top-0 
          left-0 md:left-24
          z-[998]
          w-full md:w-[calc(100vw-96px)]
          h-screen bg-white
          transform transition-transform duration-[900ms]
          ${open ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <RightDecor />

        {/* ===== OPTIMIZED RESPONSIVE NAVIGATION ===== */}
        <nav
          className="
            relative z-10 h-full
            flex flex-col justify-center gap-8
            pl-10        /* mobile safe padding */
            md:pl-24     /* tablet */
            lg:pl-32     /* laptop/desktop */
          "
        >
{navItems.map((item, i) => {
  const isSneakPeek = item.label === "A Sssneak Peek";

  return (
<NavLink
  key={item.label}
  to={item.to}
  onClick={() => setOpen(false)}
  style={{ transitionDelay: open ? `${i * 90}ms` : "0ms" }}
  className={`
    text-4xl md:text-5xl uppercase tracking-[0.2em]
    transition-all duration-[600ms]
    ${open ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"}
    hover:tracking-[0.3em] hover:opacity-60
    ${
      isSneakPeek
        ? "text-black hover:animate-redBlue"
        : "text-black"
    }
  `}
>
  {item.label}
</NavLink>

        );
      })}
        </nav>
      </div>
    </>
  );
}
