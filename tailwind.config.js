/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      /* ✅ EXISTING COLORS — kept */
      colors: {
        brandPurple: '#7C3AED',
        brandIndigo: '#6366F1',
        brandPeach: '#FB923C',
        brandDark: '#0B0716',
      },

      /* ✅ NEW: red ↔ blue animated text */
      keyframes: {
        redBlue: {
          "0%, 100%": { color: "#ef4444" }, // red-500
          "50%": { color: "#2563eb" },      // blue-600
        },
      },
      animation: {
        redBlue: "redBlue 2s ease-in-out infinite",
      },
    },
  },

  plugins: [
    require('@tailwindcss/typography'),
  ],
};
