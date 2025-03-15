/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    "./node_modules/swiper/**/*.js" // Ajout crucial pour Swiper
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0077B6',
          dark: '#00507A',
          darker: '#001F3F',
          light: '#90E0EF',
        },
        accent: {
          DEFAULT: '#00A8E8',
          dark: '#0096CC',
        },
        secondary: {
          DEFAULT: '#48CAE4',
        },
        text: {
          primary: '#1A1A1A',
          secondary: '#606060',
        },
      },
      fontFamily: {
        sans: ['var(--font-poppins)', 'var(--font-inter)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        poppins: ['var(--font-poppins)', 'sans-serif'],
        inter: ['var(--font-inter)', 'sans-serif'],
      },
    },
  },
  plugins: [],
}