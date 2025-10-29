/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'horror-black': '#000000',
        'horror-dark-red': '#8b0000',
        'horror-red': '#b22222',
        'horror-white': '#ffffff',
      },
      fontFamily: {
        'creepster': ['Creepster', 'cursive'],
        'eb-garamond': ['EB Garamond', 'serif'],
      },
    },
  },
  plugins: [],
}

