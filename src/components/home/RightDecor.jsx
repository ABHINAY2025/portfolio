import { motion } from "framer-motion";

const commonTransition = {
  duration: 6,
  ease: "easeInOut",
};

export default function RightDecor() {
  return (
    <div className="absolute inset-0 overflow-hidden grain pointer-events-none">
      
      {/* ================= BACK LIGHT ================= */}
      <motion.div
        className="
          absolute w-[1000px] h-[1000px]
          blur-[220px] rounded-full
          bg-gradient-to-br from-fuchsia-500/30 via-cyan-400/30 to-indigo-600/30
          right-[-150px] top-[-150px]
        "
        animate={{ scale: [1, 1.1, 1], opacity: [0.4, 0.8, 0.4] }}
        transition={{ duration: 16, repeat: Infinity }}
      />

      <svg
        viewBox="0 0 1200 800"
        className="absolute right-[-50px] top-1/2 -translate-y-1/2
                   w-[1200px] h-[800px]"
        fill="none"
      >
        <defs>
          {/* FLOWER Gradient */}
          <linearGradient id="flowerGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#ff3bbf" />
            <stop offset="50%" stopColor="#ff89dc" />
            <stop offset="100%" stopColor="#ffe0f1" />
          </linearGradient>

          {/* SUNSET Gradient */}
          <linearGradient id="sunGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#ffb44a" />
            <stop offset="50%" stopColor="#ff7049" />
            <stop offset="100%" stopColor="#ff2d83" />
          </linearGradient>

          {/* FACE Gradient */}
          <linearGradient id="faceGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#55ffff" />
            <stop offset="50%" stopColor="#4caeff" />
            <stop offset="100%" stopColor="#2158ff" />
          </linearGradient>
        </defs>

        {/* =========================================================
                            FLOWER CLUSTER (Refined)
            Three distinct stems: Left Bud, Center Rose, Right Tulip
        ========================================================= */}
        {[
          // Left curved stem with bud
          "M180 500 Q 160 400, 120 350 Q 100 320, 130 310 Q 150 300, 140 330 Z M 135 360 Q 110 370, 100 390", 
          // Center large bloom
          "M250 550 C 250 450, 240 350, 240 300 C 210 300, 200 250, 240 230 C 260 210, 300 210, 320 240 C 340 270, 310 320, 240 300 M 245 400 Q 280 380, 300 350", 
          // Right leaning flower
          "M320 520 C 340 420, 380 380, 400 320 C 380 300, 390 270, 420 270 C 450 270, 460 300, 440 320 C 430 330, 410 330, 400 320",
        ].map((path, i) => (
          <motion.path
            key={i}
            d={path}
            stroke="url(#flowerGrad)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{
              pathLength: [0, 1, 1],
              opacity: [0, 1, 0],
            }}
            transition={{
              ...commonTransition,
              delay: i * 0.8, // Staggered bloom
              repeat: Infinity,
              repeatDelay: 12,
            }}
          />
        ))}

        {/* =========================================================
                            SUNSET MOUNTAINS (Refined)
              Sharp peaks with a sun rising behind them
        ========================================================= */}
        <motion.path
          d="
            M500 500 
            L 550 400 L 620 520 
            L 680 350 L 750 480 
            L 850 280 L 950 500 
            M 700 380 
            A 80 80 0 1 1 820 340
          " 
          // The path above draws jagged mountains, then moves (M) to draw an Arc (A) for the sun
          stroke="url(#sunGrad)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{
            pathLength: [0, 1, 1],
            opacity: [0, 1, 0],
          }}
          transition={{
            ...commonTransition,
            delay: 7,
            repeat: Infinity,
            repeatDelay: 12,
          }}
        />

        {/* =========================================================
                            HUMAN FACE PROFILE (Refined)
                 Accurate side profile (Forehead -> Nose -> Lips -> Chin)
        ========================================================= */}
        <motion.path
          d="
            M 950 200 
            C 920 220, 920 280, 920 300  
            C 920 310, 880 320, 870 360  
            L 885 365                    
            C 885 365, 870 380, 880 395  
            C 885 400, 885 410, 880 415  
            C 870 430, 900 460, 930 450  
            C 960 440, 950 550, 950 600
          "
          // Explanation: 
          // 1. Top of head/forehead
          // 2. Dip for eye socket
          // 3. Out for nose tip
          // 4. Back in for nostril
          // 5. Out for top lip, in, out for bottom lip
          // 6. Chin curve
          // 7. Neck line
          stroke="url(#faceGrad)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{
            pathLength: [0, 1, 1],
            opacity: [0, 1, 0],
          }}
          transition={{
            ...commonTransition,
            delay: 14,
            repeat: Infinity,
            repeatDelay: 12,
          }}
        />

      </svg>

      {/* =========================================================
                                FLOATING A
      ========================================================= */}
      <motion.div
        className="
          absolute bottom-20 right-24
          text-[20vh] font-serif tracking-[0.45em]
          text-black/5 select-none
        "
        animate={{
          opacity: [0.1, 0.3, 0.12],
          y: [0, -16, 0],
          scale: [1, 1.08, 1],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        A
      </motion.div>
    </div>
  );
}