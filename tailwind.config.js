/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ['./**/*.html'],
  darkMode: false, // or 'media' or 'class'
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      spacing: {
        '1': '0.25rem',
        '2': '0.5rem',
        '3': '0.75rem',
        '4': '1rem',
        '5': '1.25rem',
        '6': '1.5rem',
        '7': '1.75rem',
        '8': '2rem',
        '9': '2.25rem',
        '10': '2.5rem',
        '11': '2.75rem',
        '12': '3rem',
        '13': '3.25rem',
        '14': '3.5rem',
        '15': '3.75rem',
        '16': '4rem',
      },
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
}
