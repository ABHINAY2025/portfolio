import { motion } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import BentoCard from "./BentoCard";

/* ---------------- CONFIG ---------------- */

const AUDIO_SRC = "/505.mp3";
const COVER_SRC = "/505.jpeg";
const SPOTIFY_URL =
  "https://open.spotify.com/playlist/1OWkWyPSLaEuTT67ctvwdr";

/* ---------------- ICONS ---------------- */

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-7 h-7 fill-black">
      <path d="M7 5v14l12-7z" />
    </svg>
  );
}

function PauseIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-7 h-7 fill-black">
      <path d="M6 5h4v14H6zm8 0h4v14h-4z" />
    </svg>
  );
}

/* ---------------- COMPONENT ---------------- */

export default function NowPlaying() {

  const audioRef = useRef(null);
  const analyserRef = useRef(null);
  const sourceRef = useRef(null);
  const audioCtxRef = useRef(null);
  const isMobile = window.innerWidth < 640;
  const rafRef = useRef(null);

  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [waveData, setWaveData] = useState(
    Array(28).fill(20)
  );

  /* ---------------- INIT AUDIO ANALYSER ONCE ---------------- */

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (!audioCtxRef.current) {
      const ctx = new AudioContext();
      audioCtxRef.current = ctx;

      const analyser = ctx.createAnalyser();
      analyser.fftSize = 64;
      analyserRef.current = analyser;

      // ✅ ONLY CREATE SOURCE ONE TIME
      sourceRef.current = ctx.createMediaElementSource(audio);
      sourceRef.current.connect(analyser);
      analyser.connect(ctx.destination);
    }

    const dataArray = new Uint8Array(
      analyserRef.current.frequencyBinCount
    );

    const animate = () => {
      analyserRef.current.getByteFrequencyData(dataArray);

      const mapped = [...dataArray.slice(0, 28)].map(
        v => Math.max(15, (v / 255) * 100)
      );

      setWaveData(mapped);

      rafRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  /* ---------------- PLAYER CONTROLS ---------------- */

  const toggle = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    const ctx = audioCtxRef.current;
    if (ctx.state === "suspended") {
      await ctx.resume();
    }

    if (playing) audio.pause();
    else audio.play();

    setPlaying(!playing);
  };

  /* ---------------- PROGRESS BAR ---------------- */

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const update = () => {
      setProgress((audio.currentTime / audio.duration) * 100 || 0);
    };

    audio.addEventListener("timeupdate", update);
    audio.addEventListener("ended", () => setPlaying(false));

    return () => {
      audio.removeEventListener("timeupdate", update);
    };
  }, []);

  /* ---------------- UI ---------------- */

  return (
    <BentoCard
      className="
        relative overflow-hidden
        bg-gradient-to-br from-black via-[#052e16] to-[#16a34a]
        text-white
      "
    >
      {/* AUDIO */}
      <audio ref={audioRef} src={AUDIO_SRC} preload="metadata" />

      {/* GLOW */}
      <div className="
        absolute -top-24 right-[-60px]
        w-[260px] h-[260px]
        bg-[#1db954]
        blur-[130px]
        opacity-40 pointer-events-none
      "/>

      {/* HEADER */}
      <header className="flex justify-between items-center mb-4 relative z-10">
        <h3 className="
          tracking-[3px]
          text-[10px] sm:text-xs
          text-[#1db954] font-bold
        ">
          LIFELINES
        </h3>

        <a
          href={SPOTIFY_URL}
          target="_blank"
          rel="noreferrer"
          className="
            px-3 py-1
            bg-[#1db954] text-black
            text-[10px] sm:text-xs font-bold
            rounded-full shadow-lg
            whitespace-nowrap
          "
        >
          OPEN SPOTIFY
        </a>
      </header>

      {/* MAIN BLOCK */}
      <div className="flex gap-3 sm:gap-5 items-center relative z-10">

        {/* ALBUM COVER */}
        <img
          src={COVER_SRC}
          alt="album"
          className={`
            rounded-xl object-cover border border-white/20
            shadow-[0_0_25px_rgba(29,185,84,.45)]
            ${isMobile ? "w-[70px] h-[70px]" : "w-[96px] h-[96px]"}
          `}
        />

        {/* TEXT SECTION */}
        <div className="flex-1">
          <h4 className="font-semibold text-[12px] sm:text-sm leading-tight">
            Arctic Monkeys – 505
          </h4>

          <p className="text-[10px] sm:text-xs opacity-70">
            Favourite Worst Nightmare
          </p>

          {/* PROGRESS BAR */}
          <div className="mt-2 h-1 bg-white/15 rounded-full overflow-hidden">
            <motion.div
              animate={{ width: `${progress}%` }}
              transition={{ ease: "linear" }}
              className="h-full bg-[#1db954]"
            />
          </div>
        </div>

        {/* PLAY BUTTON */}
        <motion.button
          onClick={toggle}
          whileTap={{ scale: 0.85 }}
          whileHover={{ scale: 1.05 }}
          className={`
            flex items-center justify-center rounded-full bg-[#1db954]
            shadow-[0_0_25px_rgba(29,185,84,.85)]
            ${isMobile ? "w-[42px] h-[42px]" : "w-[56px] h-[56px]"}
          `}
        >
          {playing ? <PauseIcon /> : <PlayIcon />}
        </motion.button>
      </div>

      {/* WAVES */}
      {!isMobile && (
        <div className="
          absolute bottom-5 left-0 w-full
          flex justify-center items-end
          gap-[5px] px-8 h-[44px] z-10
        ">
          {waveData.map((h, i) => (
            <motion.div
              key={i}
              animate={{ height: `${h}%` }}
              transition={{ ease: "easeOut", duration: 0.07 }}
              className="w-[5px] bg-[#1db954] rounded-full"
            />
          ))}
        </div>
      )}
    </BentoCard>
  );
}