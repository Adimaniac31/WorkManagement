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
      },
    },
  },
  plugins: [],
}

