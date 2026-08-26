/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ocean: {
          950: '#070c14',
          900: '#0d1726',
          800: '#152238',
        },
        brass: {
          400: '#f5d78a',
          500: '#dfb15b',
          600: '#b8860b',
        }
      },
      fontFamily: {
        heading: ['Cinzel', 'serif'],
        serif: ['Playfair Display', 'serif'],
        sans: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
