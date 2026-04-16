/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#ff6b00", /* Vibrant orange */
        accent: "#EAB308",
        brandDark: "#0F172A",
        cardPurple: "#a5a2cc",
        cardOrange: "#f1c28c",
        cardRed: "#cc6666",
        cardPink: "#c4a3b8",
      },
      fontFamily: {
        sans: ['Outfit', 'sans-serif'],
        display: ['Outfit', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
