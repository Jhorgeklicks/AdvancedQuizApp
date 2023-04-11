/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      transparent : 'transparent',
      current : 'currentColor',
      'light' : '#ffffff',
      'dark' : '#333333',
      'section' : '#023046;',
      'semiHover' : '#1a3542',
      'prim' : {
        100 : '#001e2d',
        200 : '#001b29',
        300 : '#001824',
        400 : '#00151f',
        500 : '#00121b',
        600 : '#000f17',
        700 : '#000c12',
        800 : '#00090d',
        900 : '#00090d',
      },

      'sec' : {
        100 : '#ffed4f',
        200 : '#ffeb3b',
        300 : '#e6d435',
        400 : '#ccbc2f',
        500 : '#b3a529',
        600 : '#998d23',
        700 : '#80761e',
        800 : '#665e18',
        900 : '#4c4612',
      },
      
      'ter' : {
        100 : '#0093ff',
        200 : '#0084e6',
        300 : '#0076cc',
        400 : '#0067b3',
        500 : '#005899',
        600 : '#004a80',
        700 : '#003b66',
        800 : '#002c4c',
        900 : '#001d33',
      }
    },
    fontFamily: {
      'prim'  : ['Roboto', 'sans-serif'],
      'sec'   : ['Fira Sans', 'sans-serif'],
      'style' : ['Alkatra','cursive'],
      'num'   : ['Oswald', 'sans-serif']
  },
  clipPath: {
    mypolygon: "polygon(14% 0, 100% 0%, 100% 100%, 13% 100%, 0 46%)",
  },
    extend: {},
  },
  plugins: [
    require("daisyui"),
    require("tailwind-clip-path")
  ],
}
