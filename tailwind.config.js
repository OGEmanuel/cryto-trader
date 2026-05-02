/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: [
    './app/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
    './screens/**/*.{js,jsx,ts,tsx}',
  ],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        primary: '#5ED5A8',
        background: '#1B232A',
        secondary: '#777777',
        tertiary: '#252E35',
        foreground: '#171D22',
      },
      fontFamily: {
        'nm-light': ['NeueMontreal-Light'],
        nm: ['NeueMontreal'],
        'nm-medium': ['NeueMontreal-Medium'],
        'nm-bold': ['NeueMontreal-Bold'],
      },
    },
  },
  plugins: [],
};
