/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        orange: '#E69A45',
        darkPink: '#E57A8F',
        lightPink: '#F7BFC6',
        yellow: '#F2C94C',
        beige: '#F1E4DD',
        textPrimary: '#333',
        background: '#EEEEEE',
        backgroundBtn: '#C73659',
        backgroundBtnCorrect: '#A91D3A',
        backgroundBtnIncorrect: '#151515',
      },
      fontFamily: {
        serif: ['Merriweather', 'serif'],
        sans: ['Inter', 'sans-serif'],
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInDelayed: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      animation: {
        fadeIn: 'fadeIn 1s ease-out forwards',
      },
    },
  },
  plugins: [],
};
