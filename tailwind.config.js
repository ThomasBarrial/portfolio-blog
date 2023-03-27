/** @type {import('tailwindcss').Config} */
const { fontFamily } = require('tailwindcss/defaultTheme');

module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
    './node_modules/react-anim-creative-components/**/*.js',
  ],
  theme: {
    fontFamily: {
      montserrat: ['var(--font-montserrat)'],
      poppins: ['var(--font-poppins)'],
      benchnine: ['var(--font-benchnine)'],
    },
    animation: {
      infinitTextLine: 'marquee 50s linear infinite',
      infinitTextLineReverse: 'marquee 30s linear infinite',
    },
    keyframes: {
      marquee: {
        '0%': {
          transform: 'translate3d(0, 0, 0)',
        },
        '100%': {
          transform: 'translate3d(-50%, 0, 0)',
        },
      },
      reverse: {
        '0%': {
          transform: 'translate3d(0, 0, 0)',
        },
        '100%': {
          transform: 'translate3d(50%, 0, 0)',
        },
      },
    },
    extend: {},
  },
  plugins: [require('@tailwindcss/line-clamp'), ...fontFamily.sans],
};
