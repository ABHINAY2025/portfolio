import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function CustomCursor({ hovered }) {
  const [pos, setPos] = useState({ x: -100, y: -100 });

  useEffect(() => {
    const move = (e) => {
      // 🔥 Update instantly with no animation system
      setPos({
        x: e.clientX,
        y: e.clientY
      });
    };

    window.addEventListener("mousemove", move, { passive: true });
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        top: pos.y - (hovered ? 20 : 6),
        left: pos.x - (hovered ? 60 : 6),
        zIndex: 2000,
        pointerEvents: "none",
        willChange: "transform",
      }}
    >
      {/* Normal Cursor — White Dot */}
      {!hovered && (
        <div
          className="
            w-3 h-3 rounded-full 
            bg-black 
            mix-blend-difference
          "
        />
      )}

      {/* Hover State — Instant Pill */}
      {hovered && (
        <div
          className="
            px-5 py-2 rounded-full
            bg-black text-white text-xs 
            font-semibold shadow-lg
          "
        >
          VIEW PROJECT
        </div>
      )}
    </div>
  );
}