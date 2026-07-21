/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        accent: '#E8279A',
        teal:   '#00B4D8',
        dark:   '#0f0f0f',
        surface: '#f9fafb',
      },
      fontFamily: {
        display: ['Google Sans', 'sans-serif'],
        body:    ['Inter', 'sans-serif'],
        sans:    ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
