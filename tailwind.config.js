/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
  extend: {
    colors: {
      brandPurple: '#7C3AED',
      brandIndigo: '#6366F1',
      brandPeach: '#FB923C',
      brandDark: '#0B0716',
    },
  },
},

 plugins: [
  require('@tailwindcss/typography')
]
}

