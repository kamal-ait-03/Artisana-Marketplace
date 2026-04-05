/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        zellige: {
          100: '#E6F0FA',
          500: '#1E6091',
          900: '#0C2A4A'
        },
        terracotta: {
          100: '#FAE8E1',
          500: '#C25934',
          900: '#662711'
        },
        desert: '#F4E3D7',
        olive: '#556B2F',
      },
      fontFamily: {
        heading: ['"Playfair Display"', 'serif'],
        sans: ['Inter', 'sans-serif'],
        arabic: ['"Cairo"', 'sans-serif']
      },
      borderRadius: {
        'arch': '3rem',
      }
    },
  },
  plugins: [],
}
