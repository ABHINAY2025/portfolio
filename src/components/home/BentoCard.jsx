import { motion } from "framer-motion";

export default function BentoCard({ title, value, children, className = "" }) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 220, damping: 18 }}
      className={`
        rounded-2xl p-6
        backdrop-blur-xl
        border border-white/10
        shadow-xl
        flex flex-col justify-center
        ${className}
      `}
    >
      {title && (
        <p className="uppercase tracking-widest text-xs opacity-70 mb-1">
          {title}
        </p>
      )}

      {value && (
        <h4 className="text-2xl font-bold mt-2">
          {value}
        </h4>
      )}

      {children}
    </motion.div>
  );
}
