/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#594232', // Dark brown/bronze
          light: '#7d6452',
          dark: '#3e2c20',
        },
        accent: {
          DEFAULT: '#a3846b', // Gold/bronze accent
          light: '#c2ab99',
          dark: '#7e6049',
        },
        beige: {
          DEFAULT: '#f9f6f0', // Light warm background
          dark: '#f0eae1',    // Medium warm for sections/cards
          light: '#fdfcfb',   // Cream/white
        }
      },
      fontFamily: {
        sans: ['Outfit', 'Inter', 'sans-serif'],
        serif: ['Playfair Display', 'Georgia', 'serif'],
      }
    },
  },
  plugins: [],
}
