/** @type {import('tailwindcss').Config} */
module.exports = {
   content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
    colors:{
      'transparent':'transparent',
      'primary': '#3C37FF',
      'secondary': '#4845F9',
      'main':'#D6DBE7',
      'white':'#FFFFFF',
      'dark':'#000000',
      'grey':'#636C79',
      'red' :'#ff0000'
    },
    fontFamily: {
      sans: ['Roboto Mono', 'sans-serif'],
      serif: ['Merriweather', 'serif'],
  },
   
},
  plugins: [],
}
