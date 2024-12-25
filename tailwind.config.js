/** @type {import('tailwindcss').Config} */
/** @type {import('tailwindcss').Config} */


export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    fontFamily: {
      cairo: ['"Cairo"', "sans-serif"],
      poppins: ['"Poppins"', "sans-serif"],
      rowdies: ['"rowdies"',"cursive"]
    },
  },
  plugins: [],
}