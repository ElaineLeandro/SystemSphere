/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ['./**/*.html'],
  darkMode: false, // or 'media' or 'class'
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {},
  },
  plugins: [],
  screens: {
    'sm': '440px',
    'md': '768px',
    'lg': '1024px',
    'xl': '1280px',
    '2x1': "1536px"
  }
}

