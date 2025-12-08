import { useState } from "react";
import RightDecor from "./RightDecor"; // ✅ Use your existing decor

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const navItems = [
    { to: "/", label: "HOME" },
    { to: "/about", label: "ABOUT" },
    { to: "/blogs", label: "BLOG" },
    { to: "/Frames", label: "LAB" },
    { to: "/newsroom", label: "NEWSROOM" },
    { to: "/contact", label: "CONTACT" },
  ];

  return (
    <>
      {/* =======================================================
                         LEFT SOLID STRIP
      ======================================================= */}
      <aside
        className="
          fixed left-0 top-0 z-[999]
          h-screen w-24
          bg-white border-r border-gray-200
          flex flex-col items-center
        "
      >
        {/* LOGO */}
        <div className="mt-8 mb-12">
          <div className="
            w-20 h-20 rounded-full shadow-xl
            bg-gradient-to-br from-[#0b1028] via-[#24319d] to-[#f7b7d2]
            relative overflow-hidden
            flex items-center justify-center
          ">
            <div className="absolute inset-0 grain opacity-40" />
            <span
              className="relative z-10 text-white text-[30px]"
              style={{ fontFamily: "Allura, cursive" }}
            >
              MA
            </span>
          </div>
        </div>

        {/* VERTICAL NAME */}
        <div className="flex-1 flex items-center">
          <span className="-rotate-90 uppercase font-bold text-s tracking-[0.3em] opacity-60">
            Abhinay_Ma
          </span>
        </div>

        {/* VERTICAL ROLE */}
        <div className="flex-1 flex items-center">
          <span className="-rotate-90 uppercase font-bold text-s tracking-[0.3em] opacity-40">
            Developer
          </span>
        </div>

        {/* =======================================================
                         HAMBURGER → A TOGGLE
        ======================================================= */}
        <button
          onClick={() => setOpen(!open)}
          className="relative mb-8 w-12 h-12"
          aria-label="Menu toggle"
        >
          {/* LEFT STROKE */}
          <span
            className={`
              absolute bg-black rounded-full
              transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]
              ${
                open
                  ? "w-[3px] h-9 rotate-[20deg] -translate-x-[6px]"
                  : "w-8 h-[2px] -translate-y-[6px]"
              }
            `}
          />

          {/* RIGHT STROKE */}
          <span
            className={`
              absolute bg-black rounded-full
              transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]
              ${
                open
                  ? "w-[3px] h-9 rotate-[-20deg] translate-x-[6px]"
                  : "w-8 h-[2px] translate-y-[2px]"
              }
            `}
          />

          {/* CROSS BAR */}
          <span
            className={`
              absolute h-[3px] bg-black rounded-full
              transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]
              ${
                open
                  ? "w-[16px]  translate-x-[-6px] translate-y-[20px]"
                  : "w-8 translate-y-[10px]"
              }
            `}
          />
        </button>
      </aside>
      {/* =======================================================
                        SLIDE-OUT MENU PANEL
           🚫 DOES NOT MOVE THE STRIP — SLIDES UNDER IT ONLY
      ======================================================= */}
      <div
        className={`
          fixed top-0 left-24 z-[998]
          w-[calc(100vw-96px)]
          h-screen
          bg-white overflow-hidden
          transform transition-transform
          duration-[900ms]
          ease-[cubic-bezier(0.22,1,0.36,1)]
          ${open ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* ✅ YOUR EXISTING RIGHT DECOR */}
        <RightDecor />

        {/* NAV LINKS */}
        <nav className="relative z-10 h-full flex flex-col justify-center gap-8 pl-32">
          {navItems.map((item, i) => (
            <a
              key={item.label}
              href={item.to}
              onClick={() => setOpen(false)}
              style={{ transitionDelay: open ? `${i * 90}ms` : "0ms" }}
              className={`
                text-4xl md:text-5xl uppercase tracking-[0.2em] text-black
                transition-all duration-[600ms]
                ${
                  open
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 -translate-x-12"
                }
                hover:tracking-[0.3em] hover:opacity-60
              `}
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </>
  );
}
