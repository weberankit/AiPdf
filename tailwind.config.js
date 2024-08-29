/** @type {import('tailwindcss').Config} */
module.exports = {
  
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {screens: {
      'xs': {'max': '424px'}, // Custom breakpoint for screens less than 400px
    },},
  },
  plugins: [],
 
}

