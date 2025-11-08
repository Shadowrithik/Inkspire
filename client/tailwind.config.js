/** @type {import('tailwindcss').Config} */
import plugin from 'tailwindcss/plugin';

export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [
    {
      pattern: /(from|via|to)-(amber|stone|sky|slate|blue|rose|red|orange|gray|purple|indigo|neutral|emerald|yellow)-(50|100|200|300|400)/,
    },
  ],
  theme: {
    extend: {
        fontFamily: {
          poppins: ['Poppins', 'sans-serif'],
          dancingScript: ['"Dancing Script"', 'cursive'],
          handwriting: ['"Caveat"', 'cursive'],
          playwrite: ['"Playwrite AU TAS"', 'cursive']
        },
      colors: {
        vintage: {
          bg: '#fbf0d9',
          text: '#5c4d3a',
          accent: '#a1887f',
          border: '#e0d8c7',
        },
      },
    },
  },
  plugins: [
    plugin(function({ addVariant }) {
      addVariant('vintage', '.vintage &');
    })
  ],
}