// eslint-disable-next-line @typescript-eslint/no-var-requires
const { fontFamily } = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    './src/**/*.{js,ts,jsx,tsx}',
    '../../packages/ui/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#5c6ac4',
        secondary: '#ecc94b',
      },
      fontFamily: {
        sans: ['var(--font-orbitron)', ...fontFamily.sans],
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar')
  ],
};
