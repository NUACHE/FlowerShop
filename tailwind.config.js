/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'flower1': "url('../public/images/flower1.jpg')",
        'flower2': "url('../public/images/flower2.jpg')",
        'flower3': "url('../public/images/flower3.jpg')"
      }
    },
   
  },
  plugins: [],
}
