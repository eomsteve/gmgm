/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        dohyeon: ['Do Hyeon'],
      },
      colors: {
        deepsky: '#639DEB',
        lightsky: '#9ADCFF',
        lemon: '#FFF89A',
        peach: '#FFB2A6',
        rouge: '#FF8AAE',
      },
    },
  },
  plugins: [require('flowbite/plugin')],
};
