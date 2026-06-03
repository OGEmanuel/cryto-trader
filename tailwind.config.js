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
        'primary-2': '#5CD6A5',
        background: '#1B232A',
        'background-2': '#161C22',
        'background-3': '#1B1F27',
        'background-secondary': '#080C11',
        'background-tertiary': '#141820',
        secondary: '#777777',
        tertiary: '#252E35',
        foreground: '#171D22',
        'custom-text': '#C1C7CD',
        'custom-text-2': '#A7AFB7',
        'custom-text-3': '#080C11',
        'custom-text-secondary': '#F1F6F8',
        'custom-text-tertiary': '#8594A6',
        extra: '#E3E8ED',
        destructive: '#DD4B4B',
        'destructive-2': '#E4484C',
        notify: '#4AA8FF',
        warning: '#D5BB5E',
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
