module.exports = {
  content: ['./src/**/*.{html,js,ts,tsx}'],
  theme: {
    colors: {
      'text-light': '#f3f4f6',
      'text-dark': '#f9fafb',
      'main-light': '#0583d2',
      'main-dark': '#1655bf',
      'secondary-light': '#b8e3ff',
      'secondary-dark': '#61b0b7',
    },
    extend: {},
  },
  plugins: [require('tailwind-scrollbar')],
};
