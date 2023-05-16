/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.tsx',
    './index.html',
  ],
  theme: {
    fontFamily:{
      sans: ['Roboto', 'sans-serif'],
    },
    extend: {
      backgroundImage:{
        fundo: "url('/background-gg.png')"
      }
    },
  },
  plugins: [],
}

